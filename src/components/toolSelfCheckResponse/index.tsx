// import React, { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Checkbox, Input, Textarea, Text } from "@chakra-ui/react";

//Interface Props
export interface SelfCheckResponseCardProps {
    breakpointNum: number;
    lowerBound: number;
    upperBound: number;
    setUpperbound: (upper: number) => void;
    lastBreakpoint: boolean;
    setLastBreakpoint: (last: boolean) => void;
    description: string;
    setDescription: (desc: string) => void;
    addNewBreakpoint: () => void;
    secondaryDesc?: string;
    setSecondaryDesc?: (desc: string) => void;
}

//Self check response card component
export const SelfCheckResponseCard: React.FC<SelfCheckResponseCardProps> = ({
    breakpointNum,
    lowerBound,
    upperBound,
    setUpperbound,
    lastBreakpoint,
    setLastBreakpoint,
    description,
    setDescription,
    addNewBreakpoint,
    secondaryDesc = "",
    setSecondaryDesc = undefined,
}) => {
    return (
        <Box borderRadius="lg" rounded="md" bg="gray.50" pt={10} px={10} my={8}>
            <Text fontSize={16} fontWeight={700} mr={6}>
                Set Breakpoint Score {breakpointNum}
            </Text>
            <Text>
                If users score between these two values, what will you tell
                them?
            </Text>
            <Box pb={5} display="inline-block">
                <Input
                    isDisabled
                    placeholder={String(lowerBound)}
                    width="xsm"
                    display="inline-block"
                />
                <Text
                    fontSize={16}
                    fontWeight={700}
                    mx={6}
                    display="inline-block"
                >
                    to
                </Text>
                <Input
                    bg="whiteAlpha"
                    placeholder="Breakpoint Score"
                    value={upperBound}
                    width="xsm"
                    display="inline-block"
                    onChange={(str) =>
                        setUpperbound(parseInt(str.target.value))
                    }
                />
            </Box>
            <hr></hr>
            <Checkbox
                py={5}
                size="sm"
                isChecked={lastBreakpoint}
                onChange={() => setLastBreakpoint(!lastBreakpoint)}
            >
                Last breakpoint
            </Checkbox>
            <Text fontSize={16} fontWeight={700} mr={6}>
                Breakpoint Score {breakpointNum} Description
            </Text>
            <Text>
                If their score is between {lowerBound} and {upperBound}
            </Text>
            <Box py={4}>
                <Textarea
                    placeholder="Description"
                    bg="whiteAlpha"
                    value={description}
                    onChange={(str) => setDescription(str.target.value)}
                />
            </Box>
            {!lastBreakpoint ? (
                <Box>
                    <hr></hr>
                    <Box py={4}>
                        <Button
                            leftIcon={
                                <AddIcon fontSize={10} color="gray.400" />
                            }
                            onClick={addNewBreakpoint}
                            py={5}
                            size="sm"
                            variant="ghost"
                            textColor="gray.400"
                            fontWeight="normal"
                        >
                            Add new breakpoint
                        </Button>
                    </Box>
                </Box>
            ) : (
                <Box py={4}>
                    <Textarea
                        placeholder="Description"
                        bg="whiteAlpha"
                        value={secondaryDesc}
                        onChange={(str) => setSecondaryDesc(str.target.value)}
                    />
                </Box>
            )}
        </Box>
    );
};
