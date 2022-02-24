import React from "react";
import { Box, Container, Flex, Button } from "@chakra-ui/react";

export interface ModulePreviewProps {
    preview: boolean;
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
    goNextSlide?: () => void;
    goPrevSlide?: () => void;
}

export const ModulePreview: React.FC<ModulePreviewProps> = (props) => {
    const {
        preview,
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
        goNextSlide,
        goPrevSlide,
    } = props;

    const prevButton = prevText ? prevText : "PREV";
    const nextButton = nextText ? nextText : "NEXT";
    const printButton = printText ? printText : "PRINT";
    const saveButton = saveText ? saveText : "SAVE";

    const mobile = { width: 342, height: 697 };
    const desktop = { width: 455, height: 697 };

    return (
        <>
            {variant == "mobile" ? (
                <Container
                    w={preview ? mobile.width : "100%"}
                    h={preview ? mobile.height : "100%"}
                    p={preview ? "20px" : "0px"}
                    border={preview ? "1px solid #000" : "none"}
                >
                    <Box w="100%" h="5%">
                        <Flex
                            alignItems="start"
                            h="17px"
                            backgroundColor="brand.lime"
                        >
                            <Box
                                w={`${progressValue}%`}
                                h="100%"
                                backgroundColor="brand.lime"
                            ></Box>
                        </Flex>
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
                                    onClick={() => goPrevSlide()}
                                    variant="moduleGreen"
                                    w="184px"
                                    h="55px"
                                    disabled={!previous}
                                >
                                    {prevButton}
                                </Button>
                                <Button
                                    onClick={() => goNextSlide()}
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
                </Container>
            ) : (
                <Container
                    w={preview ? desktop.width : "100%"}
                    h={preview ? desktop.height : "100%"}
                    p={preview ? "28px" : "0px"}
                    border={preview ? "1px solid #000" : "none"}
                >
                    <Flex
                        alignItems="start"
                        h="17px"
                        backgroundColor="brand.lime"
                    >
                        <Box
                            w={`${progressValue}%`}
                            h="100%"
                            backgroundColor="brand.lime"
                        ></Box>
                    </Flex>
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
                </Container>
            )}
        </>
    );
};
