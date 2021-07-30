import React from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Button } from "..";

export interface ModulePreviewProps {
    previous: boolean;
    next: boolean;
    save: boolean;
    print: boolean;
    prevText?: string;
    nextText?: string;
}

export const ModulePreview: React.FC<ModulePreviewProps> = (props) => {
    const { previous, next, save, print, prevText, nextText, ...rest } = props;
    const prevButton = prevText ? prevText : "PREV";
    const nextButton = nextText ? nextText : "NEXT";

    const styles = {
        previewScreen: {
            border: "1px solid #000",
        },
        contentBox: {
            overflow: "auto",
        },
    };

    return (
        <Box w="442px" h="697px" p="28px" __css={styles.previewScreen}>
            <Box w="100%" h="90%" __css={styles.contentBox}>
                {props.children}
            </Box>
            <Flex justify="space-around" py={3}>
                {previous && (
                    <Button variant="module" w="180px" h="55px">
                        {prevButton}
                    </Button>
                )}
                {next && (
                    <Button variant="module" w="180px" h="55px">
                        {nextButton}
                    </Button>
                )}
            </Flex>
        </Box>
    );
};
