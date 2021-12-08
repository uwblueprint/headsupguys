import React from "react";
import {
    Box,
    Button,
    Stack,
    Heading,
    Input,
    Flex,
    Checkbox,
    Grid,
} from "@chakra-ui/react";
import { Option } from "pages/admin/dashboard/builder";

export interface MultiSelectProps {
    question: string;
    setQuestion: (newQuestion: string) => void;
    options: Option[];
    setOptions: (newOptions: Option[]) => void;
    columns: string;
}
interface MultiSelectOptionProps {
    index: number;
    value: Option;
    onChange: (newOption: Option, index: number) => void;
}

const MultiSelectOption: React.FC<MultiSelectOptionProps> = ({
    index,
    value,
    onChange,
}) => {
    const { option, column } = value;
    return (
        <Flex>
            <Checkbox mr={2} isReadOnly />
            <Input
                variant="flushed"
                placeholder={`Multi-Select Option ${index + 1}`}
                onChange={(e) => {
                    onChange({ option: e.target.value, column }, index);
                }}
                value={option}
            />
        </Flex>
    );
};

export const MultiSelect: React.FC<MultiSelectProps> = ({
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
                            <MultiSelectOption
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
                            <MultiSelectOption
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
                    <MultiSelectOption
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
