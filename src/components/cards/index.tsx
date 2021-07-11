import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../pages/api/utils/mongoose";

import { useState, React } from "react";
import {
    SimpleGrid,
    Flex,
    Box,
    Heading,
    Text,
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
    useDisclosure,
    Modal,
    ModalHeader,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";

import { ArrowUpIcon, ArrowDownIcon, PhoneIcon } from "@chakra-ui/icons";

import data from "@public/meta.json";
import selfCheckData from "@public/selfCheckQuestions.json";

export const Cards: React.FC = () => {
    return (
        <SimpleGrid columns={4} spacing={10} px={20} py={10}>
            {(data?.plugins ?? []).map((plugin) => (
                <Box key={plugin.name}>
                    <Heading fontSize={16} fontWeight="500" py={5}>
                        {plugin.name}
                    </Heading>
                    <Text fontSize={14}>{plugin.description}</Text>
                </Box>
            ))}
        </SimpleGrid>
    );
};

export const SelfCheckQuestionCards: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    // const [value, setValue] = React.useState("Multiple Choice");
    // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setValue(event.target.value);
    // };
    const onChangeQty = (key) => {
        [selfCheckData?.questions ?? []][0][key].number = "5";
    };
    const questionTypeDict = {
        multiple_choice: "Multiple Choice",
        multi_select: "Multi Select",
        short_answer: "Short Answer",
        long_answer: "Long Answer",
        slider: "Slider",
    };

    const [values, setValues] = useState({
        title: "",
        questionType: "",
    });

    const set = (name) => {
        return ({ target: { value } }) => {
            setValues((oldValues) => ({ ...oldValues, [name]: value }));
            // console.log(
            //     Number([selfCheckData?.questions ?? []][0][key].number) - 1,
            // );
        };
    };
    const selfCheckQuestionSize = (selfCheckData?.questions ?? []).map(
        (question) => null,
    ).length;

    return (
        <SimpleGrid columns={1} spacing={0} px={10} py={10}>
            {(selfCheckData?.questions ?? []).map((question) => (
                <Box overflowX="auto">
                    {question.questionNumber == 1 && (
                        <Button
                            borderWidth="2px"
                            borderRadius="lg"
                            p={3}
                            mb={5}
                            bg={"white"}
                            borderColor="#3182CE"
                            color="#3182CE"
                            width={"full"}
                            key={question.questionNumber}
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
                                    fontSize={16}
                                    fontWeight="500"
                                    alignSelf="center"
                                    mr={6}
                                >
                                    {question.questionNumber}.
                                </Heading>
                                <Input
                                    variant="flushed"
                                    placeholder="Title"
                                    width={"full"}
                                    pl={2}
                                    mr={6}
                                    onChange={set("title")}
                                />

                                <Select
                                    minWidth={160}
                                    width={280}
                                    mr={6}
                                    placeholder={
                                        questionTypeDict[question.type]
                                    }
                                >
                                    {question.type != "multiple_choice" && (
                                        <option value="option1">
                                            {
                                                questionTypeDict[
                                                    "multiple_choice"
                                                ]
                                            }
                                        </option>
                                    )}
                                    {question.type != "multi_select" && (
                                        <option value="option1">
                                            {questionTypeDict["multi_select"]}
                                        </option>
                                    )}
                                    {question.type != "short_answer" && (
                                        <option value="option2">
                                            {questionTypeDict["short_answer"]}
                                        </option>
                                    )}
                                    {question.type != "long_answer" && (
                                        <option value="option3">
                                            {questionTypeDict["long_answer"]}
                                        </option>
                                    )}
                                    {question.type != "slider" && (
                                        <option
                                            value={questionTypeDict["slider"]}
                                        >
                                            Slider
                                        </option>
                                    )}
                                </Select>
                            </Menu>
                            {question.questionNumber != 1 && (
                                <IconButton icon={<ArrowUpIcon />} />
                            )}
                            {question.questionNumber !=
                                selfCheckQuestionSize && (
                                <IconButton ml={2.5} icon={<ArrowDownIcon />} />
                            )}
                        </Flex>
                        <Flex alignContent="center">
                            {question.type == "multiple_choice" && (
                                <Flex width={"full"}>
                                    <Stack minWidth={"50%"} spacing={3}>
                                        {(question?.options ?? []).map(
                                            (option) => (
                                                <InputGroup>
                                                    <InputLeftElement
                                                        pointerEvents="none"
                                                        children={
                                                            <strong>〇</strong>
                                                        }
                                                    />
                                                    <Input
                                                        variant="flushed"
                                                        placeholder={option}
                                                        mr={6}
                                                        onChange={set("title")}
                                                    />
                                                </InputGroup>
                                            ),
                                        )}
                                        <Button
                                            maxWidth={"120"}
                                            variant="ghost"
                                        >
                                            +Add Option
                                        </Button>
                                    </Stack>
                                </Flex>
                            )}
                            {question.type == "multi_select" && (
                                <Flex width={"full"}>
                                    <Stack minWidth={"50%"} spacing={3}>
                                        {(question?.options ?? []).map(
                                            (option) => (
                                                <InputGroup>
                                                    <InputLeftElement
                                                        pointerEvents="none"
                                                        children={
                                                            <strong>▢</strong>
                                                        }
                                                    />
                                                    <Input
                                                        variant="flushed"
                                                        placeholder={option}
                                                        mr={6}
                                                        onChange={set("title")}
                                                    />
                                                </InputGroup>
                                            ),
                                        )}
                                        <Button
                                            maxWidth={"120"}
                                            variant="ghost"
                                        >
                                            +Add Option
                                        </Button>
                                    </Stack>
                                </Flex>
                            )}
                            {question.type == "short_answer" && (
                                <Textarea
                                    height={10}
                                    maxHeight={300}
                                    resize={"vertical"}
                                    mr={3}
                                    placeholder={"Short answer text"}
                                />
                            )}
                            {question.type == "long_answer" && (
                                <Textarea
                                    height={10}
                                    maxHeight={300}
                                    resize={"vertical"}
                                    mr={3}
                                    placeholder={"Long answer text"}
                                />
                            )}
                            {question.type == "slider" && (
                                <Flex>
                                    <Select minWidth={160} width={280} mr={6}>
                                        <option value={0}>0</option>
                                        <option value={1}>1</option>
                                    </Select>
                                    <h3>to</h3>
                                    <Select
                                        minWidth={160}
                                        width={280}
                                        ml={6}
                                        mr={6}
                                    >
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                    </Select>
                                </Flex>
                            )}
                            {question.type != "slider" && (
                                <ButtonGroup
                                    ml={2.5}
                                    size="sm"
                                    isAttached
                                    variant="outline"
                                >
                                    <Button>Aa</Button>
                                    <Button>123</Button>
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
                            <ModalContent>
                                <ModalHeader>Delete Question</ModalHeader>
                                <ModalCloseButton />
                                <ModalBody>
                                    Are you sure you want to delete this
                                    question? This is a permanent action that
                                    cannot be undone.
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
                        key={question.number}
                        fontWeight={600}
                    >
                        + Question
                    </Button>
                </Box>
            ))}
        </SimpleGrid>
    );
};
connectDB(SelfCheckQuestionCards);
