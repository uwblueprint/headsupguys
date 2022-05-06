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
import { isAuthenticated } from "src/utils/auth/authHelpers";
import { GetServerSideProps } from "next";
import Document from "src/pages/module-builder/Document";
import Editor from "src/pages/module-builder/Editor";
import Header from "src/pages/module-builder/Header";
import Toolbar from "src/pages/module-builder/Toolbar";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    if (process.env.USE_ADMIN_LOGIN === "true") {
        const authProps = await isAuthenticated(req, res, "/redirect", true); // TODO: change redirect to login page (once we have a login page that's deployed)
        return {
            props: {
                auth: authProps,
            },
        };
    } else {
        return {
            props: {},
        };
    }
};

export enum ModuleActionType {
    CHANGE_TITLE,
    INITIALIZE,
    ADD_SLIDE,
    UPDATE_SLIDE,
    REMOVE_SLIDE,
    SET_SLIDE,
    NEW_SECTION,
    RESET_SLIDE,
    UPDATE_SECTION,
    UPDATE_LAST_SAVED_STATE,
    DELETE_SECTION,
}

export type Option = {
    option: string;
    column?: string;
};

export type OptionsQuestion = {
    question: string;
    options: Option[];
};

export type Question = {
    question: string;
};

export type Section = {
    type: string; //markdown, mc, ms, sa
    padding: {
        top: number;
        right: number;
        bottom: number;
        left: number;
        type: "%" | "px";
    };
    markdown?: string; //stores markdown content, only applies to md component
    multipleChoice?: OptionsQuestion;
    multiSelect?: OptionsQuestion;
    shortAnswer?: string;
    userResponse?: {
        slideIdx: number;
        sectionIdx: number;
    };
    alignment?: string; //on frontend this will be a dropdown
    properties?: {
        variableName?: string;
        dataType?: string;
        columns?: string;
    };
};

export type Slide = {
    checkpoint: boolean;
    progressBarEnabled: boolean;
    buttons: {
        save: boolean;
        print: boolean;
        previous: boolean;
        next: boolean;
    };
    sections: Section[];
};

export type ModuleState = {
    title: string;
    currentSlide: number;
    slides: Slide[];
    stateChanged: boolean;
};

const DEFAULT_SECTION: Section = {
    type: "", //markdown, mc, ms, sa
    padding: { top: 0, right: 0, bottom: 0, left: 0, type: "%" },
    markdown: "", //stores markdown content, only applies to md component
    multipleChoice: {
        question: "",
        options: [
            { option: "", column: "left" }, //TODO: change when implement advanced features
            { option: "", column: "right" },
        ],
    }, //stores mc content, only applies to mc component
    multiSelect: {
        question: "",
        options: [
            { option: "", column: "left" },
            { option: "", column: "right" },
        ],
    }, //stores ms content, only applies to ms component
    shortAnswer: "",
    //stores sa content, only applies to sa component
    userResponse: {
        slideIdx: null,
        sectionIdx: null
    },
    alignment: "align-left", //on frontend this will be a dropdown
    properties: {
        variableName: "",
        dataType: "string",
        columns: "single", //NOTE: for now, manually change to double to test
    },

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
    stateChanged: false,
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
    | { type: ModuleActionType.NEW_SECTION; index: number }
    | {
          type: ModuleActionType.UPDATE_SECTION;
          sectionIndex: number;
          slideIndex: number;
          payload: Section;
      }
    | {
          type: ModuleActionType.UPDATE_LAST_SAVED_STATE;
          stateChanged: boolean;
      }
    | {
          type: ModuleActionType.DELETE_SECTION;
          sectionIndex: number;
          slideIndex: number;
      };
function reducer(
    state: Readonly<ModuleState>,
    action: ModuleAction,
): Readonly<ModuleState> {
    switch (action.type) {
        case ModuleActionType.CHANGE_TITLE:
            return { ...state, title: action.value, stateChanged: true };
        case ModuleActionType.INITIALIZE:
            return { ...action.payload, currentSlide: 0 };
        case ModuleActionType.ADD_SLIDE:
            return {
                ...state,
                slides: [...state.slides, DEFAULT_SLIDE],
                currentSlide: state.slides.length,
                stateChanged: true,
            };
        case ModuleActionType.UPDATE_SLIDE:
            return {
                ...state,
                slides: [
                    ...state.slides.slice(0, action.index),
                    action.payload,
                    ...state.slides.slice(action.index + 1),
                ],
                stateChanged: true,
            };
        case ModuleActionType.REMOVE_SLIDE: {
            let newSlides = [
                ...state.slides.slice(0, action.index),
                ...state.slides.slice(action.index + 1),
            ];
            if (newSlides.length === 0) {
                newSlides = [DEFAULT_SLIDE];
            }
            return {
                ...state,
                slides: newSlides,
                currentSlide: min([state.currentSlide, newSlides.length - 1]),
                stateChanged: true,
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
                stateChanged: true,
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
                    JSON.parse(JSON.stringify(DEFAULT_SECTION)),
                ],
            };
            return {
                ...state,
                slides: [
                    ...state.slides.slice(0, action.index),
                    newSlide,
                    ...state.slides.slice(action.index + 1),
                ],
                stateChanged: true,
            };
        }
        case ModuleActionType.UPDATE_SECTION: {
            const newSlide = {
                ...state.slides[action.slideIndex],
                sections: [
                    ...state.slides[action.slideIndex].sections.slice(
                        0,
                        action.sectionIndex,
                    ),
                    action.payload,
                    ...state.slides[action.slideIndex].sections.slice(
                        action.sectionIndex + 1,
                    ),
                ],
            };

            return {
                ...state,
                slides: [
                    ...state.slides.slice(0, action.slideIndex),
                    newSlide,
                    ...state.slides.slice(action.slideIndex + 1),
                ],
                stateChanged: true,
            };
        }
        case ModuleActionType.UPDATE_LAST_SAVED_STATE: {
            return {
                ...state,
                stateChanged: false,
            };
        }
        case ModuleActionType.DELETE_SECTION: {
            const newSlide = {
                ...state.slides[action.slideIndex],
                sections: [
                    ...state.slides[action.slideIndex].sections.slice(
                        0,
                        action.sectionIndex,
                    ),
                    ...state.slides[action.slideIndex].sections.slice(
                        action.sectionIndex + 1,
                    ),
                ],
            };

            return {
                ...state,
                slides: [
                    ...state.slides.slice(0, action.slideIndex),
                    newSlide,
                    ...state.slides.slice(action.slideIndex + 1),
                ],
                stateChanged: true,
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
        dispatch({
            type: ModuleActionType.UPDATE_LAST_SAVED_STATE,
            stateChanged: false,
        });
    };

    const handleDiscardModule = async () => {
        if (moduleId) {
            const response = await axios({
                method: "GET",
                url: `/api/module/${moduleId}`,
            });
            //set slides to respnse data
            console.log(response.data);
            const databaseSlides = [];
            for (let i = 0; i < response.data.slides.length; i++) {
                console.log(response.data.slides[i]);
                const slide = await axios({
                    method: "GET",
                    url: `/api/slide/${response.data.slides[i]}`,
                });
                databaseSlides.push(slide.data);
            }
            dispatch({
                type: ModuleActionType.INITIALIZE,
                payload: {
                    title: response.data.title,
                    slides: databaseSlides,
                    currentSlide: 0,
                    stateChanged: false,
                },
            });
            router.push(
                `/admin/dashboard/builder?moduleId=${response.data._id}`,
            );
        } else {
            //set slides to empty slide
            dispatch({
                type: ModuleActionType.INITIALIZE,
                payload: {
                    title: "Untitled Module",
                    slides: [DEFAULT_SLIDE],
                    currentSlide: 0,
                    stateChanged: false,
                },
            });
            router.push("/admin/dashboard/builder");
        }
    };

    return (
        <>
            <Stack spacing={0}>
                <Header
                    state={state}
                    dispatch={dispatch}
                    handleSaveModule={handleSaveModule}
                    handleDiscardModule={handleDiscardModule}
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
