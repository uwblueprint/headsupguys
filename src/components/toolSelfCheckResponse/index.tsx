import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormErrorMessage,
    Input,
    Textarea,
    Text,
} from "@chakra-ui/react";

//Interface Props
export interface SelfCheckResponseCardProps {
    key: React.Key;
    breakpointNum: number;
    lowerBound: number;
    upperBound: number;
    setUpperbound: (upper: string) => void;
    lastBreakpoint: boolean;
    breakpointAfter?: boolean;
    setLastBreakpoint: (last: boolean) => void;
    setDescription: (desc: string) => void;
    addNewBreakpoint: () => void;
    setSecondaryDesc?: (desc: string) => void;
    deleteCurrBreakpoint: (num: number) => void;
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
    setDescription,
    addNewBreakpoint,
    deleteCurrBreakpoint,
    setSecondaryDesc = undefined,
}) => {
    return (
        <Box borderRadius="lg" rounded="md" bg="gray.50" pt={10} px={10} mb={8}>
            <Flex>
                <Text fontSize={16} fontWeight={700} mr={6}>
                    Set Breakpoint Score {breakpointNum}
                </Text>
                {breakpointNum != 1 ? (
                    <Button
                        rightIcon={<DeleteIcon />}
                        size="sm"
                        variant="ghost"
                        textColor="gray.400"
                        fontWeight="normal"
                        onClick={() => deleteCurrBreakpoint(breakpointNum)}
                    >
                        Delete
                    </Button>
                ) : (
                    <></>
                )}
            </Flex>
            <Text>
                If users score between these two values, what will you tell
                them?
            </Text>
            <FormControl
                width="35%"
                display="inline-block"
                isInvalid={isNaN(upperBound) || upperBound < lowerBound}
            >
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
                    <Input
                        type="number"
                        bg="whiteAlpha"
                        placeholder="Breakpoint Score"
                        textAlign="center"
                        width="35%"
                        defaultValue={upperBound}
                        onChange={(str) => setUpperbound(str.target.value)}
                        onWheel={(e) => e.currentTarget.blur()}
                    />
                </Box>
                {isNaN(upperBound) ? (
                    <FormErrorMessage>
                        Upper bound value not recognized.
                    </FormErrorMessage>
                ) : (
                    <></>
                )}
                {upperBound < lowerBound ? (
                    <FormErrorMessage>
                        Upper bound must be greater than or equal to the lower
                        bound.
                    </FormErrorMessage>
                ) : (
                    <></>
                )}
            </FormControl>
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
                        </FormControl>
                    </Box>
                </Box>
            ) : breakpointAfter ? (
                <Box pt={8} width="65%">
                    <Text>
                        If their score is above {upperBound ?? "[UPPER BOUND]"}
                    </Text>
                    <Box py={4}>
                        <Textarea
                            placeholder="Description"
                            bg="whiteAlpha"
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
