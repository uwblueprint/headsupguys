import React from "react";
import { Box, Button, Stack, Heading, Input, Flex } from "@chakra-ui/react";
import { Question } from "pages/admin/dashboard/builder";

export interface ShortAnswerProps {
    questions: Question[];
    setQuestions: (newQuestions: Question[]) => void;
    columns: string;
}
interface ShortAnswerQuestionProps {
    index: number;
    value: Question;
    onChange: (newQuestion: Question, index: number) => void;
}

const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({
    index,
    value,
    onChange,
}) => {
    const { question } = value;
    return (
        <Flex>
            <Stack width={"full"} paddingBottom={5}>
                <Heading size="md">Short Answer Question {index + 1}</Heading>
                <Input
                    variant="flushed"
                    placeholder={"Text Here"}
                    onChange={(e) => {
                        onChange({ question: e.target.value }, index);
                    }}
                    value={question}
                />
            </Stack>
        </Flex>
    );
};

export const ShortAnswer: React.FC<ShortAnswerProps> = ({
    questions,
    setQuestions,
}) => {
    const onQuestionsChange = (newQuestion, index) => {
        const newQuestions = [...questions];
        newQuestions[index] = newQuestion;
        setQuestions(newQuestions);
    };

    const questionFields = (
        <Box>
            {questions.map((currentQuestion, i) => (
                <ShortAnswerQuestion
                    key={i}
                    value={currentQuestion}
                    index={i}
                    onChange={onQuestionsChange}
                />
            ))}
            <Button
                onClick={() => setQuestions([...questions, { question: "" }])}
                colorScheme="black"
                variant="ghost"
            >
                + Add Short Answer
            </Button>
        </Box>
    );

    return (
        <>
            <Stack spacing={2}>{questionFields}</Stack>
        </>
    );
};

interface ShortAnswerPreviewProps {
    questions: Question[];
    variant: string;
}

export const ShortAnswerPreview: React.FC<ShortAnswerPreviewProps> = ({
    questions,
}) => {
    const questionFields = (
        <Box>
            {questions.map(({ question }) => (
                <Flex p={1}>
                    <Stack paddingBottom={5} width={"full"}>
                        <Box>{question}</Box>
                        <Input isReadOnly minHeight={100}></Input>
                    </Stack>
                </Flex>
            ))}
        </Box>
    );

    //TODO: render nothing if questions == null
    return <Box textAlign="left">{questionFields}</Box>;
};
