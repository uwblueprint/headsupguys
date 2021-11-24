/* eslint-disable prettier/prettier */
import React, { useReducer } from "react";
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalOverlay,
    Flex,
    Spinner,
    Stack,
    useDisclosure,
    Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR from "swr";
import { Page } from "types/Page";
import { BuilderLayout } from "@components";
import { min } from "lodash";
import Document from "src/pages/module-builder/Document";
import Editor from "src/pages/module-builder/Editor";
import Header from "src/pages/module-builder/Header";
import Toolbar from "src/pages/module-builder/Toolbar";

export enum ModuleActionType {
    CHANGE_TITLE,
    INITIALIZE,
    ADD_SLIDE,
    UPDATE_SLIDE,
    REMOVE_SLIDE,
    SET_SLIDE,
    NEW_SECTION,
    RESET_SLIDE,
}

export type Slide = {
    checkpoint: boolean;
    progressBarEnabled: boolean;
    buttons: {
        save: boolean;
        print: boolean;
        previous: boolean;
        next: boolean;
    };
    sections: {
        type: string; //markdown, mc, ms, sa
        padding: {
            top: number;
            right: number;
            bottom: number;
            left: number;
        };
        markdown?: string; //stores markdown content, only applies to md component
        alignment?: string; //on frontend this will be a dropdown
    }[];
};

export type ModuleState = {
    title: string;
    currentSlide: number;
    slides: Slide[];
};

const DEFAULT_SECTION = {
    type: "", //markdown, mc, ms, sa
    padding: { top: 0, right: 0, bottom: 0, left: 0 },
    markdown: "", //stores markdown content, only applies to md component
    alignment: "align-left", //on frontend this will be a dropdown
};

const DEFAULT_SLIDE = {
    checkpoint: true,
    progressBarEnabled: true,
    buttons: { save: false, print: false, previous: true, next: true },
    sections: [DEFAULT_SECTION],
};

export const INITIAL_STATE: ModuleState = {
    title: "Untitled Module",
    currentSlide: 0,
    slides: [DEFAULT_SLIDE],
};

export type ModuleAction =
    | { type: ModuleActionType.CHANGE_TITLE; value: string }
    | { type: ModuleActionType.INITIALIZE; payload: ModuleState }
    | { type: ModuleActionType.ADD_SLIDE }
    | {
          type: ModuleActionType.UPDATE_SLIDE;
          index: number;
          payload: Slide;
      }
    | { type: ModuleActionType.REMOVE_SLIDE; index: number }
    | { type: ModuleActionType.RESET_SLIDE; index: number }
    | { type: ModuleActionType.SET_SLIDE; index: number }
    | { type: ModuleActionType.NEW_SECTION; index: number };

function reducer(
    state: Readonly<ModuleState>,
    action: ModuleAction,
): Readonly<ModuleState> {
    switch (action.type) {
        case ModuleActionType.CHANGE_TITLE:
            return { ...state, title: action.value };
        case ModuleActionType.INITIALIZE:
            return { ...action.payload, currentSlide: 0 };
        case ModuleActionType.ADD_SLIDE:
            return { ...state, slides: [...state.slides, DEFAULT_SLIDE] };
        case ModuleActionType.UPDATE_SLIDE:
            return {
                ...state,
                slides: [
                    ...state.slides.slice(0, action.index),
                    action.payload,
                    ...state.slides.slice(action.index + 1),
                ],
            };
        case ModuleActionType.REMOVE_SLIDE: {
            let newSlides = [
                ...state.slides.slice(0, action.index),
                ...state.slides.slice(action.index + 1),
            ];
            console.log(newSlides);
            if (newSlides.length === 0) {
                newSlides = [DEFAULT_SLIDE];
            }
            return {
                ...state,
                slides: newSlides,
                currentSlide: min([state.currentSlide, newSlides.length - 1]),
            };
        }
        case ModuleActionType.RESET_SLIDE: {
            return {
                ...state,
                slides: [
                    ...state.slides.slice(0, action.index),
                    DEFAULT_SLIDE,
                    ...state.slides.slice(action.index + 1),
                ],
            };
        }
        case ModuleActionType.SET_SLIDE:
            if (action.index < 0 || action.index >= state.slides.length)
                return state;
            return {
                ...state,
                currentSlide: action.index,
            };
        case ModuleActionType.NEW_SECTION: {
            const newSlide = {
                ...state.slides[action.index],
                sections: [
                    ...state.slides[action.index].sections,
                    DEFAULT_SECTION,
                ],
            };
            return {
                ...state,
                slides: [
                    ...state.slides.slice(0, action.index),
                    newSlide,
                    ...state.slides.slice(action.index + 1),
                ],
            };
        }
        default:
            throw new Error();
    }
}

const Builder: Page = () => {
    const {
        isOpen: isSidebarOpen,
        onToggle: toggleSidebar,
        onOpen: sidebarOpen,
        onClose: sidebarClose,
    } = useDisclosure();

    const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

    const router = useRouter();
    const { moduleId } = router.query;

    const fetcher = async (url) => {
        const response = await axios.get(url, {
            params: { includeSlide: true },
        });
        dispatch({
            type: ModuleActionType.INITIALIZE,
            payload: response.data,
        });
        return response.data;
    };

    const fetchURL = moduleId ? `/api/module/${moduleId}` : null;
    const { data, error } = useSWR(() => fetchURL, fetcher);
    const isLoading = !data && fetchURL;

    const handleSaveModule = async () => {
        // check if moduleId in url, if so call patch otherwise call post
        if (moduleId) {
            await axios({
                method: "PATCH",
                url: `/api/module/${moduleId}`,
                data: {
                    ...state,
                },
            });
        } else {
            const response = await axios({
                method: "POST",
                url: "/api/module/post",
                data: {
                    ...state,
                },
            });
            router.push(
                `/admin/dashboard/builder?moduleId=${response.data._id}`,
            );
        }
    };

    return (
        <>
            <Stack spacing={0}>
                <Header
                    state={state}
                    dispatch={dispatch}
                    handleSaveModule={handleSaveModule}
                />
                <Toolbar state={state} dispatch={dispatch} />
                <Flex h="80vh">
                    <Editor
                        state={state}
                        dispatch={dispatch}
                        isSidebarOpen={isSidebarOpen}
                        toggleSidebar={toggleSidebar}
                    />
                    <Document
                        state={state}
                        isSidebarOpen={isSidebarOpen}
                        sidebarOpen={sidebarOpen}
                        sidebarClose={sidebarClose}
                    />
                </Flex>
            </Stack>
            {(error || isLoading) && (
                <Modal
                    isCentered
                    closeOnOverlayClick={false}
                    isOpen={!data}
                    onClose={() => console.log("data fetched")}
                >
                    <ModalOverlay />
                    <ModalContent w={300} h={300}>
                        <Center w="100%" h="100%">
                            {error ? (
                                <ModalHeader>
                                    An error has occurred.
                                </ModalHeader>
                            ) : (
                                <>
                                    <ModalHeader>Loading...</ModalHeader>
                                    <br />
                                    <ModalBody>
                                        <Spinner color="brand.lime" size="xl" />
                                    </ModalBody>
                                </>
                            )}
                        </Center>
                    </ModalContent>
                </Modal>
            )}
        </>
    );
};

Builder.layout = BuilderLayout;

export default Builder;
