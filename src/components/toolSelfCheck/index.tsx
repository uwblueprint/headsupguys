import React, { useState } from "react";
import {
    Flex,
    Box,
    Heading,
    Circle,
    Square,
    Spacer,
    Input,
    InputLeftElement,
    InputRightElement,
    InputGroup,
    CloseButton,
    Button,
    ButtonGroup,
    Stack,
    HStack,
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

//Interface Props
export interface SelfCheckQuestionCardProps {
    alphanumeric: boolean;
    type: string;
    options: string[][];
    question: string;
    questionId: string;
    questionIndex: number;
    selfCheckQuestionSize: number;
    onAddOption: (id: string, target: string) => void;
    onRemoveOption: (id: string, target: number) => void;
    onChangeOptionInput: (
        id: string,
        index: number,
        target: string,
        optionOrValue: string,
    ) => void;
    onChangeAlphanumeric: (id: string, target: boolean) => void;
    onAddQuestion: (index: string) => void;
    onRemoveQuestion: (id: string) => void;
    onMoveQuestion: (index: string, direction: int) => void;
    onChangeQuestionInput: (id: string, target: string) => void;
    onChangeQuestionType: (
        id: string,
        target: string,
        sliderLowerBound: number,
        sliderUpperBound: number,
    ) => void;
    onChangeSliderBounds: (
        id: string,
        target: number,
        sliderUpperBound: number,
    ) => void;
}

//Self check question card component
export const SelfCheckQuestionCard: React.FC<SelfCheckQuestionCardProps> = ({
    alphanumeric,
    type,
    options,
    question,
    questionId,
    questionIndex,
    selfCheckQuestionSize,
    onAddOption,
    onRemoveOption,
    onChangeOptionInput,
    onChangeAlphanumeric,
    onAddQuestion,
    onRemoveQuestion,
    onMoveQuestion,
    onChangeQuestionInput,
    onChangeQuestionType,
    onChangeSliderBounds,
}) => {
    //Keeps track of the modal state for the delete question button
    const { isOpen, onOpen, onClose } = useDisclosure();

    const optionList = [
        {
            value: "multiple_choice",
            label: "Multiple Choice",
        },
        {
            value: "multi_select",
            label: "Multi Select",
        },
        {
            value: "short_answer",
            label: "Short Answer",
        },
        {
            value: "long_answer",
            label: "Long Answer",
        },
        {
            value: "slider",
            label: "Slider",
        },
    ];

    const [sliderLowerBound, setSliderLowerBound] = useState(1);
    const [sliderUpperBound, setSliderUpperBound] = useState(options.length);

    const changeSliderLowerBound = (e) => {
        onChangeSliderBounds(questionId, e.target.value, sliderUpperBound);
        setSliderLowerBound(e.target.value);
    };
    const changeSliderUpperBound = (e) => {
        onChangeSliderBounds(questionId, e.target.value, sliderUpperBound);
        setSliderUpperBound(e.target.value);
    };

    return (
        <Box overflowX="auto">
            <Box
                borderWidth="2px"
                borderRadius="lg"
                rounded={"md"}
                p={"6"}
                borderColor="#C0BABA"
            >
                <Flex wrap={"wrap"}>
                    <Flex minWidth={"40%"} p="2">
                        <Heading
                            fontSize={"20"}
                            fontWeight="500"
                            alignSelf="center"
                            mr={"6"}
                        >
                            {questionIndex + 1}.
                        </Heading>
                        <Input
                            onChange={(e) =>
                                onChangeQuestionInput(
                                    questionId,
                                    e.target.value,
                                )
                            }
                            width={"full"}
                            size={"lg"}
                            variant="flushed"
                            value={question}
                            placeholder="Untitled Question"
                            mr={"6"}
                            ml={"2"}
                            mb={"3"}
                            isTruncated
                        />
                    </Flex>
                    <Flex pb={"15"} marginLeft={"auto"}>
                        <Select
                            value={type}
                            minWidth={"165"}
                            mr={selfCheckQuestionSize == 1 ? "0" : "6"}
                            onChange={(e) =>
                                onChangeQuestionType(
                                    questionId,
                                    e.target.value,
                                    sliderLowerBound,
                                    sliderUpperBound,
                                )
                            }
                        >
                            {(optionList ?? []).map((choice, index) => (
                                <option
                                    key={`Question Type: ${
                                        questionId + index
                                    }=${choice.value}`}
                                    value={choice.value}
                                >
                                    {choice.label}
                                </option>
                            ))}
                        </Select>

                        {questionIndex != 0 && (
                            <IconButton
                                onClick={() => onMoveQuestion(questionIndex, 1)}
                                ml={
                                    questionIndex + 1 == selfCheckQuestionSize
                                        ? "10"
                                        : "0"
                                }
                                mr={
                                    questionIndex + 1 == selfCheckQuestionSize
                                        ? "5"
                                        : "0"
                                }
                                background={"white"}
                                color={"black"}
                                _hover={{ background: "gray.100" }}
                                icon={<ArrowUpIcon />}
                            />
                        )}
                        {questionIndex != selfCheckQuestionSize - 1 &&
                            selfCheckQuestionSize > 1 && (
                                <IconButton
                                    onClick={() =>
                                        onMoveQuestion(questionIndex, -1)
                                    }
                                    ml={questionIndex == 0 ? "10" : "2"}
                                    mr={"5"}
                                    background={"white"}
                                    color={"black"}
                                    _hover={{ background: "gray.100" }}
                                    icon={<ArrowDownIcon />}
                                />
                            )}
                    </Flex>
                </Flex>

                <Flex
                    alignContent="left"
                    alignItems={"left"}
                    align={"left"}
                    justify={"left"}
                    justifyContent={"left"}
                >
                    {type == "multiple_choice" && (
                        <>
                            <Flex width={"full"}>
                                <Stack mr={0} minWidth={"50%"} spacing={3}>
                                    <Flex
                                        width={"full"}
                                        justify={"left"}
                                        wrap={"wrap"}
                                    >
                                        <Heading
                                            mb={"2"}
                                            ml={"3"}
                                            fontSize={"20"}
                                            fontWeight="bold"
                                        >
                                            User Facing Options
                                        </Heading>
                                    </Flex>
                                    {(options ?? []).map((option, index) => (
                                        <InputGroup
                                            key={`Multiple Choice: ${
                                                questionId + index
                                            }=${option.value}`}
                                        >
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={
                                                    <Circle
                                                        size="15px"
                                                        color="white"
                                                        borderWidth="2px"
                                                        borderColor="black"
                                                    ></Circle>
                                                }
                                            />
                                            <Input
                                                onChange={(e) =>
                                                    onChangeOptionInput(
                                                        questionId,
                                                        index,
                                                        e.target.value,
                                                        "option",
                                                    )
                                                }
                                                value={options[index][0]}
                                                variant="flushed"
                                                placeholder={`Option ${
                                                    index + 1
                                                }`}
                                                mr={"6"}
                                                isTruncated
                                            />
                                            <InputRightElement width="4.5rem">
                                                <CloseButton
                                                    name={questionId}
                                                    onClick={() => {
                                                        onRemoveOption(
                                                            questionId,
                                                            index,
                                                        );
                                                        setSliderUpperBound(
                                                            sliderUpperBound -
                                                                1,
                                                        );
                                                        console.log(
                                                            sliderUpperBound,
                                                        );
                                                    }}
                                                />
                                            </InputRightElement>
                                        </InputGroup>
                                    ))}
                                    <Button
                                        maxWidth={"120"}
                                        variant="ghost"
                                        onClick={() => {
                                            onAddOption(questionId, "bottom");
                                            setSliderUpperBound(options.length);
                                            console.log(sliderUpperBound);
                                        }}
                                    >
                                        +Add Option
                                    </Button>
                                </Stack>
                                <Stack minWidth={"50%"} spacing={3}>
                                    <Flex
                                        width={"full"}
                                        justify={"right"}
                                        wrap={"wrap"}
                                    >
                                        <Heading
                                            fontSize={"20"}
                                            fontWeight="bold"
                                        >
                                            Corresponding Values
                                        </Heading>
                                        <Spacer></Spacer>
                                        <ButtonGroup
                                            ml={"1"}
                                            mr={"5"}
                                            size="sm"
                                            isAttached
                                            variant="outline"
                                        >
                                            <Button
                                                value={alphanumeric}
                                                onClick={() =>
                                                    onChangeAlphanumeric(
                                                        questionId,
                                                        true,
                                                    )
                                                }
                                                _hover={{
                                                    bg: alphanumeric
                                                        ? "black"
                                                        : "white",
                                                }}
                                                color={
                                                    alphanumeric
                                                        ? "white"
                                                        : "black"
                                                }
                                                background={
                                                    alphanumeric
                                                        ? "black"
                                                        : "white"
                                                }
                                            >
                                                Aa
                                            </Button>
                                            <Button
                                                value={alphanumeric}
                                                onClick={() =>
                                                    onChangeAlphanumeric(
                                                        questionId,
                                                        false,
                                                    )
                                                }
                                                _hover={{
                                                    bg: alphanumeric
                                                        ? "white"
                                                        : "black",
                                                }}
                                                color={
                                                    alphanumeric
                                                        ? "black"
                                                        : "white"
                                                }
                                                background={
                                                    alphanumeric
                                                        ? "white"
                                                        : "black"
                                                }
                                            >
                                                123
                                            </Button>
                                        </ButtonGroup>
                                    </Flex>
                                    {(options ?? []).map((option, index) => (
                                        <InputGroup
                                            key={`Corresponding Value: ${
                                                questionId + index
                                            }=${option.value}`}
                                        >
                                            <Input
                                                onChange={(e) =>
                                                    onChangeOptionInput(
                                                        questionId,
                                                        index,
                                                        alphanumeric
                                                            ? e.target.value
                                                            : e.target.value.replace(
                                                                  /[^\d]+/g,
                                                                  "",
                                                              ),
                                                        "value",
                                                    )
                                                }
                                                value={options[index][1]}
                                                variant="flushed"
                                                placeholder={`Value ${
                                                    index + 1
                                                }`}
                                                mr={6}
                                                isTruncated
                                            />
                                            <InputRightElement width="4.5rem">
                                                <CloseButton
                                                    name={questionId}
                                                    onClick={() => {
                                                        onRemoveOption(
                                                            questionId,
                                                            index,
                                                        );
                                                        setSliderUpperBound(
                                                            options.length,
                                                        );
                                                        console.log(
                                                            sliderUpperBound,
                                                        );
                                                    }}
                                                />
                                            </InputRightElement>
                                        </InputGroup>
                                    ))}
                                </Stack>
                            </Flex>
                            <Stack>Cool</Stack>
                        </>
                    )}
                    {type == "multi_select" && (
                        <Flex
                            width={"full"}
                            justifyContent={"left"}
                            justify={"left"}
                            justifySelf={"right"}
                            alignItems={"flex-start"}
                            alignContent={"flex-start"}
                        >
                            <Stack
                                minWidth={"50%"}
                                alignContent={"flex-start"}
                                spacing={3}
                            >
                                <Flex
                                    width={"full"}
                                    justify={"left"}
                                    wrap={"wrap"}
                                >
                                    <Heading
                                        mb={"2"}
                                        ml={"3"}
                                        fontSize={20}
                                        fontWeight="bold"
                                    >
                                        User Facing Options
                                    </Heading>
                                </Flex>
                                {(options ?? []).map((option, index) => (
                                    <InputGroup
                                        key={`Multi Select: ${
                                            questionId + index
                                        }=${option.value}`}
                                    >
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={
                                                <Square
                                                    size="15px"
                                                    color="white"
                                                    borderWidth="2px"
                                                    borderColor="black"
                                                ></Square>
                                            }
                                        />
                                        <Input
                                            onChange={(e) =>
                                                onChangeOptionInput(
                                                    questionId,
                                                    index,
                                                    e.target.value,
                                                    "option",
                                                )
                                            }
                                            value={options[index][0]}
                                            variant="flushed"
                                            placeholder={`Option ${index + 1}`}
                                            mr={6}
                                            isTruncated
                                        />
                                        <InputRightElement width="4.5rem">
                                            <CloseButton
                                                name={questionId}
                                                onClick={() => {
                                                    onRemoveOption(
                                                        questionId,
                                                        index,
                                                    );
                                                    setSliderUpperBound(
                                                        options.length,
                                                    );
                                                    console.log(
                                                        sliderUpperBound,
                                                    );
                                                }}
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                ))}
                                <Button
                                    maxWidth={"120"}
                                    variant="ghost"
                                    onClick={() => {
                                        onAddOption(questionId, "bottom");
                                        setSliderUpperBound(options.length);
                                        console.log(sliderUpperBound);
                                    }}
                                >
                                    +Add Option
                                </Button>
                            </Stack>
                            <Stack minWidth={"50%"} spacing={3}>
                                <Flex
                                    width={"full"}
                                    justify={"right"}
                                    wrap={"wrap"}
                                >
                                    <Heading fontSize={"20"} fontWeight="bold">
                                        Corresponding Values
                                    </Heading>
                                    <Spacer></Spacer>
                                    <ButtonGroup
                                        ml={"1"}
                                        mr={"5"}
                                        size="sm"
                                        isAttached
                                        variant="outline"
                                    >
                                        <Button
                                            value={alphanumeric}
                                            onClick={() =>
                                                onChangeAlphanumeric(
                                                    questionId,
                                                    true,
                                                )
                                            }
                                            _hover={{
                                                bg: alphanumeric
                                                    ? "black"
                                                    : "white",
                                            }}
                                            color={
                                                alphanumeric ? "white" : "black"
                                            }
                                            background={
                                                alphanumeric ? "black" : "white"
                                            }
                                        >
                                            Aa
                                        </Button>
                                        <Button
                                            value={alphanumeric}
                                            onClick={() =>
                                                onChangeAlphanumeric(
                                                    questionId,
                                                    false,
                                                )
                                            }
                                            _hover={{
                                                bg: alphanumeric
                                                    ? "white"
                                                    : "black",
                                            }}
                                            color={
                                                alphanumeric ? "black" : "white"
                                            }
                                            background={
                                                alphanumeric ? "white" : "black"
                                            }
                                        >
                                            123
                                        </Button>
                                    </ButtonGroup>
                                </Flex>
                                {(options ?? []).map((option, index) => (
                                    <InputGroup
                                        key={`Multi Select: ${
                                            questionId + index
                                        }=${option.value}`}
                                    >
                                        <Input
                                            onChange={(e) =>
                                                onChangeOptionInput(
                                                    questionId,
                                                    index,
                                                    alphanumeric
                                                        ? e.target.value
                                                        : e.target.value.replace(
                                                              /[^\d]+/g,
                                                              "",
                                                          ),
                                                    "value",
                                                )
                                            }
                                            variant="flushed"
                                            value={options[index][1]}
                                            placeholder={`Value ${index + 1}`}
                                            mr={"6"}
                                            isTruncated
                                        />
                                        <InputRightElement width="4.5rem">
                                            <CloseButton
                                                name={questionId}
                                                onClick={() => {
                                                    onRemoveOption(
                                                        questionId,
                                                        index,
                                                    );
                                                    setSliderUpperBound(
                                                        options.length,
                                                    );
                                                    console.log(
                                                        sliderUpperBound,
                                                    );
                                                }}
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                ))}
                            </Stack>
                        </Flex>
                    )}
                    {type == "short_answer" && (
                        <HStack width={"full"} alignItems={"start"}>
                            <Textarea
                                height={"10"}
                                maxHeight={"300"}
                                resize={"vertical"}
                                mr={"3"}
                                disabled
                                placeholder={
                                    alphanumeric
                                        ? "Short answer text"
                                        : "Short answer numbers"
                                }
                                value={""}
                            />
                            <ButtonGroup
                                ml={"1"}
                                mb={"auto"}
                                mr={"5"}
                                size="sm"
                                isAttached
                                variant="outline"
                            >
                                <Button
                                    value={alphanumeric}
                                    onClick={() =>
                                        onChangeAlphanumeric(questionId, true)
                                    }
                                    _hover={{
                                        bg: alphanumeric ? "black" : "white",
                                    }}
                                    color={alphanumeric ? "white" : "black"}
                                    background={
                                        alphanumeric ? "black" : "white"
                                    }
                                >
                                    Aa
                                </Button>
                                <Button
                                    value={alphanumeric}
                                    onClick={() =>
                                        onChangeAlphanumeric(questionId, false)
                                    }
                                    _hover={{
                                        bg: alphanumeric ? "white" : "black",
                                    }}
                                    color={alphanumeric ? "black" : "white"}
                                    background={
                                        alphanumeric ? "white" : "black"
                                    }
                                >
                                    123
                                </Button>
                            </ButtonGroup>
                        </HStack>
                    )}
                    {type == "long_answer" && (
                        <HStack width={"full"} alignItems={"start"}>
                            <Textarea
                                height={"10"}
                                maxHeight={"300"}
                                resize={"vertical"}
                                mr={"3"}
                                disabled
                                placeholder={
                                    alphanumeric
                                        ? "Long answer text"
                                        : "Long answer numbers"
                                }
                                value={""}
                            />
                            <ButtonGroup
                                ml={"1"}
                                mb={"auto"}
                                mr={"5"}
                                size="sm"
                                isAttached
                                variant="outline"
                            >
                                <Button
                                    value={alphanumeric}
                                    onClick={() =>
                                        onChangeAlphanumeric(questionId, true)
                                    }
                                    _hover={{
                                        bg: alphanumeric ? "black" : "white",
                                    }}
                                    color={alphanumeric ? "white" : "black"}
                                    background={
                                        alphanumeric ? "black" : "white"
                                    }
                                >
                                    Aa
                                </Button>
                                <Button
                                    value={alphanumeric}
                                    onClick={() =>
                                        onChangeAlphanumeric(questionId, false)
                                    }
                                    _hover={{
                                        bg: alphanumeric ? "white" : "black",
                                    }}
                                    color={alphanumeric ? "black" : "white"}
                                    background={
                                        alphanumeric ? "white" : "black"
                                    }
                                >
                                    123
                                </Button>
                            </ButtonGroup>
                        </HStack>
                    )}
                    {type == "slider" && (
                        <Stack width={"50%"} alignItems="left" ml={10}>
                            <Flex alignItems="center" direction="row">
                                <Select
                                    minWidth={"50"}
                                    variant="flushed"
                                    onChange={(e) => {
                                        changeSliderLowerBound(e);
                                        setSliderUpperBound(options.length);
                                    }}
                                    value={sliderLowerBound}
                                    mr={10}
                                >
                                    <option value={0}>0</option>
                                    <option value={1}>1</option>
                                </Select>
                                <h3>to</h3>
                                <Select
                                    minWidth={"50"}
                                    variant="flushed"
                                    ml={"10"}
                                    mr={"6"}
                                    onChange={(e) => {
                                        changeSliderUpperBound(e);
                                        setSliderUpperBound(options.length);
                                    }}
                                    value={
                                        sliderLowerBound == 0
                                            ? options.length - 1
                                            : options.length
                                    }
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
                            <Stack>
                                {(options ?? []).map((option, index) => (
                                    <Flex
                                        key={`Slider: ${questionId + index}=${
                                            option.value
                                        }`}
                                    >
                                        {sliderLowerBound == 0 && (
                                            <Heading
                                                fontSize={"16"}
                                                fontWeight="500"
                                                alignSelf="center"
                                                mr={"2"}
                                            >
                                                {index}
                                            </Heading>
                                        )}
                                        {sliderLowerBound != 0 && (
                                            <Heading
                                                fontSize={"16"}
                                                fontWeight="500"
                                                alignSelf="center"
                                                mr={"2"}
                                            >
                                                {index + 1}
                                            </Heading>
                                        )}
                                        <Input
                                            onChange={(e) =>
                                                onChangeOptionInput(
                                                    questionId,
                                                    index,
                                                    e.target.value,
                                                    "option",
                                                )
                                            }
                                            value={options[index][0]}
                                            variant="flushed"
                                            placeholder={"Label (Optional)"}
                                            mr={"6"}
                                            isTruncated
                                        />
                                    </Flex>
                                ))}
                            </Stack>
                        </Stack>
                    )}
                </Flex>
                <Flex direction={"rowReverse"} justify={"flex-end"}>
                    <Button
                        onClick={onOpen}
                        py={"1"}
                        px={"3"}
                        variant="ghost"
                        colorScheme="red"
                    >
                        Delete
                    </Button>
                </Flex>
                <Modal
                    blockScrollOnMount={false}
                    isOpen={isOpen}
                    onClose={onClose}
                    motionPreset="slideInBottom"
                >
                    <ModalOverlay />
                    <ModalContent p={"5"}>
                        <ModalHeader>
                            Delete Question {questionIndex + 1}
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            Are you sure you want to delete this question? This
                            is a permanent action that cannot be undone.
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                variant="outline"
                                colorScheme="black"
                                mr={"3"}
                                w={"100"}
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => onRemoveQuestion(questionId)}
                                w={"100"}
                                background="red.600"
                                _hover={{ background: "red.700" }}
                            >
                                Delete
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Box>
            <Button
                borderWidth="2px"
                borderRadius="lg"
                p={"3"}
                my={"5"}
                bg={"white"}
                variant="outlineBlue"
                width={"full"}
                fontWeight={600}
                onClick={() => onAddQuestion(questionIndex)}
            >
                + Question
            </Button>
        </Box>
    );
};
