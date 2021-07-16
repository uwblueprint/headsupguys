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

//Self check question card component
export const SelfCheckQuestionCard: React.FC = ({
    type,
    item,
    options,
    onAddOption,
    sliderRange,
    alphanumeric,
    onRemoveOption,
    onChangeAlphanumeric,
    selfCheckQuestionSize,
    onChangeSliderOption,
    onChangeQuestionInput,
    onChangeOptionInput,
    onChangeQuestionType,
    onMoveDownQuestion,
    onRemoveQuestion,
    onMoveUpQuestion,
    onAddQuestion,
    questionIndex,
    questionId,
    question,
}) => {
    //Keeps track of the modal state for the delete question button
    const { isOpen, onOpen, onClose } = useDisclosure();
    //TO DO: connect these booleans with the actual database values

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
    const [questionInput, setQuestionInput] = useState(question);
    const changeAlphanumeric = (e, optionOrValue) => {
        onChangeAlphanumeric(questionId, e, optionOrValue);
    };
    const changeQuestionInput = (e) => {
        setQuestionInput(e.target.value);
        onChangeQuestionInput(questionId, e.target.value);
    };
    const changeOptionInput = (e, index, optionOrValue) => {
        onChangeOptionInput(questionId, index, e.target.value, optionOrValue);
    };
    const [selectedOption, setSelectedOption] = useState(type);
    function questionType(e) {
        setSelectedOption(e.target.value);
        onChangeQuestionType(questionId, e.target.value);
    }
    const [sliderStart, setSliderStart] = useState(1);
    const [sliderEnd, setSliderEnd] = useState(options.length);

    const sliderLowerBound = (e) => {
        setSliderStart(e.target.value);
        onChangeSliderOption(questionId, e.target.value, sliderEnd);
    };
    const sliderUpperBound = (e) => {
        setSliderEnd(e.target.value);
        onChangeSliderOption(questionId, sliderStart, e.target.value);
    };

    return (
        <Box overflowX="auto">
            <Box
                borderWidth="2px"
                borderRadius="lg"
                rounded={"md"}
                p={6}
                borderColor="#C0BABA"
            >
                <Flex wrap={"wrap"}>
                    <Flex minWidth={"40%"} p="2">
                        <Heading
                            fontSize={20}
                            fontWeight="500"
                            alignSelf="center"
                            mr={6}
                        >
                            {questionIndex + 1}.
                        </Heading>
                        <Input
                            onChange={(e) => changeQuestionInput(e)}
                            width={"full"}
                            size={"lg"}
                            variant="flushed"
                            value={questionInput}
                            placeholder="Untitled Question"
                            mr={6}
                            ml={2}
                            mb={3}
                            isTruncated
                        />
                    </Flex>
                    <Flex pb={15} marginLeft={"auto"}>
                        <Select
                            value={selectedOption}
                            minWidth={"165"}
                            mr={selfCheckQuestionSize == 1 ? 0 : 6}
                            onChange={(e) => questionType(e)}
                        >
                            {optionList.map((choice, index) => (
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
                                onClick={() => onMoveUpQuestion(questionIndex)}
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
                                icon={<ArrowUpIcon />}
                            />
                        )}
                        {questionIndex != selfCheckQuestionSize - 1 &&
                            selfCheckQuestionSize > 1 && (
                                <IconButton
                                    onClick={() =>
                                        onMoveDownQuestion(questionIndex)
                                    }
                                    ml={questionIndex == 0 ? "10" : "2"}
                                    mr={"5"}
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
                        <Flex width={"full"}>
                            <Stack mr={0} minWidth={"50%"} spacing={3}>
                                <Flex
                                    width={"full"}
                                    justify={"right"}
                                    wrap={"wrap"}
                                >
                                    <Heading
                                        ml={"3"}
                                        fontSize={20}
                                        fontWeight="bold"
                                    >
                                        User Facing Options
                                    </Heading>
                                    <Spacer></Spacer>
                                    <ButtonGroup
                                        mr={"6"}
                                        ml={"4"}
                                        size="sm"
                                        isAttached
                                        variant="outline"
                                    >
                                        <Button
                                            value={alphanumeric[0]}
                                            onClick={() =>
                                                changeAlphanumeric(
                                                    true,
                                                    "option",
                                                )
                                            }
                                            _hover={{
                                                bg: alphanumeric[0]
                                                    ? "black"
                                                    : "white",
                                            }}
                                            color={
                                                alphanumeric[0]
                                                    ? "white"
                                                    : "black"
                                            }
                                            background={
                                                alphanumeric[0]
                                                    ? "black"
                                                    : "white"
                                            }
                                        >
                                            Aa
                                        </Button>
                                        <Button
                                            value={alphanumeric[0]}
                                            onClick={() =>
                                                changeAlphanumeric(
                                                    false,
                                                    "option",
                                                )
                                            }
                                            _hover={{
                                                bg: alphanumeric[0]
                                                    ? "white"
                                                    : "black",
                                            }}
                                            color={
                                                alphanumeric[0]
                                                    ? "black"
                                                    : "white"
                                            }
                                            background={
                                                alphanumeric[0]
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
                                                changeOptionInput(
                                                    e,
                                                    index,
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
                                                onClick={() =>
                                                    onRemoveOption(
                                                        questionId,
                                                        index,
                                                    )
                                                }
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                ))}
                                <Button
                                    maxWidth={"120"}
                                    variant="ghost"
                                    onClick={() => onAddOption(questionId)}
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
                                    <Heading fontSize={20} fontWeight="bold">
                                        Corresponding Values
                                    </Heading>
                                    <Spacer></Spacer>
                                    <ButtonGroup
                                        ml={"2.5"}
                                        mr={"5"}
                                        size="sm"
                                        isAttached
                                        variant="outline"
                                    >
                                        <Button
                                            value={alphanumeric[1]}
                                            onClick={() =>
                                                changeAlphanumeric(
                                                    true,
                                                    "value",
                                                )
                                            }
                                            _hover={{
                                                bg: alphanumeric[1]
                                                    ? "black"
                                                    : "white",
                                            }}
                                            color={
                                                alphanumeric[1]
                                                    ? "white"
                                                    : "black"
                                            }
                                            background={
                                                alphanumeric[1]
                                                    ? "black"
                                                    : "white"
                                            }
                                        >
                                            Aa
                                        </Button>
                                        <Button
                                            value={alphanumeric[1]}
                                            onClick={() =>
                                                changeAlphanumeric(
                                                    false,
                                                    "value",
                                                )
                                            }
                                            _hover={{
                                                bg: alphanumeric[1]
                                                    ? "white"
                                                    : "black",
                                            }}
                                            color={
                                                alphanumeric[1]
                                                    ? "black"
                                                    : "white"
                                            }
                                            background={
                                                alphanumeric[1]
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
                                                changeOptionInput(
                                                    e,
                                                    index,
                                                    "value",
                                                )
                                            }
                                            value={options[index][1]}
                                            variant="flushed"
                                            placeholder={`Option ${index + 1}`}
                                            mr={6}
                                            isTruncated
                                        />
                                        <InputRightElement width="4.5rem">
                                            <CloseButton
                                                name={questionId}
                                                onClick={() =>
                                                    onRemoveOption(
                                                        questionId,
                                                        index,
                                                    )
                                                }
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                ))}
                            </Stack>
                        </Flex>
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
                                    justify={"right"}
                                    wrap={"wrap"}
                                >
                                    <Heading
                                        ml={"3"}
                                        fontSize={20}
                                        fontWeight="bold"
                                    >
                                        User Facing Options
                                    </Heading>
                                    <Spacer></Spacer>
                                    {type != "slider" && (
                                        <ButtonGroup
                                            mr={"6"}
                                            ml={"4"}
                                            size="sm"
                                            isAttached
                                            variant="outline"
                                        >
                                            <Button
                                                value={alphanumeric[0]}
                                                onClick={() =>
                                                    changeAlphanumeric(
                                                        true,
                                                        "option",
                                                    )
                                                }
                                                _hover={{
                                                    bg: alphanumeric[0]
                                                        ? "black"
                                                        : "white",
                                                }}
                                                color={
                                                    alphanumeric[0]
                                                        ? "white"
                                                        : "black"
                                                }
                                                background={
                                                    alphanumeric[0]
                                                        ? "black"
                                                        : "white"
                                                }
                                            >
                                                Aa
                                            </Button>
                                            <Button
                                                value={alphanumeric[0]}
                                                onClick={() =>
                                                    changeAlphanumeric(
                                                        false,
                                                        "option",
                                                    )
                                                }
                                                _hover={{
                                                    bg: alphanumeric[0]
                                                        ? "white"
                                                        : "black",
                                                }}
                                                color={
                                                    alphanumeric[0]
                                                        ? "black"
                                                        : "white"
                                                }
                                                background={
                                                    alphanumeric[0]
                                                        ? "white"
                                                        : "black"
                                                }
                                            >
                                                123
                                            </Button>
                                        </ButtonGroup>
                                    )}
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
                                                changeOptionInput(
                                                    e,
                                                    index,
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
                                                onClick={() =>
                                                    onRemoveOption(
                                                        questionId,
                                                        index,
                                                    )
                                                }
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                ))}
                                <Button
                                    maxWidth={"120"}
                                    variant="ghost"
                                    onClick={() => onAddOption(questionId)}
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
                                    <Heading fontSize={20} fontWeight="bold">
                                        Corresponding Values
                                    </Heading>
                                    <Spacer></Spacer>
                                    {type != "slider" && (
                                        <ButtonGroup
                                            ml={"2.5"}
                                            mr={"5"}
                                            size="sm"
                                            isAttached
                                            variant="outline"
                                        >
                                            <Button
                                                value={alphanumeric[1]}
                                                onClick={() =>
                                                    changeAlphanumeric(
                                                        true,
                                                        "value",
                                                    )
                                                }
                                                _hover={{
                                                    bg: alphanumeric[1]
                                                        ? "black"
                                                        : "white",
                                                }}
                                                color={
                                                    alphanumeric[1]
                                                        ? "white"
                                                        : "black"
                                                }
                                                background={
                                                    alphanumeric[1]
                                                        ? "black"
                                                        : "white"
                                                }
                                            >
                                                Aa
                                            </Button>
                                            <Button
                                                value={alphanumeric[1]}
                                                onClick={() =>
                                                    changeAlphanumeric(
                                                        false,
                                                        "value",
                                                    )
                                                }
                                                _hover={{
                                                    bg: alphanumeric[1]
                                                        ? "white"
                                                        : "black",
                                                }}
                                                color={
                                                    alphanumeric[1]
                                                        ? "black"
                                                        : "white"
                                                }
                                                background={
                                                    alphanumeric[1]
                                                        ? "white"
                                                        : "black"
                                                }
                                            >
                                                123
                                            </Button>
                                        </ButtonGroup>
                                    )}
                                </Flex>
                                {(options ?? []).map((option, index) => (
                                    <InputGroup
                                        key={`Multi Select: ${
                                            questionId + index
                                        }=${option.value}`}
                                    >
                                        <Input
                                            onChange={(e) =>
                                                changeOptionInput(
                                                    e,
                                                    index,
                                                    "value",
                                                )
                                            }
                                            variant="flushed"
                                            value={options[index][1]}
                                            placeholder={`Option ${index + 1}`}
                                            mr={6}
                                            isTruncated
                                        />
                                        <InputRightElement width="4.5rem">
                                            <CloseButton
                                                name={questionId}
                                                onClick={() =>
                                                    onRemoveOption(
                                                        questionId,
                                                        index,
                                                    )
                                                }
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                ))}
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
                            onChange={(e) => changeOptionInput(e, 0, "option")}
                            value={options[0][0]}
                        />
                    )}
                    {type == "long_answer" && (
                        <Textarea
                            height={10}
                            maxHeight={300}
                            resize={"vertical"}
                            mr={3}
                            placeholder={"Long answer text"}
                            onChange={(e) => changeOptionInput(e, 0, "option")}
                            value={options[0][0]}
                        />
                    )}
                    {type == "slider" && (
                        <Stack width={"50%"} alignItems="left" ml={10}>
                            <Flex alignItems="center" direction="row">
                                <Select
                                    minWidth={"50"}
                                    variant="flushed"
                                    onChange={(e) => {
                                        sliderLowerBound(e);
                                    }}
                                    value={sliderStart}
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
                                    onChange={(e) => sliderUpperBound(e)}
                                    value={sliderEnd}
                                >
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={5}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                </Select>
                            </Flex>
                            <Stack>
                                {(sliderRange ?? []).map((option, index) => (
                                    <Flex
                                        key={`Slider: ${
                                            questionId + index
                                        }=${option}`}
                                    >
                                        {sliderStart == 0 && (
                                            <Heading
                                                fontSize={16}
                                                fontWeight="500"
                                                alignSelf="center"
                                                mr={2}
                                            >
                                                {index}
                                            </Heading>
                                        )}
                                        {sliderStart != 0 && (
                                            <Heading
                                                fontSize={16}
                                                fontWeight="500"
                                                alignSelf="center"
                                                mr={2}
                                            >
                                                {index + 1}
                                            </Heading>
                                        )}
                                        <Input
                                            onChange={(e) =>
                                                changeOptionInput(
                                                    e,
                                                    index,
                                                    "option",
                                                )
                                            }
                                            value={options[index][0]}
                                            variant="flushed"
                                            placeholder="Label (Optional)"
                                            width={"full"}
                                            pl={2}
                                            mr={6}
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
                        py={1}
                        px={3}
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
                                mr={3}
                                w={100}
                                onClick={onClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={() => onRemoveQuestion(item._id)}
                                w={100}
                                colorScheme="red"
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
                p={3}
                my={5}
                bg={"white"}
                borderColor="#3182CE"
                color="#3182CE"
                width={"full"}
                fontWeight={600}
                onClick={() => onAddQuestion(questionIndex)}
            >
                + Question
            </Button>
        </Box>
    );
};
