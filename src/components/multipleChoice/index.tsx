import React from "react";
import {
    Box,
    Button,
    Stack,
    Heading,
    Input,
    Radio,
    Flex,
} from "@chakra-ui/react";

export interface MultipleChoiceProps {
    question: string;
    setQuestion: (newQuestion: string) => void;
    options: string[];
    setOptions: (newOptions: string[]) => void;
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
}) => {
    const onOptionsChange = (value, index) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    return (
        <>
            <Stack spacing={2}>
                <Box>
                    <Heading size="md">Question</Heading>
                    <Input
                        value={question}
                        onChange={(e) => {
                            setQuestion(e.target.value);
                        }}
                        placeholder="Text Here"
                    />
                </Box>
                <Box>
                    {options.map((option, i) => (
                        <MultipleChoiceOption
                            value={option}
                            index={i}
                            onChange={onOptionsChange}
                        />
                    ))}
                    <Button
                        onClick={() => setOptions([...options, ""])}
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
