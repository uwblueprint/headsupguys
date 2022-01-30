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
} from "@chakra-ui/react";
import {
    MarkdownEditor,
    MultipleChoice,
    MultiSelect,
    ShortAnswer,
} from "@components";
import { Section } from "pages/admin/dashboard/builder";

export interface ModuleSectionSelectProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    section: Section;
    setSection: (s: Section) => void; // TYPE IS SLIDE RIGHT ABOVE
    sectionNumber: number;
}

export const ModuleSectionSelect: React.FC<ModuleSectionSelectProps> = (
    props,
) => {
    const { section, setSection, sectionNumber } = props;

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

    const { type, markdown } = section;
    return (
        <Box>
            <Heading size="lg">Section {sectionNumber + 1}</Heading>
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
            </Select>
            <Stack spacing={2}>
                {type == "staticContent" ? (
                    <MarkdownEditor
                        value={markdown || ""}
                        setValue={handleMarkdownChange}
                    />
                ) : type == "multipleChoice" ? (
                    <MultipleChoice
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
