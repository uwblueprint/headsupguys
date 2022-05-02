import { Box, Button, Flex } from "@chakra-ui/react";
import Link from "next/link";
import { useState, VFC } from "react";

export const LoginPromptBar: VFC = () => {
    const [show, setShow] = useState(true);
    if (!show) return null;
    return (
        <Flex
            backgroundColor="background.mid"
            justify="center"
            padding="16px 24px"
            position="fixed"
            width="100%"
            zIndex="2"
            color="white"
        >
            <Flex width="100%" maxW="1500px" justify="space-between">
                <Flex>
                    <Box style={{ textDecoration: "underline" }}>
                        <Link href="login">Log in </Link>
                    </Box>
                    &nbsp;now to save your progress
                </Flex>
                <Button variant="link" onClick={() => setShow(false)}>
                    <Box color="white" mr="-24px">
                        X
                    </Box>
                </Button>
            </Flex>
        </Flex>
    );
};
