import React from "react";
import { Box, Flex, Button, Container } from "@chakra-ui/react";

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
    saveModule?: () => void;
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
        saveModule,
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

            <Box w="100%" h="95%">
                <Box
                    minHeight={
                        (print || save) && variant == "mobile"
                            ? "76.5vh"
                            : "85vh"
                    }
                >
                    {props.children}
                </Box>
                <Box w="100%">
                    {print && save ? (
                        <Flex justify="space-between" py={2}>
                            <Button
                                variant="moduleBlack"
                                w="184px"
                                h="55px"
                                pointerEvents={preview ? "none" : "auto"}
                            >
                                {printButton}
                            </Button>
                            <Button
                                variant="moduleBlack"
                                w="184px"
                                h="55px"
                                pointerEvents={preview ? "none" : "auto"}
                                onClick={() => saveModule()}
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
                                    pointerEvents={preview ? "none" : "auto"}
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
                                    onClick={() => saveModule()}
                                    pointerEvents={preview ? "none" : "auto"}
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
                            pointerEvents={preview ? "none" : "auto"}
                        >
                            {prevButton}
                        </Button>
                        <Button
                            onClick={() => goNextSlide()}
                            variant="moduleGreen"
                            w="184px"
                            h="55px"
                            disabled={!next}
                            pointerEvents={preview ? "none" : "auto"}
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
            <Box
                w="100%"
                h={variant == "desktop" ? desktop.height : mobile.height}
            >
                <Box minHeight="91%">{props.children}</Box>
                <Box w="100%">
                    <Flex justify="space-between" py={2}>
                        <Button
                            variant="moduleGreen"
                            w="184px"
                            h="55px"
                            mx={2}
                            disabled={!previous}
                            onClick={() => goPrevSlide()}
                            pointerEvents={preview ? "none" : "auto"}
                        >
                            {prevButton}
                        </Button>
                        {print && (
                            <Button
                                variant="moduleBlack"
                                w="184px"
                                h="55px"
                                mx={2}
                                pointerEvents={preview ? "none" : "auto"}
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
                                onClick={() => saveModule()}
                                pointerEvents={preview ? "none" : "auto"}
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
                            pointerEvents={preview ? "none" : "auto"}
                        >
                            {nextButton}
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </>
    );
    return preview ? (
        <Box w={variant == "desktop" ? desktop.width : mobile.width} p={"20px"}>
            {variant == "desktop" ? desktopModule : mobileModule}
        </Box>
    ) : (
        <Container
            maxW={"100%"}
            w={variant == "desktop" ? desktop.width : mobile.width}
        >
            {variant == "desktop" ? desktopModule : mobileModule}
        </Container>
    );
};
