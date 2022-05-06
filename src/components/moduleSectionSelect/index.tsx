import React, { ChangeEvent } from "react";
import {
    Box,
    HStack,
    Stack,
    Heading,
    Text,
    Select,
    Button,
    ButtonGroup,
    Flex,
    IconButton,
    useDisclosure,
} from "@chakra-ui/react";
import { IoTrash } from "react-icons/io5";
import {
    MarkdownEditor,
    MultipleChoice,
    MultiSelect,
    ShortAnswer,
    Modal,
    UserResponse,
} from "@components";
import { Section, Slide } from "pages/admin/dashboard/builder";

export interface ModuleSectionSelectProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    slides: Slide[];
    section: Section;
    setSection: (s: Section) => void; // TYPE IS SLIDE RIGHT ABOVE
    sectionNumber: number;
    deleteSection: () => void;
}

export const ModuleSectionSelect: React.FC<ModuleSectionSelectProps> = (
    props,
) => {
    const { section, setSection, sectionNumber, deleteSection } = props;

    const handleSelect = (e) => {
        setSection({ ...section, type: e.currentTarget.value });
    };

    const handleMarkdownChange = (text) => {
        setSection({ ...section, markdown: text });
    };

    const handleMultipleChoiceQuestionChange = (question) => {
        setSection({
            ...section,
            multipleChoice: { ...section.multipleChoice, question },
        });
    };

    const handleMultipleChoiceOptionsChange = (options) => {
        setSection({
            ...section,
            multipleChoice: { ...section.multipleChoice, options },
        });
    };

    const handleMultiSelectQuestionChange = (question) => {
        setSection({
            ...section,
            multiSelect: { ...section.multiSelect, question },
        });
    };

    const handleMultiSelectOptionsChange = (options) => {
        setSection({
            ...section,
            multiSelect: { ...section.multiSelect, options },
        });
    };

    const handlePaddingChange = (newPadding) => {
        setSection({
            ...section,
            padding: { ...section.padding, ...newPadding },
        });
    };
    const handleShortAnswerQuestionChange = (question) => {
        setSection({
            ...section,
            shortAnswer: question,
        });
    };

    const handleUserResponseChange = (slideIdx, sectionIdx) => {
        setSection({
            ...section,
            userResponse: { slideIdx, sectionIdx },
        });
    };

    const handleDeleteSection = () => {
        deleteSection();
        onClose();
    };

    const { type, markdown } = section;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const deleteConfirmation = `Are you sure you want to delete Section #${
        sectionNumber + 1
    }? This action cannot be undone.`;

    return (
        <Box>
            <Modal
                bodyText={deleteConfirmation}
                confirmButtonColorScheme={`red`}
                confirmText={`Yes, delete`}
                header={`Delete Section`}
                isOpen={isOpen}
                onCancel={onClose}
                onConfirm={handleDeleteSection}
            />
            <Flex>
                <Heading size="lg">Section {sectionNumber + 1}</Heading>
                <IconButton
                    aria-label="Delete module"
                    color="gray.500"
                    icon={<IoTrash size={20} />}
                    ml="12px"
                    onClick={onOpen}
                    variant="ghost"
                />
            </Flex>
            <br />
            <Heading size="md">Select Content Type</Heading>
            <Select
                w="368px"
                my={3}
                value={type}
                placeholder="Select Option"
                onChange={handleSelect}
            >
                <option value="staticContent">Text / Image / Video</option>
                <option value="multipleChoice">Multiple Choice</option>
                <option value="multiSelect">Multi-Select</option>
                <option value="shortAnswer">Short Answer</option>
                <option value="userResponse">User Response</option>
            </Select>
            <Stack spacing={2}>
                {type == "staticContent" ? (
                    <MarkdownEditor
                        value={markdown || ""}
                        setValue={handleMarkdownChange}
                    />
                ) : type == "multipleChoice" ? (
                    <MultipleChoice
                        preview={false}
                        question={section.multipleChoice.question}
                        setQuestion={handleMultipleChoiceQuestionChange}
                        options={section.multipleChoice.options}
                        setOptions={handleMultipleChoiceOptionsChange}
                        columns={section.properties.columns}
                    />
                ) : section.type == "multiSelect" ? (
                    <MultiSelect
                        question={section.multiSelect.question}
                        setQuestion={handleMultiSelectQuestionChange}
                        options={section.multiSelect.options}
                        setOptions={handleMultiSelectOptionsChange}
                        columns={section.properties.columns}
                    />
                ) : section.type == "shortAnswer" ? (
                    <ShortAnswer
                        question={section.shortAnswer}
                        setQuestion={handleShortAnswerQuestionChange}
                    />
                ) : section.type == "userResponse" ? (
                    <UserResponse
                        slides={props.slides}
                        setQuestion={handleUserResponseChange}
                    />
                ) : (
                    <></>
                )}
                {section.type && (
                    <HStack spacing={6}>
                        <Heading size="sm">Padding</Heading>
                        {Object.entries(section.padding).map(
                            ([direction, value]) => (
                                <>
                                    {direction !== "type" ? (
                                        <HStack key={direction}>
                                            <Text>{direction}&nbsp;</Text>
                                            <input
                                                type="number"
                                                value={value === 0 ? "" : value}
                                                onChange={(
                                                    e: ChangeEvent<HTMLInputElement>,
                                                ) => {
                                                    handlePaddingChange({
                                                        [direction]: e.target
                                                            .value.length
                                                            ? parseInt(
                                                                  e.target
                                                                      .value,
                                                              )
                                                            : 0,
                                                    });
                                                }}
                                                placeholder={"0"}
                                                style={{
                                                    padding: 4,
                                                    width: 35,
                                                }}
                                            />
                                        </HStack>
                                    ) : (
                                        <></>
                                    )}
                                </>
                            ),
                        )}
                        <Flex width={"full"} justify={"right"} wrap={"wrap"}>
                            <ButtonGroup
                                ml={"0"}
                                mr={"0"}
                                size="sm"
                                isAttached
                                variant="outline"
                            >
                                <Button
                                    onClick={() => {
                                        handlePaddingChange({
                                            type: "px",
                                        });
                                    }}
                                    _hover={{
                                        bg:
                                            section.padding.type === "px"
                                                ? "black"
                                                : "white",
                                    }}
                                    color={
                                        section.padding.type === "px"
                                            ? "white"
                                            : "black"
                                    }
                                    background={
                                        section.padding.type === "px"
                                            ? "black"
                                            : "white"
                                    }
                                >
                                    px
                                </Button>
                                <Button
                                    onClick={() => {
                                        handlePaddingChange({
                                            type: "%",
                                        });
                                    }}
                                    _hover={{
                                        bg:
                                            section.padding.type === "px"
                                                ? "white"
                                                : "black",
                                    }}
                                    color={
                                        section.padding.type === "px"
                                            ? "black"
                                            : "white"
                                    }
                                    background={
                                        section.padding.type === "px"
                                            ? "white"
                                            : "black"
                                    }
                                >
                                    %
                                </Button>
                            </ButtonGroup>
                        </Flex>
                    </HStack>
                )}
                <br />
            </Stack>
        </Box>
    );
};
