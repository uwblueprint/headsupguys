import React from "react";
import { Box, ChakraProvider, Flex, IconButton, Image } from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";
import { useRouter } from "next/router";

import { defaultTheme } from "@definitions/chakra/theme";
import { getIsDesktop } from "src/utils/media/mediaHelpers";

export const ToolLayout: React.FC = ({ children }) => {
    const [isDesktop] = getIsDesktop();
    const router = useRouter();

    const Logo = () => (
        <Image
            onClick={() => router.push("/")}
            src="/assets/hug-logo.png"
            cursor={"pointer"}
        ></Image>
    );

    return (
        <ChakraProvider theme={defaultTheme}>
            {isDesktop ? (
                <Flex
                    backgroundColor="black"
                    height="64px"
                    padding="24px calc(20vw - 120px)"
                    position="fixed"
                    width="100%"
                    zIndex="2"
                >
                    <Logo />
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
                    <Logo />
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
            <Box minHeight="100vh" paddingTop="64px">
                {children}
            </Box>
        </ChakraProvider>
    );
};
