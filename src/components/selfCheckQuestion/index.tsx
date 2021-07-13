import React from "react";
import {
    Flex,
    Box,
    Heading,
    Menu,
    Circle,
    Square,
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

//Self check question card component
export const SelfCheckQuestionCard = ({
    item,
    onAddOption,
    onRemoveOption,
    onChangeSliderOption,
    onChangeQuestionType,
    onAddQuestion,
    onRemoveQuestion,
    onMoveDownQuestion,
    onMoveUpQuestion,
    questionIndex,
    questionId,
    type,
    options,
    selfCheckQuestionSize,
}) => {
    //Keeps track of the modal state for the delete question button
    const { isOpen, onOpen, onClose } = useDisclosure();
    //TO DO: connect these booleans with the actual database values
    const [flag, setFlag] = useBoolean();
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

    const [selectedOption, setSelectedOption] = React.useState(type);
    function questionType(e) {
        setSelectedOption(e.target.value);
        onChangeQuestionType(questionId, e.target.value);
    }
    const [sliderStart, setSliderStart] = React.useState(1);
    const [sliderEnd, setSliderEnd] = React.useState(options.length);

    function sliderLowerBound(e) {
        setSliderStart(e.target.value);
        onChangeSliderOption(questionId, e.target.value);
    }
    function sliderUpperBound(e) {
        setSliderEnd(e.target.value);
        onChangeSliderOption(questionId, e.target.value);
    }

    return (
        <Box overflowX="auto">
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
                            {questionIndex + 1}.
                        </Heading>
                        <Input
                            size={"lg"}
                            variant="flushed"
                            placeholder="Untitled Question"
                            width={"full"}
                            pl={2}
                            mr={6}
                            isTruncated
                        />
                        <Select
                            value={selectedOption}
                            minWidth={160}
                            width={280}
                            mr={selfCheckQuestionSize == 1 ? 0 : 6}
                            onChange={(e) => questionType(e)}
                        >
                            {optionList.map((choice, index) => (
                                <option
                                    index={index}
                                    key={choice.value + questionId}
                                    value={choice.value}
                                >
                                    {choice.label}
                                </option>
                            ))}
                        </Select>
                    </Menu>
                    {questionIndex != 0 && (
                        <IconButton
                            onClick={() => onMoveUpQuestion(questionIndex)}
                            ml={
                                questionIndex + 1 == selfCheckQuestionSize
                                    ? 10
                                    : 0
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
                                ml={questionIndex == 0 ? 10 : 2.5}
                                icon={<ArrowDownIcon />}
                            />
                        )}
                </Flex>
                <Flex alignContent="center">
                    {type == "multiple_choice" && (
                        <Flex width={"full"}>
                            <Stack minWidth={"50%"} spacing={3}>
                                {(options ?? []).map((option, index) => (
                                    <InputGroup key={questionId + index}>
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
                        </Flex>
                    )}
                    {type == "multi_select" && (
                        <Flex width={"full"}>
                            <Stack minWidth={"50%"} spacing={3}>
                                {(options ?? []).map((option, index) => (
                                    <InputGroup key={option + questionId}>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={
                                                <Square
                                                    size="15px"
                                                    borderWidth="2px"
                                                    borderColor="black"
                                                    borderRadius="sm"
                                                ></Square>
                                            }
                                        />
                                        <Input
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
                                    onChange={(e) => sliderLowerBound(e)}
                                    value={options[0] == "0" ? "0" : "1"}
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
                                    value={
                                        options[0] == "0"
                                            ? String(options.length - 1)
                                            : options.length
                                    }
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
                                {(options ?? []).map((option, index) => (
                                    <Flex key={questionId + option}>
                                        {options[0] == 0 && (
                                            <Heading
                                                fontSize={16}
                                                fontWeight="500"
                                                alignSelf="center"
                                                mr={2}
                                            >
                                                {index}
                                            </Heading>
                                        )}
                                        {options[0] != 0 && (
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
                                            index={index}
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
                    {type != "slider" && (
                        <ButtonGroup
                            ml={2.5}
                            size="sm"
                            isAttached
                            variant="outline"
                        >
                            <Button
                                onClick={setFlag.on}
                                _hover={{ bg: flag ? "black" : "white" }}
                                color={flag ? "white" : "black"}
                                background={flag ? "black" : "white"}
                            >
                                Aa
                            </Button>
                            <Button
                                onClick={setFlag.off}
                                _hover={{ bg: flag ? "white" : "black" }}
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
