/* eslint-disable prettier/prettier */
import React, { useState, useReducer, useEffect } from "react";
import {
    Flex,
    Text,
    Button,
    Spacer,
    Stack,
    Box,
    Divider,
    useDisclosure,
    VStack,
    Heading,
    HStack,
    Container,
    IconButton,
    ButtonGroup,
    Editable,
    EditablePreview,
    EditableInput,
} from "@chakra-ui/react";
import { IoIosUndo, IoIosRedo } from "react-icons/io";
import { IoTrash, IoDesktopOutline } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";
import useSWR, { SWRConfig } from "swr";
import { GetServerSideProps } from "next";

import { Page } from "types/Page";
import {
    BuilderLayout,
    MarkdownRenderer,
    ModulePreview,
    CheckboxComp,
    ModuleSectionSelect,
} from "@components";
import _ from "lodash";
import { ISlide } from "@components/moduleSectionSelect";

const initialState = { title: "Untitled Module" };

function reducer(state, action) {
    switch (action.type) {
        case "changeTitle":
            return { ...state, title: action.value };
        case "init":
            return { ...action.payload };
        default:
            throw new Error();
    }
}

/*export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const moduleData = await fetcher(`/api/module/${query.id}`);
    return {
        props: {
            fallback: {
                [`/api/module/${query.id}`]: moduleData,
            },
        },
    };
};*/

const Builder: Page = () => {
    const {
        isOpen: isSidebarOpen,
        onToggle: toggleSidebar,
        onOpen: sidebarOpen,
        onClose: sidebarClose,
    } = useDisclosure();

    // remove once real slide state is created
    const [mockSlide, setMockSlide] = useState({
        checkpoint: true,
        progressBarEnabled: true,
        buttons: {
            save: true,
            print: true,
            previous: true,
            next: true,
        },
        sections: [
            {
                type: "staticContent",
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
                markdown: "Hello!",
                alignment: "",
            },
        ],
    });
    const [state, dispatch] = useReducer(reducer, initialState);
    const [editorText, setEditorText] = useState("Hello world!");
    const [slideNumber, setSlide] = useState(1);
    const [maxSlides, addSlide] = useState(1);
    const [prevSlide, setPrevSlide] = useState(1);
    const [slides, setSlides] = useState([editorText]);
    const [buttons, setButtons] = useState(new Set(["prev", "next"]));

    const buttonOptions = ["prev", "next", "save", "print"];

    const router = useRouter();
    const { moduleId } = router.query;

    const fetcher = async (url) => {
        const response = await axios({
            method: "GET",
            url,
        });
        dispatch({ type: "init", payload: response.data });
        return response.data;
    };

    const { data, error } = useSWR(`/api/module/${moduleId}`, fetcher);
    if (error) return "An error has occurred.";
    if (!data) return "Loading...";

    const handleEditableErrors = (e) => {
        const target = e.target as HTMLInputElement;
        if (
            !isNaN(parseInt(target.value)) &&
            parseInt(target.value) >= 1 &&
            parseInt(target.value) <= maxSlides
        ) {
            setEditorText(slides[Number(slideNumber) - 1]);
            setPrevSlide(slideNumber);
        } else {
            setSlide(prevSlide);
        }
    };

    const handleNewSlide = () => {
        mockSlide.sections.push({
            type: "",
            padding: {
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
            },
            markdown: "",
            alignment: "",
        });
        console.log(mockSlide);
        setMockSlide(_.cloneDeep(mockSlide));
    };
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

    const handleNullTitleErrors = (e) => {
        const target = e.target as HTMLInputElement;
        if (target.value === "") {
            dispatch({ type: "changeTitle", value: initialState.title });
        }
    };

    return (
        <Stack spacing={0}>
            <Stack spacing={2} p={6}>
                <Box>
                    <Link href="modules">
                        <Button variant="link">{"<"} Exit Builder</Button>
                    </Link>
                </Box>
                <Flex>
                    <Heading>
                        <Editable
                            defaultValue={initialState.title}
                            value={state.title}
                            onChange={(title) =>
                                dispatch({ type: "changeTitle", value: title })
                            }
                            onBlur={(e) => {
                                handleNullTitleErrors(e);
                            }}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleNullTitleErrors(e);
                                }
                            }}
                            width={350}
                        >
                            <EditablePreview />
                            <EditableInput />
                        </Editable>
                    </Heading>
                    <Spacer />
                    <HStack spacing={2}>
                        <Button variant="outline"> Discard </Button>
                        <Button
                            onClick={() => {
                                const newSlides = [...slides];
                                newSlides[slideNumber - 1] = editorText;
                                setSlides(newSlides);
                                handleSaveModule();
                            }}
                            isDisabled={state.title === ""}
                        >
                            Save
                        </Button>
                    </HStack>
                </Flex>
            </Stack>
            <Flex
                px={2}
                py={4}
                alignItems="center"
                border="1px"
                borderColor="black"
            >
                <Button
                    onClick={() => {
                        setSlide(slideNumber + 1);
                        addSlide(maxSlides + 1);
                        setEditorText("");
                        const newSlides = [...slides];
                        newSlides[maxSlides - 1] = editorText;
                        setSlides(newSlides);
                    }}
                >
                    New Slide
                </Button>
                <Spacer />
                <HStack spacing={2}>
                    <Editable
                        defaultValue="1"
                        value={slideNumber.toString()}
                        onChange={(nextValue) => {
                            setSlide(parseInt(nextValue) || 0);
                        }}
                        onBlur={handleEditableErrors}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleEditableErrors(e);
                            }
                        }}
                        width={8}
                        textAlign="center"
                        type="number"
                    >
                        <EditablePreview />
                        <EditableInput />
                    </Editable>
                    <Text>/ {maxSlides} Slides</Text>
                </HStack>
                <Spacer />
                <ButtonGroup variant="ghost">
                    <IconButton aria-label="undo" icon={<IoIosUndo />} />
                    <IconButton aria-label="redo" icon={<IoIosRedo />} />
                    <IconButton aria-label="trash" icon={<IoTrash />} />
                </ButtonGroup>
            </Flex>
            <Flex h="80vh">
                <Box w={isSidebarOpen ? "60%" : "5%"} transition="all 0.25s">
                    <Flex bg={isSidebarOpen ? "black" : "white"}>
                        <Spacer />
                        <Button
                            variant={isSidebarOpen ? "solid" : "ghost"}
                            colorScheme="blackAlpha"
                            onClick={toggleSidebar}
                        >
                            {isSidebarOpen ? "<<" : ">>"}
                        </Button>
                    </Flex>
                    {isSidebarOpen && (
                        <Box>
                            <Box overflowY="auto" height="75vh">
                                <Container maxW="70%" py={4}>
                                    {/* TODO: Change mockSlide to use actual slide state */}
                                    <Stack spacing={2}>
                                        {mockSlide.sections.map((x, idx) => (
                                            <div key={idx}>
                                                {idx > 0 && (
                                                    <Box
                                                        marginTop="5%"
                                                        marginBottom="5%"
                                                    >
                                                        <Divider />
                                                    </Box>
                                                )}
                                                <ModuleSectionSelect
                                                    slide={mockSlide}
                                                    sectionNumber={idx}
                                                    setSlide={setMockSlide}
                                                />
                                            </div>
                                        ))}
                                        <br />
                                        <Button
                                            onClick={handleNewSlide}
                                            colorScheme="black"
                                            variant="outline"
                                        >
                                            + New Section
                                        </Button>
                                    </Stack>
                                </Container>
                                <Container>
                                    <Stack spacing={10} direction="row">
                                        {buttonOptions.map((button) => (
                                            <CheckboxComp
                                                text={button}
                                                isChecked={
                                                    buttons.has(button)
                                                        ? true
                                                        : false
                                                }
                                                onChange={() => {
                                                    if (buttons.has(button)) {
                                                        const newButtons =
                                                            new Set(buttons);
                                                        newButtons.delete(
                                                            button,
                                                        );
                                                        setButtons(newButtons);
                                                    } else {
                                                        setButtons(
                                                            new Set(
                                                                buttons,
                                                            ).add(button),
                                                        );
                                                    }
                                                }}
                                            />
                                        ))}
                                    </Stack>
                                    <br />
                                </Container>
                            </Box>
                        </Box>
                    )}
                </Box>
                <VStack flex="1" bg="gray.200">
                    <Box
                        w="80%"
                        minH="80%"
                        border="1px"
                        borderColor="gray.700"
                        boxShadow="md"
                        overflow="auto"
                        px={4}
                        py={8}
                        bg="white"
                        mt={4}
                        position="relative"
                        align="center"
                    >
                        <MarkdownRenderer>{editorText}</MarkdownRenderer>
                        <Box
                            position="absolute"
                            bottom="0"
                            right="0"
                            left="0"
                            margin="10px"
                        >
                            <ModulePreview
                                previous={buttons.has("prev") ? true : false}
                                next={buttons.has("next") ? true : false}
                                save={buttons.has("save") ? true : false}
                                print={buttons.has("print") ? true : false}
                                progressValue={(slideNumber / maxSlides) * 100}
                                variant={""}
                            />
                        </Box>
                    </Box>
                    <Box display="flex" w="80%" justifyContent="flex-end">
                        <Flex>
                            <ButtonGroup spacing={0}>
                                <IconButton
                                    color="black"
                                    background={
                                        isSidebarOpen ? "gray.300" : "white"
                                    }
                                    _hover={{ background: "gray.300" }}
                                    borderColor="gray.300"
                                    borderWidth="1px"
                                    aria-label="mobile"
                                    borderTopRightRadius="0px"
                                    borderBottomRightRadius="0px"
                                    icon={<FaMobileAlt />}
                                    onClick={sidebarOpen}
                                />
                                <IconButton
                                    color="black"
                                    background={
                                        isSidebarOpen ? "white" : "gray.300"
                                    }
                                    borderColor="gray.300"
                                    borderWidth="1px"
                                    _hover={{ background: "gray.300" }}
                                    aria-label="desktop"
                                    borderTopLeftRadius="0px"
                                    borderBottomLeftRadius="0px"
                                    icon={<IoDesktopOutline />}
                                    onClick={sidebarClose}
                                />
                            </ButtonGroup>
                        </Flex>
                    </Box>
                </VStack>
            </Flex>
        </Stack>
    );
};

Builder.layout = BuilderLayout;

export default Builder;
