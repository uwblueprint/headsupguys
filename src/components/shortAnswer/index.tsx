import React from "react";
import { Box, Button, Stack, Heading, Input, Flex } from "@chakra-ui/react";
import { Question } from "pages/admin/dashboard/builder";

export interface ShortAnswerProps {
    options: Question[];
    setOptions: (newOptions: Question[]) => void;
}
interface ShortAnswerOptionProps {
    index: number;
    value: Question;
    onChange: (newOption: Question, index: number) => void;
}

const ShortAnswerOption: React.FC<ShortAnswerOptionProps> = ({
    index,
    value,
    onChange,
}) => {
    const { option } = value;
    return (
        <Flex>
            <Stack width={"full"} pb={8}>
                <Heading size="md">Short Answer {index + 1}</Heading>
                <Input
                    variant="flushed"
                    placeholder={"Text Here"}
                    onChange={(e) => {
                        onChange({ option: e.target.value }, index);
                    }}
                    value={option}
                />
            </Stack>
        </Flex>
    );
};

export const ShortAnswer: React.FC<ShortAnswerProps> = ({
    options,
    setOptions,
}) => {
    const onOptionsChange = (newOption, index) => {
        const newOptions = [...options];
        newOptions[index] = newOption;
        setOptions(newOptions);
    };

    const optionFields = (
        <Box>
            {options.map((currentOption, i) => (
                <ShortAnswerOption
                    key={i}
                    value={currentOption}
                    index={i}
                    onChange={onOptionsChange}
                />
            ))}
            <Button
                onClick={() => setOptions([...options, { option: "" }])}
                colorScheme="black"
                variant="ghost"
            >
                + Add Short Answer
            </Button>
        </Box>
    );

    return (
        <>
            <Stack spacing={2}>{optionFields}</Stack>
        </>
    );
};

interface ShortAnswerPreviewProps {
    question: string;
    options: Question[];
    variant: string;
    columns: string;
}

export const ShortAnswerPreview: React.FC<ShortAnswerPreviewProps> = ({
    question,
    options,
}) => {
    const optionFields = (
        <Box>
            {options.map(({ option }) => (
                <Flex p={1}>
                    <Stack width={"full"} pb={5}>
                        <Box>{option}</Box>
                        <Input isReadOnly minHeight={100}></Input>
                    </Stack>
                </Flex>
            ))}
        </Box>
    );
    //TODO: render nothing if question && options null
    return (
        <Box textAlign="left">
            <Box p={1}>{question}</Box>
            {optionFields}
        </Box>
    );
};
