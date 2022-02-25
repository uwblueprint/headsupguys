import React from "react";
import { Box, Flex, Button, useMediaQuery, Container } from "@chakra-ui/react";

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

    const mobile = { width: 326, height: 697 };
    const desktop = { width: 750, height: 697 };
    const mobileModule = (
        <>
            <Box w="100%" h="5%">
                <Flex alignItems="start" h="17px" backgroundColor="black">
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
                            <Button variant="moduleBlack" w="184px" h="55px">
                                {printButton}
                            </Button>
                            <Button variant="moduleBlack" w="184px" h="55px">
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
        </>
    );
    const desktopModule = (
        <>
            <Flex alignItems="start" h="17px" backgroundColor="black">
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
                            onClick={() => goPrevSlide()}
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
                            onClick={() => goNextSlide()}
                        >
                            {nextButton}
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </>
    );
    return preview ? (
        <Box
            w={variant == "desktop" ? desktop.width : mobile.width}
            h={variant == "desktop" ? desktop.height : mobile.height}
            p={"20px"}
            border={"1px solid #000"}
        >
            {variant == "desktop" ? desktopModule : mobileModule}
        </Box>
    ) : (
        <Container w={variant == "desktop" ? desktop.width : mobile.width}>
            {variant == "desktop" ? desktopModule : mobileModule}
        </Container>
    );
};
