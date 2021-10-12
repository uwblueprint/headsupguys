/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import {
    Flex,
    Text,
    Button,
    Spacer,
    Stack,
    Box,
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

import { Page } from "types/Page";
import {
    BuilderLayout,
    MarkdownEditor,
    MarkdownRenderer,
    ModulePreview,
    CheckboxComp,
    ModuleSectionSelect
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
    const [buttons, setButtons] = useState(new Set(['prev', 'next']));

    const moduleName = "Untitled Module";
    const buttonOptions = ["prev", "next", "save", "print"];

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

    return (
        <Stack spacing={0}>
            <Stack spacing={2} p={6}>
                <Box>
                    <Link href="modules">
                        <Button variant="link">{"<"} Exit Builder</Button>
                    </Link>
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
                            if(e.key === "Enter") {
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
                            <Container maxW="70%" py={4}>
                                <Stack spacing={2}>
                                    <ModuleSectionSelect editorText={editorText} setEditorText={setEditorText} sectionNumber={slideNumber} />
                                    <Button outlineColor="black" variant="ghost">+ New Section</Button>
                                </Stack>
                            </Container>
                            <Container>
                                <Stack spacing={10} direction="row">
                                    {
                                        buttonOptions.map( (button) => (
                                            <CheckboxComp
                                                text={button}
                                                isChecked={buttons.has(button) ? true : false}
                                                onChange={() => {
                                                    if(buttons.has(button)){
                                                        const newButtons = new Set(buttons);
                                                        newButtons.delete(button);
                                                        setButtons(newButtons);
                                                    }
                                                    else{
                                                        setButtons(new Set(buttons).add(button));
                                                    }
                                                }}
                                            />
                                        ))
                                    }
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
                                previous = {( buttons.has("prev")) ? true : false}
                                next = {( buttons.has("next")) ? true : false}
                                save = {( buttons.has("save")) ? true : false}
                                print= {( buttons.has("print")) ? true : false}
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
