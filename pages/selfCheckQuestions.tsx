import React from "react";
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
    ButtonGroup,
} from "@chakra-ui/react";
import { Header, SelfCheckQuestionCard, Footer } from "@components";

//Default question list, can be shortened as needed
const questionList = [
    {
        _id: "60e642d7e4a1ae34207a92a3",
        type: "multiple_choice",
        question: "autem sunt eiusdolores nesciunt impedit?",
        options: ["1", "2", "3"],
        alphanumericInput: true,
        questionNumber: 1,
    },
    {
        _id: "60e642d7e4a1ae34207a92a4",
        type: "multi_select",
        question: "autem sunt eiusdolores nesciunt impedit?",
        options: ["1", "2", "3"],
        alphanumericInput: true,
        questionNumber: 2,
    },
    {
        _id: "60e642d7e4a1ae34207a92a5",
        type: "short_answer",
        question: "autem sunt eiusdolores nesciunt impedit?",
        options: ["1", "2", "3"],
        alphanumericInput: true,
        questionNumber: 3,
    },
    {
        _id: "60e642d7e4a1ae34207a92a6",
        type: "long_answer",
        question: "autem sunt eiusdolores nesciunt impedit?",
        options: ["1", "2", "3"],
        alphanumericInput: true,
        questionNumber: 4,
    },
    {
        _id: "60e642d7e4a1ae34207a92a7",
        type: "slider",
        question: "autem sunt eiusdolores nesciunt impedit?",
        options: ["1", "2", "3", "4", "5"],
        alphanumericInput: true,
        questionNumber: 5,
    },
];

//Self Check Questions React functional component
const Home: React.FC = () => {
    const [list, setList] = React.useState(questionList);
    const [count, setCount] = React.useState(questionList.length + 1);
    const newSliderRange0 = [];
    for (let i = 1; i <= 3; i++) {
        newSliderRange0.push(i);
    }
    const [sliderRange, setSliderRange] = React.useState(newSliderRange0);
    function changeQuestionType(id, target) {
        const newList = list.slice(0);
        newList[newList.findIndex((e) => e._id === id)].type = target;

        setList(newList);
    }
    function changeAlphanumeric(id, target) {
        const newList = list.slice(0);
        newList[newList.findIndex((e) => e._id === id)].alphanumericInput =
            target;
        setList(newList);
    }
    function addOneOption(id) {
        const newList = list.slice(0);
        newList[newList.findIndex((e) => e._id === id)].options = [
            ...newList[newList.findIndex((e) => e._id === id)].options,
            `${
                newList[newList.findIndex((e) => e._id === id)].options.length +
                1
            }`,
        ];
        setList(newList);
    }

    function removeOneOption(id, index) {
        const newList = list.slice(0);
        newList[newList.findIndex((e) => e._id === id)].options.splice(
            index,
            1,
        );
        setList(newList);
    }
    function changeSliderOption(id, lowerBound, upperBound) {
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
    }
    function moveQuesitonDown(index) {
        const newList = list.slice(0);
        const tempQuestion = newList[index];
        newList[index] = newList[index + 1];
        newList[index + 1] = tempQuestion;
        setList(newList);
    }
    function moveQuesitonUp(index) {
        const newList = list.slice(0);
        const tempQuestion = newList[index];
        newList[index] = newList[index - 1];
        newList[index - 1] = tempQuestion;
        setList(newList);
    }

    function addOneQuestion(index) {
        const newQuestion = {
            _id: `60e642d7e4a1ae34207a92a${count}`,
            type: "multiple_choice",
            question: "autem sunt eiusdolores nesciunt impedit?",
            options: ["1", "2", "3"],
            questionNumber: count,
        };
        const newList = list.slice(0);
        const newCount = count + 1;
        newList.splice(index + 1, 0, newQuestion);
        setCount(newCount);
        setList(newList);
    }

    function removeOneQuestion(id) {
        const newList = list.filter((item) => item._id !== id);
        setList(newList);
    }
    function removeAllQuestions() {
        const newList = [];
        setList(newList);
    }

    const selfCheckQuestionSize = list.length;

    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Flex direction="column" minH="100vh">
            <Header />

            <Flex mt={10} wrap={"wrap"} justifyContent={"left"} width={"full"}>
                <Text mx={10} fontWeight="bold" fontSize="4xl">
                    Create a Tool
                </Text>
                <Spacer />
                <ButtonGroup wrap={"wrap"} spacing={"1.5rem"} mx={12}>
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
                        minWidth={"90"}
                        color="white"
                        background="black"
                        variant="outline"
                        onClick={() => {
                            alert("Check the console for the object");
                            console.log(list);
                        }}
                    >
                        Save
                    </Button>
                </ButtonGroup>
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
                        options={item.options}
                        key={index + item._id}
                        item={item}
                        onChangeAlphanumeric={changeAlphanumeric}
                        onRemoveQuestion={removeOneQuestion}
                        onAddQuestion={addOneQuestion}
                        onMoveDownQuestion={moveQuesitonDown}
                        onMoveUpQuestion={moveQuesitonUp}
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
