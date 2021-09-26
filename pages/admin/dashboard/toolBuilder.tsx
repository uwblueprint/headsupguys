import React, { useState, useEffect } from "react";
import {
    Text,
    Flex,
    SimpleGrid,
    Button,
    Box,
    Tooltip,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalFooter,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import { Page } from "types/Page";
import { AdminLayout } from "@components";
import { SelfCheckQuestionCard, ToolHomePage } from "@components";
import { useRouter } from "next/router";
import axios from "axios";

export const getServerSideProps = async (context) => {
    return {
        props: {}, // will magically be passed to the page component as props
    };
};
//Self Check Questions React functional component
const ToolBuilder: Page = () => {
    const router = useRouter();
    const toolID = router.query.toolID;

    //Self check tool object
    const defaultTool = {
        _id: toolID,
        title: "",
        type: "",
        thumbnail: "",
        video: "",
        description: "",
        linkedModuleID: undefined,
        relatedResources: [
            ["", ""],
            ["", ""],
            ["", ""],
        ],
        relatedStories: [
            ["", ""],
            ["", ""],
            ["", ""],
        ],
        externalResources: [
            ["", ""],
            ["", ""],
            ["", ""],
        ],
        relatedToolsIDs: [undefined, undefined, undefined],
    };
    //Sets useState of tool to a copy of the default tool
    const [toolList, setToolList] = useState(
        JSON.parse(JSON.stringify(defaultTool)),
    );

    const [allModules, setAllModules] = useState([[], []]);
    //Remembers the last saved tool
    const [lastSavedTool, setLastSavedTool] = useState(
        JSON.parse(JSON.stringify(defaultTool)),
    );
    const getTool = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/tool/${toolID}`,
            });
            const newTool = JSON.parse(JSON.stringify(toolList));
            for (const property in newTool) {
                if (response.data[property] != null) {
                    newTool[property] = response.data[property];
                }
            }
            console.log(newTool);
            setToolList(newTool);
        } catch (err) {
            console.log(err);
            //TODO: update error handling
        }
    };
    const getAllModules = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: "/api/module/getAll",
            });
            const newAllModules = [[], []];
            for (const module in response.data) {
                newAllModules[0].push(response.data[module]._id);
                newAllModules[1].push(response.data[module].title);
            }
            setAllModules(newAllModules);
        } catch (err) {
            console.log(err);
            //TODO: update error handling
        }
    };
    useEffect(() => {
        getTool();
        getAllModules();
    }, []);

    const saveTool = async () => {
        console.log("Self Check Questions:", questionList);
        console.log("Tool Homepage:", toolList);
        try {
            await axios({
                method: "PUT",
                url: `/api/tool/update?id=${toolID}`,
                data: toolList,
            });
        } catch (err) {
            console.log(err);
        }
    };

    //Hangles all changes of input to the tool page
    const changeInput = (target, type, index1 = null, index2 = null) => {
        console.log(target);
        const newTool = JSON.parse(JSON.stringify(toolList));
        if (index2 != null) {
            //For fields with just a nested array of choices eg related resources
            newTool[type][index1][index2] = target;
        } else if (index1 != null) {
            //For fields with an array of choices eg recommended tools
            newTool[type][index1] = target;
        } else {
            //For fields with just single input boxes eg. title
            newTool[type] = target;
        }
        checkRequiredTool(newTool, questionList);
        setToolList(newTool);
        console.log(newTool.linkedModuleID);
    };

    const clearToolHomePage = () => {
        //Sets the tool homepage back to the default (empty) object
        const newTool = defaultTool;
        setToolList(newTool);
    };

    const toolRequired = [
        /*Specifies tools that are required in the first index of each array.
        The second index specifies the beginning of the tooltip message shown
        when hovering over the submit button to indicate which fields still need
        to be filled by the user*/
        ["title", 'The Home Page "Title"'],
        ["type", 'The Home Page "Type"'],
        ["thumbnail", 'The Home Page "Thumbnail"'],
        ["description", 'The Home Page "Description"'],
        ["linkedModuleID", 'The Home Page "Link Module"'],
        ["relatedResources", 'The Home Page "Related Resources'],
        ["relatedStories", 'The Home Page "Related Stories'],
        ["externalResources", 'The Home Page "External Resources'],
    ];
    //The stillneeded variable defaults to the title
    const [stillNeeded, setStillNeeded] = useState(toolRequired[0][1]);
    const checkRequiredTool = (checkTool, checkQuestion) => {
        //Says if all fields are filled or not
        let fieldsFilled = true;
        //Specifies the tool or question field that still needs to be filled
        let needed = "";
        for (let i = 0; i < toolRequired.length; i++) {
            if (typeof checkTool[toolRequired[i][0]] == "string") {
                /*Checks if string is empty. Applies to all but the related
                resources, related stories and external resources.
                */
                if (checkTool[toolRequired[i][0]] == "") {
                    fieldsFilled = false;
                    needed = toolRequired[i][1];
                    setStillNeeded(needed);
                    return fieldsFilled;
                }
            } else {
                /*First checks the text, then the value properties of the
                related resources, related stories and external resources fields.
                */
                for (let j = 0; j < checkTool[toolRequired[i][0]].length; j++) {
                    if (
                        checkTool[toolRequired[i][0]][j][0] == "" &&
                        checkTool[toolRequired[i][0]][j][1] != ""
                    ) {
                        fieldsFilled = false;
                        needed = toolRequired[i][1] + ' Text"';
                        setStillNeeded(needed);
                        return fieldsFilled;
                    }
                    if (
                        checkTool[toolRequired[i][0]][j][1] == "" &&
                        checkTool[toolRequired[i][0]][j][0] != ""
                    ) {
                        fieldsFilled = false;
                        needed = toolRequired[i][1] + ' Link"';
                        setStillNeeded(needed);
                        return fieldsFilled;
                    }
                }
            }
        }
        //Checks the self check question fields
        for (let k = 0; k < checkQuestion.length; k++) {
            if (checkQuestion[k].question == "") {
                //Checks the question title to ensure it isn't blank
                fieldsFilled = false;
                (needed =
                    "Self Check Question " +
                    checkQuestion[k].questionNumber.toString() +
                    '\'s "Title"'),
                    setStillNeeded(needed);
                return fieldsFilled;
            }
            if (
                checkQuestion[k].type == "multiple_choice" ||
                checkQuestion[k].type == "multi_select"
            ) {
                //checks multiple choice/multiselect fields to ensure they aren't blank
                for (let l = 0; l < checkQuestion[k].options.length; l++) {
                    if (checkQuestion[k].options[l][0] == "") {
                        fieldsFilled = false;
                        (needed =
                            "Self Check Question " +
                            checkQuestion[k].questionNumber.toString() +
                            '\'s "User Facing Options"'),
                            setStillNeeded(needed);
                        return fieldsFilled;
                    }
                    if (checkQuestion[k].options[l][1] == "") {
                        fieldsFilled = false;
                        (needed =
                            "Self Check Question " +
                            checkQuestion[k].questionNumber.toString() +
                            '\'s "Corresponding Values"'),
                            setStillNeeded(needed);
                        return fieldsFilled;
                    }
                }
            } else {
                needed = "";
            }
        }
        setStillNeeded(needed);
        return fieldsFilled;
    };

    //self check card
    const defaultQuestions = [
        {
            _id: "60e642d7e4a1ae34207a92a0", //Replace with real id once connected to database
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
    const [lastSavedQuestions, setLastSavedQuestions] = useState(
        JSON.parse(JSON.stringify(defaultQuestions)),
    );
    //keeps track of count of questions made so each question has a unique id
    const [count, setCount] = useState(2);
    //For Switching between the tool home page and the tool self check questions page
    const [page, setPage] = useState("home");

    const changeQuestionType = (id, target) => {
        const newList = questionList.slice(0);
        newList[newList.findIndex((e) => e._id === id)].type = target;
        //If there are 3 questions or less, new questions are generated for the slider
        if (target == "slider") {
            for (
                let i =
                    newList[newList.findIndex((e) => e._id === id)].options
                        .length;
                i < 3;
                i++
            ) {
                addOneOption(id, "bottom");
            }
            /*We use the second fiel in each option array to keep track of the slider
            this is important because the slider can start at either 0  or 1 so the index
            alone of each option does not give enough information as to what each slider value
            should point to*/
            for (
                let j = 0;
                j <
                newList[newList.findIndex((e) => e._id === id)].options.length;
                j++
            ) {
                newList[newList.findIndex((e) => e._id === id)].options[j][1] =
                    j.toString();
            }
        }
        setQuestionList(newList);
        checkRequiredTool(toolList, newList);
    };
    const changeQuestionInput = (id, target) => {
        const newList = questionList.slice(0);
        newList[newList.findIndex((e) => e._id === id)].question = target;
        checkRequiredTool(toolList, newList);
        setQuestionList(newList);
    };
    const changeAlphanumeric = (id, target) => {
        const newList = questionList.slice(0);
        const newOptions =
            newList[newList.findIndex((e) => e._id === id)].options;
        if (!target) {
            for (let i = 0; i < newOptions.length; i++) {
                //Regex pattern to ensure that only numberix inputs are allowed
                newOptions[i][1] = newOptions[i][1].replace(/[^\d]+/g, "");
            }
        }
        newList[newList.findIndex((e) => e._id === id)].alphanumericInput =
            target;
        checkRequiredTool(toolList, newList);
        setQuestionList(newList);
    };
    const changeOptionInput = (id, index, target, optionOrValue) => {
        const newList = questionList.slice(0);
        const changeIndex = optionOrValue == "option" ? 0 : 1;
        newList[newList.findIndex((e) => e._id === id)].options[index][
            changeIndex
        ] = target;
        checkRequiredTool(toolList, newList);
        setQuestionList(newList);
    };
    const addOneOption = (id, target) => {
        //adds a new option to the question at the target location
        const newList = questionList.slice(0);
        if (target == "bottom") {
            if (
                newList[newList.findIndex((e) => e._id === id)].type == "slider"
            ) {
                const lowerBound = parseInt(
                    newList[newList.findIndex((e) => e._id === id)]
                        .options[0][1],
                );
                const upperBound = String(
                    lowerBound +
                        newList[newList.findIndex((e) => e._id === id)].options
                            .length,
                );
                1;
                newList[newList.findIndex((e) => e._id === id)].options = [
                    ...newList[newList.findIndex((e) => e._id === id)].options,
                    ["", upperBound],
                ];
            } else {
                newList[newList.findIndex((e) => e._id === id)].options = [
                    ...newList[newList.findIndex((e) => e._id === id)].options,
                    ["", ""],
                ];
            }
        } else {
            //If 0 is selected on the slider, the first option's value is set to 0
            newList[newList.findIndex((e) => e._id === id)].options = [
                ["", "0"],
                ...newList[newList.findIndex((e) => e._id === id)].options,
            ];
        }
        checkRequiredTool(toolList, newList);
        setQuestionList(newList);
    };

    const removeOneOption = (id, target) => {
        const newList = questionList.slice(0);
        newList[newList.findIndex((e) => e._id === id)].options.splice(
            target,
            1,
        );
        checkRequiredTool(toolList, newList);
        setQuestionList(newList);
    };

    const changeSliderBounds = (id, target) => {
        const newList = questionList.slice(0);
        const lowerBound = parseInt(
            newList[newList.findIndex((e) => e._id === id)].options[0][1],
        );
        const upperBound =
            lowerBound +
            newList[newList.findIndex((e) => e._id === id)].options.length -
            1;
        if (target == 0) {
            addOneOption(id, "top");
        } else if (target == 1) {
            removeOneOption(id, 0);
        } else if (target - upperBound > 0) {
            for (let i = 0; i < target - upperBound; i++) {
                addOneOption(id, "bottom");
            }
        } else if (target - upperBound < 0) {
            for (let j = 0; j > target - upperBound; j--) {
                removeOneOption(id, -1);
            }
        }
    };
    const moveQuesiton = (index, direction) => {
        const newList = questionList.slice(0);
        const tempQuestion = newList[index];
        newList[index] = newList[index - direction];
        newList[index - direction] = tempQuestion;
        setQuestionList(newList);
        changeQuestionNumbers(newList);
    };

    const addOneQuestion = (index) => {
        const newQuestion = {
            _id: `60e642d7e4a1ae34207a92a${count}`, //Replace with real id once connected to database
            type: "multiple_choice",
            question: "",
            options: [
                ["", ""],
                ["", ""],
                ["", ""],
            ],
            alphanumericInput: true,
            questionNumber: index,
        };
        const newList = questionList.slice(0);
        newList.splice(index + 1, 0, newQuestion);
        setCount(count + 1);
        setQuestionList(newList);
        changeQuestionNumbers(newList);
    };

    const removeOneQuestion = (id) => {
        const newList = questionList.filter((item) => item._id !== id);
        setQuestionList(newList);
        changeQuestionNumbers(newList);
    };
    const removeAllQuestions = () => {
        const newList = [];
        setQuestionList(newList);
        checkRequiredTool(toolList, newList);
    };

    const clearHiddenFilledFields = () => {
        /* In order to improve user experience, option fields are not cleared
        when the user switched uestion type, they are simply not displayed on the screen
        this allows the user to go back to their previous question type and still retain al
        their data. However, all of these options that can't be seen are presumably not needed
        anymore when the user chooses to fully submit their tool. So they are all cleared*/
        const newList = questionList.slice(0);
        for (let i = 0; i < newList.length; i++) {
            if (
                newList[i].type == "short_answer" ||
                newList[i].type == "long_answer"
            ) {
                for (let j = 0; j < newList[i].options.length; j++) {
                    newList[i].options[j] = ["", ""];
                }
            }
        }
        setQuestionList(newList);
    };

    const changeQuestionNumbers = (listOfQuestions) => {
        /*ensures that the question number property
        matches the seen question number on the form*/
        const newList = listOfQuestions;
        for (let i = 0; i < newList.length; i++) {
            newList[i].questionNumber = i + 1;
        }
        setQuestionList(newList);
        checkRequiredTool(toolList, newList);
    };

    const selfCheckQuestionSize = questionList.length;
    //Controls the modal
    const { isOpen, onOpen, onClose } = useDisclosure();
    //For cleaner popup notifications
    const toast = useToast();
    return (
        <Flex direction="column" minH="100vh">
            <Modal
                blockScrollOnMount={false}
                isOpen={isOpen}
                onClose={onClose}
                motionPreset="slideInBottom"
            >
                <ModalOverlay opacity={"1"} color={"red"} />
                <ModalContent p={"5"}>
                    <ModalHeader>Delete Tool </ModalHeader>
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
                                toast({
                                    title: "Deletion Successful",
                                    description:
                                        "Your tool data has been succesfully deleted",
                                    status: "success",
                                    position: "bottom-left",
                                    duration: 5000,
                                    isClosable: true,
                                });
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
                    <Tooltip
                        //Shows the users which fields remain when they hover over the submit button
                        maxWidth={"60"}
                        hasArrow
                        label={
                            stillNeeded == ""
                                ? ""
                                : stillNeeded +
                                  " field still needs to be filled out"
                        }
                        placement="right"
                    >
                        <Box>
                            <Button
                                _hover={{ bg: "#222222" }}
                                _active={{
                                    transform: "scale(0.95)",
                                }}
                                mr={"5"}
                                mt={"2"}
                                minWidth={"90"}
                                color="white"
                                background="black"
                                variant="outline"
                                isDisabled={stillNeeded == "" ? false : true}
                                onClick={() => {
                                    clearHiddenFilledFields();
                                    toast({
                                        title: "Publication Successful",
                                        description:
                                            "Your tool has been succesfully published (please check the console)",
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
                                Publish
                            </Button>
                        </Box>
                    </Tooltip>
                    <Flex wrap={"wrap"} ml={"auto"} mr={10}>
                        <Button
                            _hover={{ bg: "gray.100" }}
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
                            _hover={{ bg: "#222222" }}
                            _active={{
                                transform: "scale(0.95)",
                            }}
                            minWidth={"90"}
                            mt={"2"}
                            color="white"
                            background="black"
                            variant="outline"
                            disabled={
                                /*Save is disabled if the tool is equal
                                to the last saved tool or the empty tool*/
                                (JSON.stringify(questionList) ==
                                    JSON.stringify(lastSavedQuestions) &&
                                    JSON.stringify(toolList) ==
                                        JSON.stringify(lastSavedTool)) ||
                                ((JSON.stringify(questionList) ==
                                    JSON.stringify(defaultQuestions) ||
                                    JSON.stringify(questionList) == "[]") &&
                                    JSON.stringify(toolList) ==
                                        JSON.stringify(defaultTool))
                            }
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
                                saveTool();
                                setLastSavedTool(
                                    JSON.parse(JSON.stringify(toolList)),
                                );
                                setLastSavedQuestions(
                                    JSON.parse(JSON.stringify(questionList)),
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
                    <ToolHomePage
                        key={toolList._id}
                        toolId={toolList._id}
                        title={toolList.title}
                        type={toolList.type}
                        thumbnail={toolList.thumbnail}
                        video={toolList.video}
                        description={toolList.description}
                        linkedModuleID={toolList.linkedModuleID}
                        relatedResources={toolList.relatedResources}
                        relatedStories={toolList.relatedStories}
                        externalResources={toolList.externalResources}
                        relatedToolsIDs={toolList.relatedToolsIDs}
                        allModules={allModules}
                        onChangeInput={changeInput}
                    ></ToolHomePage>
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
ToolBuilder.layout = AdminLayout;
export default ToolBuilder;
