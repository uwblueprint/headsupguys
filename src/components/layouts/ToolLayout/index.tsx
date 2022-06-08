import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    ChakraProvider,
    Flex,
    IconButton,
    Image,
} from "@chakra-ui/react";
import { MdMenu } from "react-icons/md";
import { useRouter } from "next/router";

import { defaultTheme } from "@definitions/chakra/theme";
import { getIsDesktop } from "src/utils/media/mediaHelpers";
import { Auth } from "aws-amplify";

export const ToolLayout: React.FC = ({ children }) => {
    const [isDesktop] = getIsDesktop();
    const [user, setUser] = useState<any | null>(null);

    useEffect(() => {
        const getCurrentUser = async () => {
            const currentUser = await Auth.currentAuthenticatedUser();
            setUser(currentUser);
        };

        getCurrentUser().catch(console.error);
    }, []);
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
            <Flex
                backgroundColor="black"
                height="64px"
                justify="space-between"
                padding="24px"
                position="fixed"
                width="100%"
                zIndex="2"
            >
                <Logo />
                <Flex align="center">
                    <Button
                        onClick={() => {
                            user ? Auth.signOut() : router.push("/signup");
                        }}
                        variant="link"
                        color="white"
                    >
                        {user ? "Sign Out" : "Sign Up"}
                    </Button>
                </Flex>
            </Flex>
            <Box minHeight="100vh" paddingTop="64px">
                {children}
            </Box>
        </ChakraProvider>
    );
};
