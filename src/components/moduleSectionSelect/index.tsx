import React, { ChangeEvent } from "react";
import {
    Box,
    HStack,
    Stack,
    Heading,
    Text,
    Select,
    Input,
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
        console.log({
            ...section,
            padding: { ...section.padding, ...newPadding },
        });
        setSection({
            ...section,
            padding: { ...section.padding, ...newPadding },
        });
    };
    const handleShortAnswerQuestionsChange = (questions) => {
        setSection({
            ...section,
            shortAnswer: { ...section.shortAnswer, questions },
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
                        questions={section.shortAnswer.questions}
                        setQuestions={handleShortAnswerQuestionsChange}
                    />
                ) : (
                    <></>
                )}
                {section.type && (
                    <HStack spacing={10}>
                        <Heading size="sm">Padding</Heading>
                        {Object.entries(section.padding).map(
                            ([direction, value]) => (
                                <HStack key={direction}>
                                    <Text>{direction}&nbsp;</Text>
                                    <Input
                                        type="number"
                                        value={value}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>,
                                        ) =>
                                            handlePaddingChange({
                                                [direction]: parseInt(
                                                    e.target.value,
                                                ),
                                            })
                                        }
                                        placeholder={"0"}
                                    />
                                </HStack>
                            ),
                        )}
                    </HStack>
                )}
            </Stack>
        </Box>
    );
};
