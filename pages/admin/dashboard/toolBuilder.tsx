import React, { useState, useEffect } from "react";
import { isAuthenticated } from "src/utils/auth/authHelpers";
import { GetServerSideProps } from "next";
import {
    Text,
    Flex,
    SimpleGrid,
    Button,
    Box,
    Checkbox,
    Tooltip,
    Textarea,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalFooter,
    useDisclosure,
    useToast,
    forwardRef,
    ButtonProps,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Page } from "types/Page";
import { AdminLayout } from "@components";
import {
    SelfCheckQuestionCard,
    SelfCheckResponseCard,
    ToolHomePage,
} from "@components";
import { useRouter } from "next/router";
import axios from "axios";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    if (process.env.NODE_ENV == "production") {
        const authProps = await isAuthenticated(req, res, "/redirect", true); // TODO: change redirect to login page (once we have a login page that's deployed)
        return {
            props: {
                auth: authProps,
            },
        };
    } else {
        return {
            props: {},
        };
    }
};

const OutlineButton = forwardRef<ButtonProps, "div">((props, ref) => (
    <Button
        variant="outline"
        isFullWidth
        bg="#ffffff"
        textAlign="left"
        ref={ref}
        {...props}
    />
));

//Self Check Questions React functional component
const ToolBuilder: Page = () => {
    const router = useRouter();
    const toolID = router.query.toolID;
    const selfCheckID = router.query.selfCheckID;
    const [count, setCount] = useState(0);
    //Self check tool object
    const defaultTool = {
        _id: toolID,
        title: "",
        type: "",
        thumbnail: "",
        video: "",
        description: "",
        linkedModuleID: "",
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
        selfCheckGroupID: selfCheckID,
        relatedToolsIDs: ["", "", ""],
        status: "draft",
    };
    //Sets useState of tool to a copy of the default tool
    const [toolList, setToolList] = useState(
        JSON.parse(JSON.stringify(defaultTool)),
    );

    //self check card
    const defaultQuestions = [
        {
            _id: "tempId" + String(count),
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
    const [questionList, setQuestionList] = useState([]);
    const [lastSavedQuestions, setLastSavedQuestions] = useState(
        JSON.parse(JSON.stringify(defaultQuestions)),
    );
    const [selectedQuestions, setSelectedQuestions] = useState([]);
    const [description, setDescription] = useState("");
    const [breakpoints, setBreakpoints] = useState([
        {
            _id: "tempId" + String(1),
            num: 1,
            lastBreakpoint: false,
            lower: 0,
            upper: undefined,
            description: "",
            secondaryDesc: "",
        },
    ]);

    const [allModules, setAllModules] = useState([]);
    const [allTools, setAllTools] = useState([[], []]);
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
            const newTool = JSON.parse(JSON.stringify(defaultTool));
            for (const property in newTool) {
                newTool[property] = response.data[property];
            }
            setToolList(newTool);
        } catch (err) {
            console.log(err);
            //TODO: update error handling
        }
    };
    const getSelfCheck = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/self-check/${selfCheckID}`,
            });
            setQuestionList(response.data.questions);
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
            setAllModules(response.data);
        } catch (err) {
            console.log(err);
            //TODO: update error handling
        }
    };
    const getAllTools = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: "/api/tool/getAll",
            });
            const newAllTools = [[], []];
            for (const tool in response.data) {
                newAllTools[0].push(response.data[tool]._id);
                newAllTools[1].push(response.data[tool].title);
            }
            setAllTools(newAllTools);
        } catch (err) {
            console.log(err);
            //TODO: update error handling
        }
    };
    useEffect(() => {
        getTool();
        getSelfCheck();
        getAllModules();
        getAllTools();
    }, []);

    const getMinSum = (questions) =>
        questions.reduce(
            (prev, curr) =>
                prev +
                Math.min(
                    ...curr.options?.map((option) => parseInt(option[1]) ?? 0),
                ),
            0,
        ) ?? 0;

    const getMaxSum = (questions) =>
        questions.reduce(
            (prev, curr) =>
                prev +
                Math.max(
                    ...curr.options?.map((option) => parseInt(option[1]) ?? 0),
                ),
            0,
        ) ?? 0;

    const handleSelected = (ques) => {
        if (selectedQuestions.length !== 0) {
            const newSelected = selectedQuestions.filter(
                (q) => q._id !== ques._id,
            );

            if (newSelected.length !== selectedQuestions.length) {
                setSelectedQuestions(newSelected);
                return;
            }

            const findIndex = (elem, array) => {
                for (let i = 0; i < array.length; i++) {
                    if (array[i].questionNumber > elem.questionNumber) {
                        return i - 1;
                    }
                }

                return array.length - 1;
            };

            const newSelectedQuestions = [...selectedQuestions];

            newSelectedQuestions.splice(
                findIndex(ques, selectedQuestions) + 1,
                0,
                ques,
            );

            setSelectedQuestions(newSelectedQuestions);
        } else {
            setSelectedQuestions([ques]);
        }

        const newList = [...breakpoints];
        newList[0].lower = getMinSum(selectedQuestions);
        setBreakpoints(newList);
    };

    const shouldBeChecked = (ques) =>
        selectedQuestions.filter((q) => q === ques).length !== 0;

    const isValued = (q) =>
        !q.alphanumericInput &&
        q.options.filter((op) => op[1] === "").length !== q.options.length &&
        (q.type === "multi_select" ||
            q.type === "multiple_choice" ||
            q.type === "slider");

    const allValuedQuestions = () => questionList.filter(isValued);

    const addOneBreakpoint = () => {
        if (breakpoints[breakpoints.length - 1].upper === undefined) {
            alert(
                "You cannot add another breakpoint without defining the last's upper bound",
            );
            return;
        }

        const newBreakpoint = {
            _id: "tempId" + String(breakpoints.length + 1),
            num: breakpoints.length + 1,
            lastBreakpoint: false,
            lower: breakpoints
                ? breakpoints[breakpoints.length - 1].upper + 1
                : getMinSum(selectedQuestions),
            upper: undefined,
            description: "",
            secondaryDesc: "",
        };

        setBreakpoints([...breakpoints, newBreakpoint]);
    };

    const updateDescription = (id, newDesc) => {
        const newList = breakpoints.map((bp) => {
            if (bp._id === id) {
                bp.description = newDesc;
            }
            return bp;
        });
        setBreakpoints(newList);
    };

    const updateUpper = (id, newUpper) => {
        if (newUpper > getMaxSum(selectedQuestions)) {
            alert("Please enter a value lower than the maximum");
            return;
        }

        let error = false;

        const newList = breakpoints.map((bp) => {
            if (bp._id === id) {
                if (newUpper < bp.lower) {
                    error = true;
                    return bp;
                }
                bp.upper = newUpper !== undefined ? newUpper : bp.upper;
            }
            return bp;
        });

        if (error) {
            alert(
                "Please enter a value greater than the lower bound of the breakpoint.",
            );
            return;
        }

        setBreakpoints(newList);
    };

    const updateLastBreakpoint = (id, newLastBp) => {
        const newList = breakpoints.map((bp) => {
            if (bp._id === id) {
                bp.lastBreakpoint = newLastBp;
            }
            return bp;
        });
        setBreakpoints(newList);
    };

    const updateSecondaryDesc = (id, newDesc) => {
        const newList = breakpoints.map((bp) => {
            if (bp._id === id) {
                bp.secondaryDesc = newDesc;
            }
            return bp;
        });
        setBreakpoints(newList);
    };

    const getQuestionsList = () => {
        if (!selectedQuestions.length) {
            return "Select Options";
        }

        return selectedQuestions.length !== allValuedQuestions().length
            ? selectedQuestions.reduce(
                  (prev, curr, idx) =>
                      prev +
                      "Question " +
                      curr.questionNumber +
                      (idx !== selectedQuestions.length - 1 ? ", " : ""),
                  "",
              )
            : "All Self Check Questions";
    };

    const saveTool = async (saveOrPublish) => {
        if (toolList.title == "") {
            toolList.title = "Untitled Tool";
        }
        try {
            if (saveOrPublish == "Save ") {
                toolList.status = "draft";
            }
            await axios({
                method: "PATCH",
                url: `/api/tool/${toolID}`,
                data: toolList,
            });

            toast({
                title: saveOrPublish + "Successful",
                status: "success",
                position: "bottom-left",
                duration: 5000,
                isClosable: true,
            });
        } catch (err) {
            toast({
                title: saveOrPublish + "Failed",
                status: "error",
                position: "bottom-left",
                duration: 5000,
                isClosable: true,
            });
            console.log(err);
        }
    };
    const saveSelfCheck = async () => {
        for (const i in questionList) {
            if (questionList[i].question == "") {
                questionList[i].question = "Untitled Question";
            }
            if (questionList[i]._id.slice(0, 6) == "tempId") {
                delete questionList[i]._id;
            }
        }
        try {
            await axios({
                method: "PATCH",
                url: `/api/self-check/${selfCheckID}`,
                data: questionList,
            });
            return true;
        } catch (err) {
            console.log(err);
        }
        getSelfCheck();
    };

    //Hangles all changes of input to the tool page
    const changeInput = (target, type, index1 = null, index2 = null) => {
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
        checkRequiredFields(newTool, questionList);
        setToolList(newTool);
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
    const [stillNeeded, setStillNeeded] = useState("New Page");
    const checkRequiredFields = (checkTool, checkQuestion) => {
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

    //keeps track of count of questions made so each question has a unique id

    //For Switching between the tool home page and the tool self check questions page
    const [page, setPage] = useState("home");

    const changeQuestionType = (id, target) => {
        const newMap = new Map(
            questionList.map((question) => {
                return [question._id, question];
            }),
        );
        newMap.get(id).type = target;
        //If there are 3 questions or less, new questions are generated for the slider
        if (target == "slider") {
            for (let i = newMap.get(id).options.length; i < 3; i++) {
                addOneOption(id, "bottom");
            }
            /*We use the second field in each option array to keep track of the slider
            this is important because the slider can start at either 0  or 1 so the index
            alone of each option does not give enough information as to what each slider value
            should point to*/
            for (let j = 0; j < newMap.get(id).options.length; j++) {
                newMap.get(id).options[j][1] = j.toString();
            }
            newMap.get(id).alphanumericInput = false;
        }
        setQuestionList([...newMap.values()]);
        checkRequiredFields(toolList, [...newMap.values()]);
        if (!isValued(newMap.get(id))) {
            setSelectedQuestions(selectedQuestions.filter((q) => q._id !== id));
        }
    };
    const changeQuestionInput = (id, target) => {
        const newMap = new Map(
            questionList.map((question) => {
                return [question._id, question];
            }),
        );
        newMap.get(id).question = target;
        checkRequiredFields(toolList, [...newMap.values()]);
        setQuestionList([...newMap.values()]);
    };
    const changeAlphanumeric = (id, target) => {
        const newMap = new Map(
            questionList.map((question) => {
                return [question._id, question];
            }),
        );
        const newOptions = newMap.get(id).options;
        if (!target) {
            for (let i = 0; i < newOptions.length; i++) {
                //Regex pattern to ensure that only numberix inputs are allowed
                newOptions[i][1] = newOptions[i][1].replace(/[^\d]+/g, "");
            }
        }
        newMap.get(id).alphanumericInput = target;
        checkRequiredFields(toolList, [...newMap.values()]);
        setQuestionList([...newMap.values()]);
    };
    const changeOptionInput = (id, index, target, optionOrValue) => {
        const newMap = new Map(
            questionList.map((question) => {
                return [question._id, question];
            }),
        );
        const changeIndex = optionOrValue == "option" ? 0 : 1;
        newMap.get(id).options[index][changeIndex] = target;
        checkRequiredFields(toolList, [...newMap.values()]);
        setQuestionList([...newMap.values()]);
    };
    const addOneOption = (id, target) => {
        //adds a new option to the question at the target location
        const newMap = new Map(
            questionList.map((question) => {
                return [question._id, question];
            }),
        );
        if (target == "bottom") {
            if (newMap.get(id).type == "slider") {
                const lowerBound = parseInt(newMap.get(id).options[0][1]);
                const upperBound = String(
                    lowerBound + newMap.get(id).options.length,
                );
                1;
                newMap.get(id).options = [
                    ...newMap.get(id).options,
                    ["", upperBound],
                ];
            } else {
                newMap.get(id).options = [...newMap.get(id).options, ["", ""]];
            }
        } else {
            //If 0 is selected on the slider, the first option's value is set to 0
            newMap.get(id).options = [["", "0"], ...newMap.get(id).options];
        }
        checkRequiredFields(toolList, [...newMap.values()]);
        setQuestionList([...newMap.values()]);
    };

    const removeOneOption = (id, target) => {
        const newMap = new Map(
            questionList.map((question) => {
                return [question._id, question];
            }),
        );
        newMap.get(id).options.splice(target, 1);
        checkRequiredFields(toolList, [...newMap.values()]);
        setQuestionList([...newMap.values()]);
    };

    const changeSliderBounds = (id, target) => {
        const newMap = new Map(
            questionList.map((question) => {
                return [question._id, question];
            }),
        );
        const lowerBound = parseInt(newMap.get(id).options[0][1]);
        const upperBound = lowerBound + newMap.get(id).options.length - 1;
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
    const moveQuestion = (index, direction) => {
        const newList = questionList.slice(0);
        const tempQuestion = newList[index];
        newList[index] = newList[index - direction];
        newList[index - direction] = tempQuestion;
        setQuestionList(newList);
        changeQuestionNumbers(newList);
    };

    const addOneQuestion = (index) => {
        setCount(count + 1);
        const newQuestion = {
            _id: "tempId" + String(count),
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
        checkRequiredFields(toolList, newList);
    };
    const deleteTool = async () => {
        await axios({
            method: "DELETE",
            url: `/api/tool/deleteOne?id=${toolID}`,
        });
        await axios({
            method: "DELETE",
            url: `/api/self-check/${selfCheckID}`,
        });
        router.push("/admin/dashboard/tools");
        onClose();
    };

    const disabledSave = () => {
        return (
            (JSON.stringify(questionList) ==
                JSON.stringify(lastSavedQuestions) &&
                JSON.stringify(toolList) == JSON.stringify(lastSavedTool)) ||
            ((JSON.stringify(questionList) ==
                JSON.stringify(defaultQuestions) ||
                JSON.stringify(questionList) == "[]") &&
                JSON.stringify(toolList) == JSON.stringify(defaultTool))
        );
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
        checkRequiredFields(toolList, newList);
    };

    const [qOrResActive, setQOrResActive] = useState(0);

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
                                saveTool("Delete ");
                                saveSelfCheck();
                                deleteTool();
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
                        label={(() => {
                            switch (stillNeeded) {
                                case "":
                                    return "";
                                case "New Page":
                                    return "Please make a change before publishing";
                                default:
                                    return (
                                        stillNeeded +
                                        "field still needs to be filled out"
                                    );
                            }
                        })()}
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
                                    toolList.status = "published";
                                    saveTool("Publish ");
                                    saveSelfCheck();
                                    setLastSavedTool(
                                        JSON.parse(JSON.stringify(toolList)),
                                    );
                                    setLastSavedQuestions(
                                        JSON.parse(
                                            JSON.stringify(questionList),
                                        ),
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
                                disabledSave()
                            }
                            //TODO: Send this output to the database
                            //rather than just logging it in the console

                            onClick={() => {
                                clearHiddenFilledFields();
                                saveTool("Save ");
                                saveSelfCheck();
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
            <SimpleGrid columns={1} spacing={0} px={10} pt={10}>
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
                        allTools={allTools}
                        onChangeInput={changeInput}
                    ></ToolHomePage>
                )}
            </SimpleGrid>
            {page == "self check" && (
                <>
                    <Flex alignItems="center" justifyContent="center" pb={5}>
                        <Button
                            variant="link"
                            size="sm"
                            isActive={qOrResActive == 0}
                            onClick={() => setQOrResActive(0)}
                        >
                            Question
                        </Button>
                        <Box
                            px={5}
                            style={{
                                height: "100%",
                                width: 1,
                                backgroundColor: "#ffffff",
                            }}
                        ></Box>
                        <Button
                            variant="link"
                            size="sm"
                            isActive={qOrResActive == 1}
                            onClick={() => setQOrResActive(1)}
                        >
                            Response
                        </Button>
                    </Flex>
                    {!qOrResActive ? (
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

                            {questionList.map((listQuestion, index) => (
                                <SelfCheckQuestionCard
                                    alphanumeric={
                                        listQuestion.alphanumericInput
                                    }
                                    type={listQuestion.type}
                                    options={listQuestion.options}
                                    question={listQuestion.question}
                                    questionId={String(listQuestion._id)}
                                    questionIndex={index}
                                    selfCheckQuestionSize={
                                        selfCheckQuestionSize
                                    }
                                    key={index + String(listQuestion._id)}
                                    onAddOption={addOneOption}
                                    onRemoveOption={removeOneOption}
                                    onChangeOptionInput={changeOptionInput}
                                    onChangeAlphanumeric={changeAlphanumeric}
                                    onAddQuestion={addOneQuestion}
                                    onRemoveQuestion={removeOneQuestion}
                                    onMoveQuestion={moveQuestion}
                                    onChangeQuestionInput={changeQuestionInput}
                                    onChangeQuestionType={changeQuestionType}
                                    onChangeSliderBounds={changeSliderBounds}
                                />
                            ))}
                        </SimpleGrid>
                    ) : (
                        <SimpleGrid>
                            <Box
                                borderRadius="lg"
                                rounded="md"
                                bg="gray.50"
                                p={10}
                                mb={8}
                            >
                                <Text fontSize={16} fontWeight={700} mr={6}>
                                    Select Questions used for the Self Check
                                    Score (Select all that apply)
                                </Text>
                                <Box py={2} width="65%">
                                    <Menu matchWidth closeOnSelect={false}>
                                        <MenuButton
                                            as={OutlineButton}
                                            rightIcon={<ChevronDownIcon />}
                                        >
                                            {getQuestionsList()}
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem>
                                                <Checkbox
                                                    isChecked={
                                                        selectedQuestions.length !==
                                                            0 &&
                                                        allValuedQuestions()
                                                            .length ===
                                                            selectedQuestions.length
                                                    }
                                                    onChange={() =>
                                                        setSelectedQuestions(
                                                            allValuedQuestions()
                                                                .length !==
                                                                selectedQuestions.length
                                                                ? allValuedQuestions()
                                                                : [],
                                                        )
                                                    }
                                                    isDisabled={
                                                        allValuedQuestions.length !==
                                                        0
                                                    }
                                                >
                                                    All Self Check Questions
                                                </Checkbox>
                                            </MenuItem>
                                            <MenuDivider />
                                            {questionList.map((ques) => (
                                                <MenuItem key={ques._id}>
                                                    <Checkbox
                                                        isChecked={shouldBeChecked(
                                                            ques,
                                                        )}
                                                        onChange={() =>
                                                            handleSelected(ques)
                                                        }
                                                        isDisabled={
                                                            !isValued(ques)
                                                        }
                                                    >
                                                        {"Question " +
                                                            ques.questionNumber +
                                                            ": " +
                                                            ques.question}
                                                    </Checkbox>
                                                </MenuItem>
                                            ))}
                                        </MenuList>
                                    </Menu>
                                </Box>
                                <Box py={5}>
                                    <Text
                                        fontSize={16}
                                        fontWeight={700}
                                        mr={6}
                                        display="inline-block"
                                        color="gray.300"
                                    >
                                        Minimum Score:
                                    </Text>
                                    <Text
                                        fontSize={16}
                                        display="inline-block"
                                        color="gray.300"
                                        pr={150}
                                    >
                                        {getMinSum(selectedQuestions)}
                                    </Text>
                                    <Text
                                        fontSize={16}
                                        fontWeight={700}
                                        mr={6}
                                        display="inline-block"
                                        color="gray.300"
                                    >
                                        Maximum Score:
                                    </Text>
                                    <Text
                                        fontSize={16}
                                        display="inline-block"
                                        color="gray.300"
                                    >
                                        {getMaxSum(selectedQuestions)}
                                    </Text>
                                </Box>
                                <Box width="65%">
                                    <Text fontSize={16} fontWeight={700} mb={3}>
                                        Self Check Response Intro
                                    </Text>
                                    <Textarea
                                        bg="whiteAlpha"
                                        value={description}
                                        onChange={(str) =>
                                            setDescription(str.target.value)
                                        }
                                        placeholder="Description"
                                    />
                                </Box>
                            </Box>
                            {breakpoints.map((bp) => (
                                <SelfCheckResponseCard
                                    key={bp._id}
                                    breakpointNum={bp.num}
                                    lowerBound={bp.lower}
                                    upperBound={bp.upper}
                                    description={bp.description}
                                    secondaryDesc={bp.secondaryDesc}
                                    lastBreakpoint={bp.lastBreakpoint}
                                    addNewBreakpoint={addOneBreakpoint}
                                    setDescription={(desc) =>
                                        updateDescription(bp._id, desc)
                                    }
                                    setSecondaryDesc={(desc) =>
                                        updateSecondaryDesc(bp._id, desc)
                                    }
                                    setLastBreakpoint={(last) =>
                                        updateLastBreakpoint(bp._id, last)
                                    }
                                    setUpperbound={(upper) =>
                                        updateUpper(bp._id, upper)
                                    }
                                    breakpointAfter={
                                        bp.lastBreakpoint ||
                                        bp.num === breakpoints.length
                                    }
                                ></SelfCheckResponseCard>
                            ))}
                        </SimpleGrid>
                    )}
                </>
            )}
        </Flex>
    );
};
ToolBuilder.layout = AdminLayout;
export default ToolBuilder;
