import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../pages/api/utils/mongoose";
import { useState, React } from "react";
import {
    SimpleGrid,
    Flex,
    Box,
    Heading,
    Menu,
    Input,
    InputLeftElement,
    InputGroup,
    Button,
    ButtonGroup,
    Stack,
    IconButton,
    Select,
    Textarea,
    useBoolean,
    useDisclosure,
    Modal,
    ModalHeader,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";

import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";

import selfCheckData from "@public/selfCheckQuestions.json";

//Self check question card component
export const SelfCheckQuestionCards: React.FC = (
    questionNumber,
    selfCheckQuestionSize,
    type,
    options,
) => {
    //Keeps track of the modal state for the delete question button
    const { isOpen, onOpen, onClose } = useDisclosure();
    //TO DO: connect these booleans with the actual database values
    const [flag, setFlag] = useBoolean();
    // To convert between the variable Name and the common English name
    const questionTypeDict = {
        multiple_choice: "Multiple Choice",
        multi_select: "Multi Select",
        short_answer: "Short Answer",
        long_answer: "Long Answer",
        slider: "Slider",
    };
    //To count the number of Self Check Questions

    return (
        <SimpleGrid columns={1} spacing={0} px={10} py={10}>
            <Box overflowX="auto">
                {questionNumber == 1 && (
                    <Button
                        borderWidth="2px"
                        borderRadius="lg"
                        p={3}
                        mb={5}
                        bg={"white"}
                        borderColor="#3182CE"
                        color="#3182CE"
                        width={"full"}
                        fontWeight={600}
                    >
                        + Question
                    </Button>
                )}
                <Box
                    borderWidth="2px"
                    borderRadius="lg"
                    rounded={"md"}
                    p={6}
                    borderColor="#C0BABA"
                >
                    <Flex alignContent="center" pb={15}>
                        <Menu>
                            <Heading
                                fontSize={20}
                                fontWeight="500"
                                alignSelf="center"
                                mr={6}
                            >
                                {questionNumber}.
                            </Heading>
                            <Input
                                size={"lg"}
                                variant="flushed"
                                placeholder="Untitled Question"
                                width={"full"}
                                pl={2}
                                mr={6}
                            />

                            <Select
                                minWidth={160}
                                width={280}
                                mr={6}
                                defaultValue={type}
                            >
                                <option value="multiple_choice">
                                    {questionTypeDict["multiple_choice"]}
                                </option>
                                <option value="multi_select">
                                    {questionTypeDict["multi_select"]}
                                </option>
                                <option value="short_answer">
                                    {questionTypeDict["short_answer"]}
                                </option>
                                <option value="long_answer">
                                    {questionTypeDict["long_answer"]}
                                </option>
                                <option value="slider">
                                    {questionTypeDict["slider"]}
                                </option>
                            </Select>
                        </Menu>
                        {questionNumber != 1 && (
                            <IconButton icon={<ArrowUpIcon />} />
                        )}
                        {questionNumber != selfCheckQuestionSize && (
                            <IconButton ml={2.5} icon={<ArrowDownIcon />} />
                        )}
                    </Flex>
                    <Flex alignContent="center">
                        {type == "multiple_choice" && (
                            <Flex width={"full"}>
                                <Stack minWidth={"50%"} spacing={3}>
                                    {(options ?? []).map((option) => (
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={
                                                    <Heading
                                                        fontSize={20}
                                                        fontWeight="bold"
                                                        alignSelf="center"
                                                        mr={6}
                                                    >
                                                        〇
                                                    </Heading>
                                                }
                                            />
                                            <Input
                                                variant="flushed"
                                                placeholder={option}
                                                mr={6}
                                            />
                                        </InputGroup>
                                    ))}
                                    <Button maxWidth={"120"} variant="ghost">
                                        +Add Option
                                    </Button>
                                </Stack>
                            </Flex>
                        )}
                        {type == "multi_select" && (
                            <Flex width={"full"}>
                                <Stack minWidth={"50%"} spacing={3}>
                                    {(options ?? []).map((option) => (
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={
                                                    <Heading
                                                        fontSize={20}
                                                        fontWeight="bold"
                                                        alignSelf="center"
                                                        mr={6}
                                                    >
                                                        ▢
                                                    </Heading>
                                                }
                                            />
                                            <Input
                                                variant="flushed"
                                                placeholder={option}
                                                mr={6}
                                            />
                                        </InputGroup>
                                    ))}
                                    <Button maxWidth={"120"} variant="ghost">
                                        +Add Option
                                    </Button>
                                </Stack>
                            </Flex>
                        )}
                        {type == "short_answer" && (
                            <Textarea
                                height={10}
                                maxHeight={300}
                                resize={"vertical"}
                                mr={3}
                                placeholder={"Short answer text"}
                            />
                        )}
                        {type == "long_answer" && (
                            <Textarea
                                height={10}
                                maxHeight={300}
                                resize={"vertical"}
                                mr={3}
                                placeholder={"Long answer text"}
                            />
                        )}
                        {type == "slider" && (
                            <Stack width={"50%"} alignItems="left" ml={10}>
                                <Flex alignItems="center" direction="row">
                                    <Select
                                        minWidth={"50"}
                                        variant="flushed"
                                        defaultValue={1}
                                        mr={10}
                                    >
                                        <option value={0}>0</option>
                                        <option value={1}>1</option>
                                    </Select>
                                    <h3>to</h3>
                                    <Select
                                        minWidth={"50"}
                                        variant="flushed"
                                        ml={10}
                                        mr={6}
                                        defaultValue={5}
                                    >
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                    </Select>
                                </Flex>
                                <Stack>
                                    {(options ?? []).map((option) => (
                                        <Flex>
                                            <Heading
                                                fontSize={16}
                                                fontWeight="500"
                                                alignSelf="center"
                                                mr={2}
                                            >
                                                {option[0]}
                                            </Heading>
                                            <Input
                                                variant="flushed"
                                                placeholder="Label (Optional)"
                                                width={"full"}
                                                pl={2}
                                                mr={6}
                                            />
                                        </Flex>
                                    ))}
                                </Stack>
                            </Stack>
                        )}
                        {type != "slider" && (
                            <ButtonGroup
                                ml={2.5}
                                size="sm"
                                isAttached
                                variant="outline"
                            >
                                <Button
                                    onClick={setFlag.on}
                                    color={flag ? "white" : "black"}
                                    background={flag ? "black" : "white"}
                                >
                                    Aa
                                </Button>
                                <Button
                                    onClick={setFlag.off}
                                    color={flag ? "black" : "white"}
                                    background={flag ? "white" : "black"}
                                >
                                    123
                                </Button>
                            </ButtonGroup>
                        )}
                    </Flex>
                    <Flex direction={"rowReverse"} justify={"flex-end"}>
                        <Button
                            onClick={onOpen}
                            py={1}
                            px={3}
                            variant="ghost"
                            colorScheme="red"
                        >
                            Delete
                        </Button>
                    </Flex>
                    <Modal
                        isOpen={isOpen}
                        onClose={onClose}
                        motionPreset="slideInBottom"
                    >
                        <ModalOverlay />
                        <ModalContent p={"5"}>
                            <ModalHeader>Delete Question</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                Are you sure you want to delete this question?
                                This is a permanent action that cannot be
                                undone.
                            </ModalBody>
                            <ModalFooter>
                                <Button
                                    variant="outline"
                                    colorScheme="black"
                                    mr={3}
                                    w={100}
                                    onClick={onClose}
                                >
                                    Cancel
                                </Button>
                                <Button w={100} colorScheme="red">
                                    Delete
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Box>
                <Button
                    borderWidth="2px"
                    borderRadius="lg"
                    p={3}
                    my={5}
                    bg={"white"}
                    borderColor="#3182CE"
                    color="#3182CE"
                    width={"full"}
                    fontWeight={600}
                >
                    + Question
                </Button>
            </Box>
        </SimpleGrid>
    );
};
