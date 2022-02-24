import React from "react";
import {
    Box,
    Button,
    Stack,
    Heading,
    Input,
    Radio,
    RadioGroup,
    Flex,
    Grid,
    CloseButton,
} from "@chakra-ui/react";
import { Option } from "pages/admin/dashboard/builder";

interface MultipleChoiceOptionProps {
    preview: boolean;
    index: number;
    value: Option;
    onChange: (newOption: Option, index: number) => void;
    onDelete: (index: number) => void;
}

const MultipleChoiceOption: React.FC<MultipleChoiceOptionProps> = ({
    preview,
    index,
    value,
    onChange,
    onDelete,
}) => {
    const { option, column } = value;
    return (
        <Flex>
            <Radio value={option} mr={2} isReadOnly={preview} />
            <Input
                variant="flushed"
                placeholder={`Multiple Choice Option ${index + 1}`}
                onChange={(e) => {
                    onChange({ option: e.target.value, column }, index);
                }}
                value={option}
            />
            <CloseButton mt="5px" onClick={() => onDelete(index)} />
        </Flex>
    );
};

export interface MultipleChoiceProps {
    preview: boolean;
    question: string;
    setQuestion: (newQuestion: string) => void;
    options: Option[];
    setOptions: (newOptions: Option[]) => void;
    columns: string;
}
export const MultipleChoice: React.FC<MultipleChoiceProps> = ({
    preview,
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
    const onDelete = (index) => {
        const newOptions = [
            ...options.slice(0, index),
            ...options.slice(index + 1),
        ];
        setOptions(newOptions);
    };

    const optionFields =
        columns && columns === "double" ? (
            <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                <Box>
                    {leftColumnOptions.map((leftOption) => {
                        const i = options.indexOf(leftOption);
                        return (
                            <MultipleChoiceOption
                                preview={preview}
                                key={i}
                                value={leftOption}
                                index={i}
                                onChange={onOptionsChange}
                                onDelete={onDelete}
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
                            <MultipleChoiceOption
                                preview={preview}
                                key={i}
                                value={rightOption}
                                index={i}
                                onChange={onOptionsChange}
                                onDelete={onDelete}
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
                    <MultipleChoiceOption
                        preview={preview}
                        key={i}
                        value={currentOption}
                        index={i}
                        onChange={onOptionsChange}
                        onDelete={onDelete}
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

interface MultipleChoicePreviewProps {
    preview: boolean;
    question: string;
    options: Option[];
    variant: string;
    columns: string;
}

export const MultipleChoicePreview: React.FC<MultipleChoicePreviewProps> = ({
    preview,
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
                        <Radio value={option} mr={2} isReadOnly={preview} />
                        <Box>{option}</Box>
                    </Flex>
                ))}
            </Box>
            <Box>
                {rightColumnOptions.map(({ option }) => (
                    <Flex p={1}>
                        <Radio value={option} mr={2} isReadOnly={preview} />
                        <Box>{option}</Box>
                    </Flex>
                ))}
            </Box>
        </Grid>
    ) : (
        <Box>
            <RadioGroup>
                {options.map(({ option }) => (
                    <Flex p={1}>
                        <Radio value={option} mr={2} isReadOnly={preview} />
                        <Box>{option}</Box>
                    </Flex>
                ))}
            </RadioGroup>
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
