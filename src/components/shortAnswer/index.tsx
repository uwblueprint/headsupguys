import React from "react";
import { Box, Stack, Heading, Input, Flex } from "@chakra-ui/react";
import { Question } from "pages/admin/dashboard/builder";

export interface ShortAnswerProps {
    question: Question;
    setQuestion: (newQuestion: Question) => void;
}
interface ShortAnswerQuestionProps {
    value: Question;
    onChange: (newQuestion: Question) => void;
}

const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({
    value,
    onChange,
}) => {
    const { question } = value;
    return (
        <Flex>
            <Stack width={"full"} pb={8}>
                <Heading size="md">Short Answer</Heading>
                <Input
                    variant="flushed"
                    placeholder="Text Here"
                    onChange={(e) => {
                        onChange({ question: e.target.value });
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
        setQuestion(newQuestion.question);
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
    question: Question;
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
