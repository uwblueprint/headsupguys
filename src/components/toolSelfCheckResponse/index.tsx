import { AddIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Checkbox,
    FormErrorMessage,
    FormControl,
    Input,
    NumberInput,
    NumberInputField,
    Textarea,
    Text,
} from "@chakra-ui/react";

//Interface Props
export interface SelfCheckResponseCardProps {
    key: React.Key;
    breakpointNum: number;
    lowerBound: number;
    upperBound: number;
    setUpperbound: (upper: number) => void;
    lastBreakpoint: boolean;
    breakpointAfter?: boolean;
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
    breakpointAfter = false,
    setLastBreakpoint,
    description,
    setDescription,
    addNewBreakpoint,
    secondaryDesc = "",
    setSecondaryDesc = undefined,
}) => {
    const handleUpperChange = (str) => {
        setUpperbound(isNaN(parseInt(str)) ? parseInt(str) : undefined);
    };

    return (
        <Box borderRadius="lg" rounded="md" bg="gray.50" pt={10} px={10} mb={8}>
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
                    textAlign="center"
                    width="35%"
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
                <FormControl width="35%" display="inline-block">
                    <NumberInput>
                        <NumberInputField
                            type="number"
                            bg="whiteAlpha"
                            placeholder="Breakpoint Score"
                            value={upperBound}
                            textAlign="center"
                            onChange={handleUpperChange}
                        />
                    </NumberInput>
                    {upperBound !== undefined && upperBound <= lowerBound ? (
                        <FormErrorMessage>
                            Upper bound must be larger than the lower bound.
                        </FormErrorMessage>
                    ) : (
                        <></>
                    )}
                </FormControl>
            </Box>
            <Box width="65%">
                <hr></hr>
            </Box>
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
                If their score is between {lowerBound} and{" "}
                {upperBound ?? "[UPPER BOUND]"}
            </Text>
            <Box py={4}>
                <Textarea
                    placeholder="Description"
                    bg="whiteAlpha"
                    width="65%"
                    value={description}
                    onChange={(str) => setDescription(str.target.value)}
                />
            </Box>
            {!lastBreakpoint && breakpointAfter ? (
                <Box>
                    <hr></hr>
                    <Box py={4}>
                        <FormControl>
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
                            {upperBound === undefined ? (
                                <FormErrorMessage>
                                    You cannot add a new breakpoint before
                                    defining this one's upper bound.
                                </FormErrorMessage>
                            ) : (
                                <></>
                            )}
                        </FormControl>
                    </Box>
                </Box>
            ) : breakpointAfter ? (
                <Box pt={8}>
                    <Text>
                        If their score is above {upperBound ?? "[UPPER BOUND]"}
                    </Text>
                    <Box py={4}>
                        <Textarea
                            placeholder="Description"
                            bg="whiteAlpha"
                            value={secondaryDesc}
                            onChange={(str) =>
                                setSecondaryDesc(str.target.value)
                            }
                        />
                    </Box>
                </Box>
            ) : (
                <></>
            )}
        </Box>
    );
};
