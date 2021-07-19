import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
    Input,
    Text,
    Button,
    Container,
    Progress,
    Heading,
    useRadioGroup,
    VStack,
    HStack,
} from "@chakra-ui/react";
import demographicQuestions from "../data/demographic";
import { StyledRadio } from "@components/radio";

const Demographic: React.FC = () => {
    // Current set of questions and answers
    const [questions, setQuestions] = useState([]);
    // Current question Index
    const [questionIndex, setQuestionIndex] = useState(0);
    // Question -> Answers Map
    const [answers, setAnswers] = useState({});
    const [buttonDisabled, setButtonDisabled] = useState(true);
    // Completed survey
    const [completed, setCompleted] = useState(false);
    const [inputNeeded, setInputNeeded] = useState(false);
    // Text input
    const [textIput, setTextInput] = useState("");

    // Set questions to be the demographicQuestions array
    useEffect(() => {
        setQuestions(demographicQuestions);
    }, []);

    const updateAnswers = (ans) => {
        if (ans === "Other (please specify)") {
            setButtonDisabled(false);
            setInputNeeded(true);
            return;
        }
        setAnswers({ ...answers, [questions[questionIndex].question]: ans });
        setButtonDisabled(false);
    };

    const nextPage = () => {
        // Update answers if there's a textInput
        if (textIput != "") {
            updateAnswers(textIput);
            setTextInput("");
        }
        setInputNeeded(false);
        setButtonDisabled(true);
        setQuestionIndex(questionIndex + 1);
    };

    const prevPage = () => {
        setQuestionIndex(questionIndex - 1);
        setInputNeeded(false);
        setButtonDisabled(true);
    };

    const submitResults = () => {
        // TODO: Link to API to submit demographic Info
        setCompleted(true);
    };

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: "demographicQuestions",
        onChange: updateAnswers,
    });

    const group = getRootProps();

    return (
        <Container paddingTop="30px">
            {!completed ? (
                <Container>
                    {questionIndex != 0 && (
                        <HStack spacing="12px">
                            <Image
                                src="/icons/chevron.svg"
                                width="6.75"
                                height="13.5"
                            />
                            <Button
                                variant="link"
                                marginTop="33px"
                                onClick={prevPage}
                            >
                                Back
                            </Button>
                        </HStack>
                    )}
                    <Progress
                        my="20px"
                        colorScheme="telegram"
                        value={(questionIndex / questions.length) * 100}
                    />
                    <Heading as="h1" size="xl">
                        {questions.length > 0 &&
                            questions[questionIndex].question}
                    </Heading>
                    <VStack {...group}>
                        {questions.length > 0 &&
                            questions[questionIndex].options.map((value) => {
                                const radio = getRadioProps({ value });
                                return (
                                    <StyledRadio key={value} {...radio}>
                                        {value}
                                    </StyledRadio>
                                );
                            })}
                        {questions.length > 0 && inputNeeded && (
                            <Input
                                placeholder="Type here"
                                px={5}
                                py={3}
                                size="lg"
                                onChange={(e) => setTextInput(e.target.value)}
                            ></Input>
                        )}
                    </VStack>
                    {questionIndex < questions.length - 1 ? (
                        <Button
                            disabled={buttonDisabled}
                            colorScheme="blue"
                            marginTop="20px"
                            onClick={nextPage}
                            isFullWidth
                        >
                            Continue
                        </Button>
                    ) : (
                        <Button
                            disabled={buttonDisabled}
                            colorScheme="blue"
                            marginTop="20px"
                            onClick={submitResults}
                            isFullWidth
                        >
                            Submit
                        </Button>
                    )}
                </Container>
            ) : (
                // If survey is completed show the Survey Complete Screen
                <Container centerContent marginTop="50%">
                    <Progress colorScheme="telegram" value={64} />
                    <Image src="/icons/checkmark.svg" width="99" height="99" />
                    <Heading as="h2" size="lg" py="15px">
                        You're all set
                    </Heading>
                    <Text size="xl">Thank you for completing the survey!</Text>
                    <Button colorScheme="blue" marginTop="20px" isFullWidth>
                        Get Started
                    </Button>
                    <Button
                        colorScheme="blackAlpha"
                        marginTop="20px"
                        variant="outline"
                        isFullWidth
                    >
                        Change Answers
                    </Button>
                </Container>
            )}
        </Container>
    );
};

export default Demographic;
