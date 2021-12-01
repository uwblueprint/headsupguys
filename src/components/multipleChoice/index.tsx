import React, { Dispatch, useState } from "react";
import {
    Box,
    Button,
    HStack,
    Stack,
    Heading,
    Text,
    Select,
    Input,
    Radio,
    Flex,
} from "@chakra-ui/react";
import _ from "lodash";
import { MarkdownEditor } from "@components";
import { ModuleAction, Slide } from "pages/admin/dashboard/builder";

export interface MultipleChoiceProps {
    question: string;
    setQuestion: (newQuestion: string) => void;
    options: string[];
    setOptions: (newOptions: string[]) => void;
    saveInputData: boolean;
}
interface MultipleChoiceOptionProps {
    index: number;
    value: string;
    onChange: (value: string, index: number) => void;
}

const MultipleChoiceOption: React.FC<MultipleChoiceOptionProps> = ({
    index,
    value,
    onChange,
}) => {
    return (
        <Flex>
            <Radio mr={2} />
            <Input
                variant="flushed"
                placeholder={`Multiple Choice Option ${index + 1}`}
                onChange={(e) => {
                    onChange(e.target.value, index);
                }}
                value={value}
            />
        </Flex>
    );
};

export const MultipleChoice: React.FC<MultipleChoiceProps> = ({
    question,
    setQuestion,
    options,
    setOptions,
    saveInputData,
}) => {
    const [editedQuestion, setEditedQuestion] = useState(question);
    const [editedOptions, setEditedOptions] = useState([...options]);
    const onInputChange = (value, index) => {
        const newOptions = [...editedOptions];
        newOptions[index] = value;
        setEditedOptions(newOptions);
    };

    if (saveInputData) {
        setQuestion(editedQuestion);
        setOptions(editedOptions);
    }

    return (
        <>
            <Stack spacing={2}>
                <Box>
                    <Heading size="md">Question</Heading>
                    <Input
                        value={editedQuestion}
                        onChange={(e) => setEditedQuestion(e.target.value)}
                        placeholder="Text Here"
                    />
                </Box>
                <Box>
                    {editedOptions.map((option, i) => (
                        <MultipleChoiceOption
                            value={editedOptions[i]}
                            index={i}
                            onChange={onInputChange}
                        />
                    ))}
                    <Button
                        onClick={() => setEditedOptions([...editedOptions, ""])}
                        colorScheme="black"
                        variant="ghost"
                    >
                        + Add Option
                    </Button>
                </Box>
            </Stack>
        </>
    );
};
