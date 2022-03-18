import React from "react";
import { Box, Stack, Heading, Input, Flex, Textarea } from "@chakra-ui/react";

export interface ShortAnswerProps {
    question: string;
    setQuestion: (newQuestion: string) => void;
}
interface ShortAnswerQuestionProps {
    value: string;
    onChange: (newQuestion: string) => void;
}

const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({
    value,
    onChange,
}) => {
    return (
        <Flex>
            <Stack width={"full"} pb={8}>
                <Heading size="md">Short Answer</Heading>
                <Input
                    variant="flushed"
                    placeholder="Text Here"
                    onChange={(e) => {
                        onChange(e.target.value);
                    }}
                    value={value}
                />
            </Stack>
        </Flex>
    );
};

export const ShortAnswer: React.FC<ShortAnswerProps> = ({
    question,
    setQuestion,
}) => {
    const onQuestionChange = (newQuestion) => {
        setQuestion(newQuestion);
    };

    const questionFields = (
        <Box>
            <ShortAnswerQuestion value={question} onChange={onQuestionChange} />
        </Box>
    );

    return (
        <>
            <Stack spacing={2}>{questionFields}</Stack>
        </>
    );
};

interface ShortAnswerPreviewProps {
    preview: boolean;
    question: string;
    userInput?: string;
    onChange?: (value: string) => void;
}

export const ShortAnswerPreview: React.FC<ShortAnswerPreviewProps> = ({
    preview,
    question,
    userInput,
    onChange,
}) => {
    const questionFields = (
        <Box>
            <Flex p={1}>
                <Stack width={"full"} pb={5}>
                    <Box>{question}</Box>
                    <Textarea
                        value={userInput}
                        maxLength={500}
                        width={"full"}
                        size={"lg"}
                        isRequired
                        isReadOnly={preview}
                        resize={preview ? "none" : "vertical"}
                        minHeight={100}
                        onChange={(e) => {
                            onChange(e.target.value);
                        }}
                    />
                </Stack>
            </Flex>
        </Box>
    );
    //TODO: render nothing if question is null
    return <Box textAlign="left">{questionFields}</Box>;
};
