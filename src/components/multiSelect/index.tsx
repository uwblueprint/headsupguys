import React from "react";
import {
    Box,
    Button,
    Stack,
    Heading,
    Input,
    Flex,
    Checkbox,
} from "@chakra-ui/react";

export interface MultiSelectProps {
    question: string;
    setQuestion: (newQuestion: string) => void;
    options: string[];
    setOptions: (newOptions: string[]) => void;
}
interface MultiSelectOptionProps {
    index: number;
    value: string;
    onChange: (value: string, index: number) => void;
}

const MultiSelectOption: React.FC<MultiSelectOptionProps> = ({
    index,
    value,
    onChange,
}) => {
    return (
        <Flex>
            <Checkbox mr={2} />
            <Input
                variant="flushed"
                placeholder={`Multi-Select Option ${index + 1}`}
                onChange={(e) => {
                    onChange(e.target.value, index);
                }}
                value={value}
            />
        </Flex>
    );
};

export const MultiSelect: React.FC<MultiSelectProps> = ({
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
                        <MultiSelectOption
                            key={i}
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
