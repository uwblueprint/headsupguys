import React, { useState } from "react";
import {
    Text,
    Flex,
    SimpleGrid,
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { SelfCheckQuestionCard, ToolHomePage } from "@components";

//Self Check Questions React functional component
const Home: React.FC = () => {
    //self check tool
    const defaultTool = [
        {
            _id: "50e642d7e4a1ae34207a92a0",
            title: "",
            type: "",
            thumbnail: "",
            video: "",
            description: "",
            linkedModule: "",
            relatedResources: ["", "", ""],
            relatedStories: ["", "", ""],
            externalResources: ["", "", ""],
            recommendedTools: ["", "", ""],
        },
    ];
    const [toolList, setToolList] = useState(defaultTool);
    //

    const changeInput = (id, target, type, index = null) => {
        console.log(id, target, type, index);
        const newTool = toolList.slice(0);
        if (index != null) {
            newTool[newTool.findIndex((e) => e._id === id)][type][index] =
                target;
        } else {
            newTool[newTool.findIndex((e) => e._id === id)][type] = target;
        }
        setToolList(newTool);
    };

    const thumbnailValidation = (id, target) => {
        const newTool = toolList.slice(0);
        const fileType = target.split(".").pop().toLowerCase();
        const allowedFileTypes = ["jpg", "jpeg", "png", "gif"];
        if (allowedFileTypes.includes(fileType)) {
            newTool[newTool.findIndex((e) => e._id === id)].thumbnail = target;
            setToolList(newTool);
            toast({
                title: "Success",
                description: "Your thumbnail has been uploaded",
                status: "success",
                position: "bottom-left",
                duration: 5000,
                isClosable: true,
            });
        } else {
            if (target != "") {
                toast({
                    title: "Invalid file type",
                    description: "Please upload a jpg or png",
                    status: "error",
                    position: "bottom-left",
                    duration: 5000,
                    isClosable: true,
                });
                document.getElementById("thumbnail").value = "";
            }
        }
    };

    const clearToolHomePage = () => {
        const newTool = defaultTool;
        setToolList(newTool);
    };

    //self check card
    const defaultQuestions = [
        {
            _id: "60e642d7e4a1ae34207a92a0",
            type: "multiple_choice",
            question: "",
            options: [
                ["", ""],
                ["", ""],
                ["", ""],
            ],
            alphanumericInput: true,
            questionNumber: 1,
        },
    ];
    const [questionList, setQuestionList] = useState(defaultQuestions);
    const [count, setCount] = useState(1);
    const [page, setPage] = useState("home");

    const changeQuestionType = (
        id,
        target,
        sliderLowerBound,
        sliderUpperBound,
    ) => {
        const newList = questionList.slice(0);
        newList[newList.findIndex((e) => e._id === id)].type = target;
        if (target == "slider") {
            console.log(sliderLowerBound, sliderUpperBound);
            if (sliderUpperBound < 3) {
                changeSliderBounds(id, 3, sliderUpperBound);
            }
        }
        setQuestionList(newList);
    };
    const changeQuestionInput = (id, target) => {
        const newList = questionList.slice(0);
        newList[newList.findIndex((e) => e._id === id)].question = target;
        setQuestionList(newList);
    };
    const changeAlphanumeric = (id, target) => {
        const newList = questionList.slice(0);
        const newOptions =
            newList[newList.findIndex((e) => e._id === id)].options;
        if (!target) {
            for (let i = 0; i < newOptions.length; i++) {
                newOptions[i][1] = newOptions[i][1].replace(/[^\d]+/g, "");
            }
        }
        newList[newList.findIndex((e) => e._id === id)].alphanumericInput =
            target;
        setQuestionList(newList);
    };
    const changeOptionInput = (id, index, target, optionOrValue) => {
        const newList = questionList.slice(0);
        const changeIndex = optionOrValue == "option" ? 0 : 1;
        // console.log(index, changeIndex, optionOrValue);
        newList[newList.findIndex((e) => e._id === id)].options[index][
            changeIndex
        ] = target;
        setQuestionList(newList);
    };
    const addOneOption = (id, target) => {
        const newList = questionList.slice(0);
        if (target == "bottom") {
            newList[newList.findIndex((e) => e._id === id)].options = [
                ...newList[newList.findIndex((e) => e._id === id)].options,
                ["", ""],
            ];
        } else {
            newList[newList.findIndex((e) => e._id === id)].options = [
                ["", ""],
                ...newList[newList.findIndex((e) => e._id === id)].options,
            ];
        }
        setQuestionList(newList);
    };

    const removeOneOption = (id, target) => {
        const newList = questionList.slice(0);
        newList[newList.findIndex((e) => e._id === id)].options.splice(
            target,
            1,
        );
        setQuestionList(newList);
    };

    const changeSliderBounds = (id, target, sliderUpperBound) => {
        if (target == 0) {
            addOneOption(id, "top");
        } else if (target == 1) {
            removeOneOption(id, 0);
        } else if (target - sliderUpperBound > 0) {
            for (let i = 0; i < target - sliderUpperBound; i++) {
                addOneOption(id, "bottom");
            }
        } else if (target - sliderUpperBound < 0) {
            for (let j = 0; j > target - sliderUpperBound; j--) {
                removeOneOption(id, -1);
            }
        } else {
            console.log(target, sliderUpperBound);
        }
    };
    const moveQuesiton = (index, direction) => {
        const newList = questionList.slice(0);
        const tempQuestion = newList[index];
        newList[index] = newList[index - direction];
        newList[index - direction] = tempQuestion;
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
            alphanumericInput: true,
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
    const toast = useToast();
    return (
        <Flex direction="column" minH="100vh">
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
                                clearToolHomePage();
                                removeAllQuestions();
                            }}
                            w={100}
                            background="red.600"
                            _hover={{ background: "red.700" }}
                        >
                            Discard
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Flex mt={5} wrap={"wrap"} justify={"left"} width={"full"}>
                <Flex width={"full"}>
                    <Text ml={10} mr={10} fontWeight="bold" fontSize="4xl">
                        Create a Tool
                    </Text>
                    <Button
                        _hover={{ bg: "#121310" }}
                        _active={{
                            transform: "scale(0.95)",
                        }}
                        mr={"5"}
                        mt={"2"}
                        minWidth={"90"}
                        color="white"
                        background="black"
                        variant="outline"
                    >
                        Publish
                    </Button>
                    <Flex wrap={"wrap"} ml={"auto"} mr={10}>
                        <Button
                            _hover={{ bg: "#F3F3F3" }}
                            _active={{
                                transform: "scale(0.95)",
                            }}
                            mr={"5"}
                            mt={"2"}
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
                            mt={"2"}
                            color="white"
                            background="black"
                            variant="outline"
                            //TODO: Send this output to the database
                            //rather than just logging it in the console
                            onClick={() => {
                                toast({
                                    title: "Save Successful",
                                    description:
                                        "Check the console for the objects",
                                    status: "success",
                                    position: "bottom-left",
                                    duration: 5000,
                                    isClosable: true,
                                });
                                console.log("Tool Home Page:", toolList);
                                console.log(
                                    "Self Check Questions:",
                                    questionList,
                                );
                            }}
                        >
                            Save
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
            <Flex ml={"10"}>
                <Button
                    onClick={() => setPage("home")}
                    textDecoration={page == "home" ? "underline" : "none"}
                    color={page == "home" ? "black" : "grey"}
                    mr={"5"}
                    variant="link"
                >
                    Tool Home Page
                </Button>
                <Button
                    textDecoration={page == "self check" ? "underline" : "none"}
                    onClick={() => setPage("self check")}
                    color={page == "self check" ? "black" : "grey"}
                    variant="link"
                >
                    Tool Self Check
                </Button>
            </Flex>
            <SimpleGrid columns={1} spacing={0} px={10} py={10}>
                {page == "home" && (
                    <>
                        {toolList.map((item, index) => (
                            <ToolHomePage
                                toolId={item._id}
                                title={item.title}
                                type={item.type}
                                thumbnail={item.thumbnail}
                                video={item.video}
                                description={item.description}
                                linkedModule={item.linkedModule}
                                relatedResources={item.relatedResources}
                                relatedStories={item.relatedStories}
                                externalResources={item.externalResources}
                                recommendedTools={item.recommendedTools}
                                onChangeInput={changeInput}
                                onChangeThumbnail={thumbnailValidation}
                            ></ToolHomePage>
                        ))}
                    </>
                )}
            </SimpleGrid>
            {page == "self check" && (
                <>
                    <SimpleGrid columns={1} spacing={0} px={10}>
                        <Button
                            onClick={() => addOneQuestion(-1)}
                            borderWidth="2px"
                            borderRadius="lg"
                            p={3}
                            mb={5}
                            variant="outlineBlue"
                            width={"full"}
                            fontWeight={600}
                        >
                            + Question
                        </Button>

                        {questionList.map((item, index) => (
                            <SelfCheckQuestionCard
                                alphanumeric={item.alphanumericInput}
                                type={item.type}
                                options={item.options}
                                question={item.question}
                                questionId={item._id}
                                questionIndex={index}
                                selfCheckQuestionSize={selfCheckQuestionSize}
                                key={index + item._id}
                                onAddOption={addOneOption}
                                onRemoveOption={removeOneOption}
                                onChangeOptionInput={changeOptionInput}
                                onChangeAlphanumeric={changeAlphanumeric}
                                onAddQuestion={addOneQuestion}
                                onRemoveQuestion={removeOneQuestion}
                                onMoveQuestion={moveQuesiton}
                                onChangeQuestionInput={changeQuestionInput}
                                onChangeQuestionType={changeQuestionType}
                                onChangeSliderBounds={changeSliderBounds}
                            />
                        ))}
                    </SimpleGrid>
                </>
            )}
        </Flex>
    );
};

export default Home;
