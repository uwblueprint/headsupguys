import React from "react";
import {
    Box,
    Button,
    Stack,
    Heading,
    Input,
    Radio,
    Flex,
    Grid,
} from "@chakra-ui/react";
import { Option } from "pages/admin/dashboard/builder";

export interface ShortAnswerProps {
    question: string;
    setQuestion: (newQuestion: string) => void;
    options: Option[];
    setOptions: (newOptions: Option[]) => void;
    columns: string;
}
interface ShortAnswerOptionProps {
    index: number;
    value: Option;
    onChange: (newOption: Option, index: number) => void;
}

const ShortAnswerOption: React.FC<ShortAnswerOptionProps> = ({
    index,
    value,
    onChange,
}) => {
    const { option, column } = value;
    return (
        <Flex>
            <Radio mr={2} isReadOnly />
            <Input
                variant="flushed"
                placeholder={`Short Answer Option ${index + 1}`}
                onChange={(e) => {
                    onChange({ option: e.target.value, column }, index);
                }}
                value={option}
            />
        </Flex>
    );
};

export const ShortAnswer: React.FC<ShortAnswerProps> = ({
    question,
    setQuestion,
    options,
    setOptions,
    columns,
}) => {
    const onOptionsChange = (newOption, index) => {
        const newOptions = [...options];
        newOptions[index] = newOption;
        setOptions(newOptions);
    };
    const leftColumnOptions = options.filter(({ column }) => column === "left");
    const rightColumnOptions = options.filter(
        ({ column }) => column === "right",
    );

    const optionFields =
        columns && columns === "double" ? (
            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                <Box>
                    {leftColumnOptions.map((leftOption) => {
                        const i = options.indexOf(leftOption);
                        return (
                            <ShortAnswerOption
                                key={i}
                                value={leftOption}
                                index={i}
                                onChange={onOptionsChange}
                            />
                        );
                    })}
                    <Button
                        onClick={() =>
                            setOptions([
                                ...options,
                                { option: "", column: "left" },
                            ])
                        }
                        colorScheme="black"
                        variant="ghost"
                    >
                        + Add Option
                    </Button>
                </Box>
                <Box>
                    {rightColumnOptions.map((rightOption) => {
                        const i = options.indexOf(rightOption);
                        return (
                            <ShortAnswerOption
                                key={i}
                                value={rightOption}
                                index={i}
                                onChange={onOptionsChange}
                            />
                        );
                    })}
                    <Button
                        onClick={() =>
                            setOptions([
                                ...options,
                                { option: "", column: "right" },
                            ])
                        }
                        colorScheme="black"
                        variant="ghost"
                    >
                        + Add Option
                    </Button>
                </Box>
            </Grid>
        ) : (
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
                    + Add Option
                </Button>
            </Box>
        );

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
                {optionFields}
            </Stack>
        </>
    );
};

interface ShortAnswerPreviewProps {
    question: string;
    options: Option[];
    variant: string;
    columns: string;
}

export const ShortAnswerPreview: React.FC<ShortAnswerPreviewProps> = ({
    question,
    options,
    variant,
    columns,
}) => {
    let leftColumnOptions, rightColumnOptions;
    const showDoubleColumns =
        variant === "desktop" && columns && columns === "double";
    if (showDoubleColumns) {
        leftColumnOptions = options.filter(({ column }) => column === "left");
        rightColumnOptions = options.filter(({ column }) => column === "right");
    }

    const optionFields = showDoubleColumns ? (
        <Grid templateColumns="repeat(2, 1fr)" gap={3}>
            <Box>
                {leftColumnOptions.map(({ option }) => (
                    <Flex p={1}>
                        <Radio mr={2} isReadOnly />
                        <Box>{option}</Box>
                    </Flex>
                ))}
            </Box>
            <Box>
                {rightColumnOptions.map(({ option }) => (
                    <Flex p={1}>
                        <Radio mr={2} isReadOnly />
                        <Box>{option}</Box>
                    </Flex>
                ))}
            </Box>
        </Grid>
    ) : (
        <Box>
            {options.map(({ option }) => (
                <Flex p={1}>
                    <Radio mr={2} isReadOnly />
                    <Box>{option}</Box>
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
