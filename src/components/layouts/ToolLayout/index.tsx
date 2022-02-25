import React, { useEffect } from "react";
import { Box, ChakraProvider, Flex, IconButton, Image } from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";

import NoSsr from "./NoSsr.tsx";
import { defaultTheme } from "@definitions/chakra/theme";
import { getVariant } from "src/utils/media/mediaHelpers";

export const ToolLayout: React.FC = ({ children }) => {
    const variant = getVariant();
    return (
        <ChakraProvider theme={defaultTheme}>
            <NoSsr>
                {variant === "desktop" ? (
                    <Flex
                        backgroundColor="black"
                        height="64px"
                        padding="24px calc(20vw - 120px)"
                        position="fixed"
                        width="100%"
                        zIndex="2"
                    >
                        <Image src="assets/hug-logo.png"></Image>
                    </Flex>
                ) : (
                    <Flex
                        backgroundColor="black"
                        height="64px"
                        justify="space-between"
                        padding="24px 14px 24px 20px"
                        position="fixed"
                        width="100%"
                        zIndex="2"
                    >
                        <Image src="assets/hug-logo.png"></Image>
                        <Flex align="center">
                            <IconButton
                                aria-label="Open menu"
                                _hover={{ backgroundColor: "" }}
                                icon={<MdMenu color="white" size={24} />}
                                variant="ghost"
                            />
                        </Flex>
                    </Flex>
                )}
            </NoSsr>
            <Box paddingTop="64px">{children}</Box>
        </ChakraProvider>
    );
};
