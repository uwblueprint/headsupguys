import React, { useState, useEffect } from "react";
import {
    Stack,
    Center,
    Flex,
    Text,
    Button,
    useDisclosure,
    Spacer,
} from "@chakra-ui/react";

import { ToolCard, Modal } from "@components";
import adminUsers from "data/adminUsers";

const SettingsPage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [toolsArray, setToolsArray] = useState([]);

    return (
        <Center>
            <Flex direction="column" minH="100vh" pl="48px" pr="48px">
                <Flex mt={10} wrap={"wrap"} justify={"left"} width={"full"}>
                    <Text mr={2} fontWeight="bold" fontSize="4xl">
                        Tools
                    </Text>
                    <Spacer />
                    <Button
                        _hover={{ bg: "#F3F3F3" }}
                        _active={{
                            transform: "scale(0.95)",
                        }}
                        // onClick={() => {}}
                        minWidth={"90"}
                        colorScheme="white"
                        variant="outline"
                    >
                        Create Tool
                    </Button>
                </Flex>
                <Flex mb={10} wrap={"wrap"} justify={"left"} width={"full"}>
                    <Button
                        variant="link"
                        mr={"20px"}
                        _active={{ textDecoration: "underline", color: "#000" }}
                    >
                        Drafts
                    </Button>
                    <Button
                        variant="link"
                        _active={{ textDecoration: "underline", color: "#000" }}
                    >
                        Published
                    </Button>
                </Flex>
            </Flex>
        </Center>
    );
};

export default SettingsPage;
