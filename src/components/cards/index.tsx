import { NextApiRequest, NextApiResponse } from "next";
import connectDB from "../../../pages/api/utils/mongoose";

import { useState, React } from "react";
import {
    SimpleGrid,
    Flex,
    Box,
    Heading,
    Text,
    Input,
    Menu,
    ButtonGroup,
    Button,
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

import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons";

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
    const questionType = [
        "Multiple Choice",
        "Multi Select",
        "Short Answer",
        "Long Answer",
        "Slider",
    ];

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

    return (
        <SimpleGrid columns={1} spacing={0} px={10} py={10}>
            {(selfCheckData?.questions ?? []).map((question) => (
                <Box overflowX="auto">
                    {question.number == 1 && (
                        <Button
                            borderWidth="2px"
                            borderRadius="lg"
                            p={3}
                            mb={5}
                            bg={"white"}
                            borderColor="#3182CE"
                            color="#3182CE"
                            width={"full"}
                            key={question.number}
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
                                    {question.number}.
                                </Heading>
                                <Input
                                    variant="flushed"
                                    placeholder="Title"
                                    width={"full"}
                                    mr={6}
                                    onChange={set("title")}
                                />

                                <Select
                                    onChange={(e) =>
                                        onChangeQty(question.number)
                                    }
                                    minWidth={160}
                                    width={280}
                                    mr={6}
                                >
                                    {questionType.map((c) => (
                                        <option key={c}>{c}</option>
                                    ))}
                                </Select>
                            </Menu>
                            <IconButton mr={2.5} icon={<ArrowUpIcon />} />
                            <IconButton icon={<ArrowDownIcon />} />
                        </Flex>
                        <Flex alignContent="center">
                            {question.questionType == "Short Answer" && (
                                <Textarea
                                    height={100}
                                    maxHeight={300}
                                    resize={"vertical"}
                                    mr={3}
                                    placeholder={"Cool"}
                                />
                            )}
                            <ButtonGroup
                                ml={2.5}
                                size="sm"
                                isAttached
                                variant="outline"
                            >
                                <Button>Aa</Button>
                                <Button>123</Button>
                            </ButtonGroup>
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
    connectDB(SelfCheckQuestionCards);
};
