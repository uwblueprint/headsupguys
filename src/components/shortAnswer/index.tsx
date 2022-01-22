import React from "react";
import { Box, Button, Stack, Heading, Input, Flex } from "@chakra-ui/react";
import { Question } from "pages/admin/dashboard/builder";

export interface ShortAnswerProps {
    questions: Question[];
    setQuestions: (newQuestions: Question[]) => void;
}
interface ShortAnswerQuestionProps {
    index: number;
    value: Question;
    onChange: (newOption: Question, index: number) => void;
}

const ShortAnswerQuestion: React.FC<ShortAnswerQuestionProps> = ({
    index,
    value,
    onChange,
}) => {
    const { question } = value;
    return (
        <Flex>
            <Stack width={"full"} pb={8}>
                <Heading size="md">Short Answer {index + 1}</Heading>
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

    const optionFields = (
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
            <Stack spacing={2}>{optionFields}</Stack>
        </>
    );
};

interface ShortAnswerPreviewProps {
    questions: Question[];
}

export const ShortAnswerPreview: React.FC<ShortAnswerPreviewProps> = ({
    questions,
}) => {
    const optionFields = (
        <Box>
            {questions.map(({ question }) => (
                <Flex p={1}>
                    <Stack width={"full"} pb={5}>
                        <Box>{question}</Box>
                        <Input isReadOnly minHeight={100}></Input>
                    </Stack>
                </Flex>
            ))}
        </Box>
    );
    //TODO: render nothing if question && options null
    return <Box textAlign="left">{optionFields}</Box>;
};
