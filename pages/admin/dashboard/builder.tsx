/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
    Flex,
    Text,
    Button,
    Spacer,
    SimpleGrid,
    Stack,
    Box,
    useDisclosure,
    Slide,
    VStack,
    Grid,
    Heading,
    HStack,
    Center,
    Container,
    IconButton,
    ButtonGroup,
    Editable,
    EditablePreview,
    EditableInput,
    Progress,
} from "@chakra-ui/react";
import { IoIosUndo, IoIosRedo } from "react-icons/io";
import { IoTrash, IoDesktopOutline } from "react-icons/io5";
import { FaMobileAlt } from "react-icons/fa";

import { Page } from "types/Page";
import {
    BuilderLayout,
    MarkdownEditor,
    MarkdownRenderer,
    ModulePreview,
    CheckboxComp,
} from "@components";

const Builder: Page = () => {
    const {
        isOpen: isSidebarOpen,
        onToggle: toggleSidebar,
        onOpen: sidebarOpen,
        onClose: sidebarClose,
    } = useDisclosure();
    const [editorText, setEditorText] = useState("Hello world!");
    const [slideNumber, setSlide] = useState(1);
    const [maxSlides, addSlide] = useState(1);
    const [prevSlide, setPrevSlide] = useState(1);
    const [slides, setSlides] = useState([editorText]);
    const [prevButton, setPrevButton] = useState(true);
    const [nextButton, setNextButton] = useState(true);
    const [printButton, setPrintButton] = useState(false);
    const [saveButton, setSaveButton] = useState(false);

    const moduleName = "Untitled Module";
    return (
        <Stack spacing={0}>
            <Stack spacing={2} p={6}>
                <Box>
                    <Button variant="link">{"<"} Exit Builder</Button>
                </Box>
                <Flex>
                    <Heading>{moduleName}</Heading>
                    <Spacer />
                    <HStack spacing={2}>
                        <Button variant="outline"> Discard </Button>
                        <Button
                            onClick={() => {
                                const newSlides = [...slides];
                                newSlides[slideNumber - 1] = editorText;
                                setSlides(newSlides);
                            }}
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
                        onBlur={(e) => {
                            const target = e.target as HTMLInputElement;
                            if ((!isNaN(parseInt(target.value)) && parseInt(target.value) >= 1 && parseInt(target.value) <= maxSlides)) {
                                setEditorText(slides[Number(slideNumber) - 1]);
                                setPrevSlide(slideNumber);
                            } else {
                                setSlide(prevSlide);
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
                            <Container maxW="70%" py={4}>
                                <Stack spacing={2}>
                                    <Heading>Section {slideNumber}</Heading>
                                    <MarkdownEditor
                                        value={editorText}
                                        setValue={setEditorText}
                                    />
                                </Stack>
                            </Container>
                            <Container>
                                <Stack spacing={10} direction="row">
                                    <CheckboxComp 
                                        defaultIsChecked 
                                        text="Prev"
                                        onChange= {() => {
                                            setPrevButton( !prevButton );
                                        }}
                                        />
                                    <CheckboxComp 
                                    defaultIsChecked 
                                    text="Next"
                                    onChange= {() => {
                                        setNextButton( !nextButton );
                                    }}
                                    />
                                    <CheckboxComp 
                                    text="Save"
                                    onChange= {() => {
                                        setSaveButton( !saveButton );
                                    }}
                                    />
                                    <CheckboxComp 
                                    text="Print"
                                    onChange= {() => {
                                        setPrintButton( !printButton );
                                    }}
                                    />
                                </Stack>
                            </Container>
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
                    >
                        <MarkdownRenderer>{editorText}</MarkdownRenderer>
                        <ModulePreview
                            previous={prevButton}
                            next={nextButton}
                            save={saveButton}
                            print={printButton}
                            progressValue={(slideNumber / maxSlides) * 100}
                            variant={""}
                        >
                            {}
                        </ModulePreview>
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
