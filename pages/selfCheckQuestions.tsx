import React, { useState } from "react";
import {
    Spacer,
    Text,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    useDisclosure,
    Flex,
    SimpleGrid,
    Button,
} from "@chakra-ui/react";
import { Header, SelfCheckQuestionCard, Footer } from "@components";

//Default question list, can be shortened as needed
const questionList = [
    {
        _id: "60e642d7e4a1ae34207a92a3",
        type: "multiple_choice",
        question: "",
        options: ["", "", ""],
        alphanumericInput: true,
        questionNumber: 1,
    },
    {
        _id: "60e642d7e4a1ae34207a92a4",
        type: "multi_select",
        question: "",
        options: ["", "", ""],
        alphanumericInput: true,
        questionNumber: 2,
    },
    {
        _id: "60e642d7e4a1ae34207a92a5",
        type: "short_answer",
        question: "",
        options: [""],
        alphanumericInput: true,
        questionNumber: 3,
    },
    {
        _id: "60e642d7e4a1ae34207a92a6",
        type: "long_answer",
        question: "",
        options: [""],
        alphanumericInput: true,
        questionNumber: 4,
    },
    {
        _id: "60e642d7e4a1ae34207a92a7",
        type: "slider",
        question: "",
        options: ["", "", ""],
        alphanumericInput: true,
        questionNumber: 5,
    },
];

//Self Check Questions React functional component
const Home: React.FC = () => {
    const [list, setList] = useState(questionList);
    const [count, setCount] = useState(questionList.length + 1);
    const newSliderRange0 = [];
    for (let i = 1; i <= 3; i++) {
        newSliderRange0.push(i);
    }
    const [sliderRange, setSliderRange] = useState(newSliderRange0);
    const changeQuestionType = (id, target) => {
        const newList = list.slice(0);
        newList[newList.findIndex((e) => e._id === id)].type = target;

        setList(newList);
    };
    const changeQuestionInput = (id, target) => {
        const newList = list.slice(0);
        newList[newList.findIndex((e) => e._id === id)].question = target;
        setList(newList);
    };
    const changeAlphanumeric = (id, target) => {
        const newList = list.slice(0);
        newList[newList.findIndex((e) => e._id === id)].alphanumericInput =
            target;
        setList(newList);
    };
    const changeOptionInput = (id, index, target) => {
        const newList = list.slice(0);
        newList[newList.findIndex((e) => e._id === id)].options[index] = target;
        setList(newList);
    };
    const addOneOption = (id) => {
        const newList = list.slice(0);
        newList[newList.findIndex((e) => e._id === id)].options = [
            ...newList[newList.findIndex((e) => e._id === id)].options,
            "",
        ];
        setList(newList);
    };

    const removeOneOption = (id, index) => {
        const newList = list.slice(0);
        newList[newList.findIndex((e) => e._id === id)].options.splice(
            index,
            1,
        );
        setList(newList);
    };
    const changeSliderOption = (id, lowerBound, upperBound) => {
        const optionList = [];
        const newList = list.slice(0);
        lowerBound = parseInt(lowerBound);
        upperBound = parseInt(upperBound);
        const newSliderRange = [];

        for (let i = lowerBound; i <= upperBound; i++) {
            optionList.push(String(i));
            newSliderRange.push(i);
        }

        newList[newList.findIndex((e) => e._id === id)].options = optionList;
        setSliderRange(newSliderRange);
        setList(newList);
    };
    const moveQuesitonDown = (index) => {
        const newList = list.slice(0);
        const tempQuestion = newList[index];
        newList[index] = newList[index + 1];
        newList[index + 1] = tempQuestion;
        setList(newList);
    };
    const moveQuesitonUp = (index) => {
        const newList = list.slice(0);
        const tempQuestion = newList[index];
        newList[index] = newList[index - 1];
        newList[index - 1] = tempQuestion;
        setList(newList);
    };

    const addOneQuestion = (index) => {
        const newQuestion = {
            _id: `60e642d7e4a1ae34207a92a${count}`,
            type: "multiple_choice",
            question: "",
            options: ["", "", ""],
            alphanumericInput: true,
            questionNumber: count,
        };
        const newList = list.slice(0);
        newList.splice(index + 1, 0, newQuestion);
        setCount(count + 1);
        setList(newList);
    };

    const removeOneQuestion = (id) => {
        setList(list.filter((item) => item._id !== id));
    };
    const removeAllQuestions = () => {
        setList([]);
    };

    const selfCheckQuestionSize = list.length;

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Flex direction="column" minH="100vh">
            <Header />

            <Flex mt={10} wrap={"wrap"} justify={"left"} width={"full"}>
                <Text ml={10} mr={2} fontWeight="bold" fontSize="4xl">
                    Create a Tool
                </Text>
                <Flex wrap={"wrap"} ml={"auto"} mr={10}>
                    <Button
                        _hover={{ bg: "#F3F3F3" }}
                        _active={{
                            transform: "scale(0.95)",
                        }}
                        onClick={onOpen}
                        minWidth={"90"}
                        colorScheme="white"
                        variant="outline"
                    >
                        Discard
                    </Button>
                    <Button
                        _hover={{ bg: "#121310" }}
                        _active={{
                            transform: "scale(0.95)",
                        }}
                        ml={"5"}
                        minWidth={"90"}
                        color="white"
                        background="black"
                        variant="outline"
                        //TODO: Send this output to the database
                        //rather than just logging it in the console
                        onClick={() => {
                            alert("Check the console for the object");
                            console.log(list);
                        }}
                    >
                        Save
                    </Button>
                </Flex>
            </Flex>
            <Modal
                blockScrollOnMount={false}
                isOpen={isOpen}
                onClose={onClose}
                motionPreset="slideInBottom"
            >
                <ModalOverlay />
                <ModalContent p={"5"}>
                    <ModalHeader>Delete Tool </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to discard this tool? This is a
                        permanent action that cannot be undone.
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
                            onClick={() => {
                                onClose();
                                removeAllQuestions();
                            }}
                            w={100}
                            colorScheme="red"
                        >
                            Discard
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <SimpleGrid columns={1} spacing={0} px={10} py={10}>
                <Button
                    onClick={() => addOneQuestion(-1)}
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

                {list.map((item, index) => (
                    <SelfCheckQuestionCard
                        sliderRange={sliderRange}
                        questionId={item._id}
                        questionIndex={index}
                        selfCheckQuestionSize={selfCheckQuestionSize}
                        type={item.type}
                        alphanumeric={item.alphanumericInput}
                        question={item.question}
                        options={item.options}
                        key={index + item._id}
                        item={item}
                        onChangeAlphanumeric={changeAlphanumeric}
                        onRemoveQuestion={removeOneQuestion}
                        onAddQuestion={addOneQuestion}
                        onMoveDownQuestion={moveQuesitonDown}
                        onMoveUpQuestion={moveQuesitonUp}
                        onChangeQuestionInput={changeQuestionInput}
                        onChangeOptionInput={changeOptionInput}
                        onRemoveOption={removeOneOption}
                        onAddOption={addOneOption}
                        onChangeSliderOption={changeSliderOption}
                        onChangeQuestionType={changeQuestionType}
                    />
                ))}
            </SimpleGrid>
            <Spacer />
            <Footer />
        </Flex>
    );
};

export default Home;
