import React from "react";
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
    return (
        <SimpleGrid columns={1} spacing={10} px={10} py={10}>
            {(selfCheckData?.plugins ?? []).map((plugin) => (
                <Box>
                    <Button
                        borderWidth="2px"
                        borderRadius="lg"
                        p={3}
                        mb={5}
                        bg={"white"}
                        borderColor="#3182CE"
                        color="#3182CE"
                        width={"full"}
                        key={plugin.number}
                        fontWeight={600}
                    >
                        + Question
                    </Button>
                    <Box
                        borderWidth="2px"
                        borderRadius="lg"
                        key={plugin.number}
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
                                    {plugin.number}
                                </Heading>
                                <Input
                                    variant="flushed"
                                    placeholder="Title"
                                    width={"full"}
                                    mr={6}
                                />

                                <Select minWidth={160} width={280} mr={6}>
                                    <option value="option1">
                                        Multiple Choice
                                    </option>
                                    <option value="option1">
                                        Multi Select
                                    </option>
                                    <option value="option2">
                                        Short Answer
                                    </option>
                                    <option value="option3">Long Answer</option>
                                    <option value="option4">Slider</option>
                                </Select>
                            </Menu>
                            <IconButton mr={2.5} icon={<ArrowUpIcon />} />
                            <IconButton icon={<ArrowDownIcon />} />
                        </Flex>
                        <Flex alignContent="center">
                            <Textarea
                                resizr={"horizontal"}
                                placeholder={plugin.questionType}
                                mr={3}
                            />
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
                                mt={15}
                                pt={1}
                                pb={1}
                                pr={3}
                                pl={3}
                                variant="ghost"
                                colorScheme="red"
                            >
                                Delete
                            </Button>
                        </Flex>
                    </Box>
                </Box>
            ))}
        </SimpleGrid>
    );
};
