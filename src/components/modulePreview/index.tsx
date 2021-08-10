import React from "react";
import { Box, Flex, Progress } from "@chakra-ui/react";
import { Button } from "..";

export interface ModulePreviewProps {
    previous: boolean;
    next: boolean;
    save: boolean;
    print: boolean;
    prevText?: string;
    nextText?: string;
    saveText?: string;
    printText?: string;
    progressValue?: number;
    variant: string;
}

export const ModulePreview: React.FC<ModulePreviewProps> = (props) => {
    const {
        previous,
        next,
        save,
        print,
        prevText,
        nextText,
        progressValue,
        variant,
        saveText,
        printText,
        ...rest
    } = props;
    const prevButton = prevText ? prevText : "PREV";
    const nextButton = nextText ? nextText : "NEXT";
    const printButton = printText ? printText : "PRINT";
    const saveButton = saveText ? saveText : "SAVE";

    const mobile = { width: 442, height: 697 };
    const desktop = { width: 955, height: 697 };

    return (
        <>
            {variant == "mobile" ? (
                <Box
                    w={mobile.width}
                    h={mobile.height}
                    p="20px"
                    border="1px solid #000"
                >
                    <Box w="100%" h="5%">
                        {progressValue && (
                            <Progress
                                colorScheme="green"
                                size="lg"
                                value={progressValue}
                            />
                        )}
                    </Box>
                    <Box w="100%" h="95%" overflow="auto">
                        <Box minHeight="77%">{props.children}</Box>
                        <Box w="100%">
                            {print && save ? (
                                <Flex justify="space-between" py={2}>
                                    <Button
                                        variant="moduleBlack"
                                        w="184px"
                                        h="55px"
                                    >
                                        {printButton}
                                    </Button>
                                    <Button
                                        variant="moduleBlack"
                                        w="184px"
                                        h="55px"
                                    >
                                        {saveButton}
                                    </Button>
                                </Flex>
                            ) : (
                                <>
                                    {print && (
                                        <Button
                                            variant="moduleBlack"
                                            w="100%"
                                            h="55px"
                                            my={2}
                                        >
                                            {printButton}
                                        </Button>
                                    )}
                                    {save && (
                                        <Button
                                            variant="moduleBlack"
                                            w="100%"
                                            h="55px"
                                            my={2}
                                        >
                                            {saveButton}
                                        </Button>
                                    )}
                                </>
                            )}
                            <Flex justify="space-between" py={2}>
                                <Button
                                    variant="moduleGreen"
                                    w="184px"
                                    h="55px"
                                    disabled={!previous}
                                >
                                    {prevButton}
                                </Button>
                                <Button
                                    variant="moduleGreen"
                                    w="184px"
                                    h="55px"
                                    disabled={!next}
                                >
                                    {nextButton}
                                </Button>
                            </Flex>
                        </Box>
                    </Box>
                </Box>
            ) : (
                <Box
                    w={desktop.width}
                    h={desktop.height}
                    p="28px"
                    border="1px solid #000"
                >
                    <Box w="100%" h="5%">
                        {progressValue && (
                            <Progress
                                colorScheme="green"
                                size="lg"
                                value={progressValue}
                            />
                        )}
                    </Box>
                    <Box w="100%" h="95%" overflow="auto">
                        <Box minHeight="88%">{props.children}</Box>
                        <Box w="100%" h="10%">
                            <Flex justify="center" py={2}>
                                <Button
                                    variant="moduleGreen"
                                    w="184px"
                                    h="55px"
                                    mx={2}
                                    disabled={!previous}
                                >
                                    {prevButton}
                                </Button>
                                {print && (
                                    <Button
                                        variant="moduleBlack"
                                        w="184px"
                                        h="55px"
                                        mx={2}
                                    >
                                        {printButton}
                                    </Button>
                                )}
                                {save && (
                                    <Button
                                        variant="moduleBlack"
                                        w="184px"
                                        h="55px"
                                        mx={2}
                                    >
                                        {saveButton}
                                    </Button>
                                )}
                                <Button
                                    variant="moduleGreen"
                                    w="184px"
                                    h="55px"
                                    mx={2}
                                    disabled={!next}
                                >
                                    {nextButton}
                                </Button>
                            </Flex>
                        </Box>
                    </Box>
                </Box>
            )}
        </>
    );
};
