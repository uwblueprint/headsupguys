import React from "react";
import { Box, Stack, Heading, Input, Flex } from "@chakra-ui/react";

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
    const question = value;
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
                    value={question}
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
    question: string;
}

export const ShortAnswerPreview: React.FC<ShortAnswerPreviewProps> = ({
    question,
}) => {
    const questionFields = (
        <Box>
            <Flex p={1}>
                <Stack width={"full"} pb={5}>
                    <Box>{question}</Box>
                    <Input isReadOnly minHeight={100}></Input>
                </Stack>
            </Flex>
        </Box>
    );
    //TODO: render nothing if question is null
    return <Box textAlign="left">{questionFields}</Box>;
};
