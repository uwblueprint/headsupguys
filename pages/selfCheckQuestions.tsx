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

//Self Check Questions React functional component
const Home: React.FC = () => {
    const [questionList, setQuestionList] = useState([
        {
            _id: "60e642d7e4a1ae34207a92a0",
            type: "multiple_choice",
            question: "",
            options: [
                ["", ""],
                ["", ""],
                ["", ""],
            ],
            alphanumericInput: [true, true],
            questionNumber: 1,
        },
    ]);
    const [count, setCount] = useState(1);
    const newSliderRange = [];
    for (let i = 1; i <= 3; i++) {
        newSliderRange.push(i);
    }
    const [sliderRange, setSliderRange] = useState(newSliderRange);
    const changeQuestionType = (id, target) => {
        const newList = questionList.slice(0);
        newList[newList.findIndex((e) => e._id === id)].type = target;

        setQuestionList(newList);
    };
    const changeQuestionInput = (id, target) => {
        const newList = questionList.slice(0);
        newList[newList.findIndex((e) => e._id === id)].question = target;
        setQuestionList(newList);
    };
    const changeAlphanumeric = (id, target, optionOrValue) => {
        const newList = questionList.slice(0);
        const changeIndex = optionOrValue == "option" ? 0 : 1;
        newList[newList.findIndex((e) => e._id === id)].alphanumericInput[
            changeIndex
        ] = target;
        setQuestionList(newList);
    };
    const changeOptionInput = (id, index, target, optionOrValue) => {
        const newList = questionList.slice(0);
        const changeIndex = optionOrValue == "option" ? 0 : 1;
        newList[newList.findIndex((e) => e._id === id)].options[index][
            changeIndex
        ] = target;
        setQuestionList(newList);
    };
    const addOneOption = (id) => {
        const newList = questionList.slice(0);
        newList[newList.findIndex((e) => e._id === id)].options = [
            ...newList[newList.findIndex((e) => e._id === id)].options,
            ["", ""],
        ];
        setQuestionList(newList);
    };

    const removeOneOption = (id, index) => {
        const newList = questionList.slice(0);
        newList[newList.findIndex((e) => e._id === id)].options.splice(
            index,
            1,
        );
        setQuestionList(newList);
    };
    const changeSliderRange = (id, lowerBound, upperBound) => {
        const optionList = [];
        const newList = questionList.slice(0);
        lowerBound = parseInt(lowerBound);
        upperBound = parseInt(upperBound);
        const newSliderRange = [];

        for (let i = lowerBound; i <= upperBound; i++) {
            optionList.push("");
            newSliderRange.push("");
        }

        newList[newList.findIndex((e) => e._id === id)].options = optionList;
        setSliderRange(newSliderRange);
        setQuestionList(newList);
    };
    const moveQuesitonDown = (index) => {
        const newList = questionList.slice(0);
        const tempQuestion = newList[index];
        newList[index] = newList[index + 1];
        newList[index + 1] = tempQuestion;
        setQuestionList(newList);
    };
    const moveQuesitonUp = (index) => {
        const newList = questionList.slice(0);
        const tempQuestion = newList[index];
        newList[index] = newList[index - 1];
        newList[index - 1] = tempQuestion;
        setQuestionList(newList);
    };

    const addOneQuestion = (index) => {
        const newQuestion = {
            _id: `60e642d7e4a1ae34207a92a${count}`,
            type: "multiple_choice",
            question: "",
            options: [
                ["", ""],
                ["", ""],
                ["", ""],
            ],
            alphanumericInput: [true, true],
            questionNumber: count,
        };
        const newList = questionList.slice(0);
        newList.splice(index + 1, 0, newQuestion);
        setCount(count + 1);
        setQuestionList(newList);
    };

    const removeOneQuestion = (id) => {
        setQuestionList(questionList.filter((item) => item._id !== id));
    };
    const removeAllQuestions = () => {
        setQuestionList([]);
    };

    const selfCheckQuestionSize = questionList.length;

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
                            console.log(questionList);
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

                {questionList.map((item, index) => (
                    <SelfCheckQuestionCard
                        questionId={item._id}
                        questionIndex={index}
                        sliderRange={sliderRange}
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
                        onChangeSliderRange={changeSliderRange}
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
