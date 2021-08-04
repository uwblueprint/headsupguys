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
import axios from "axios"; // axios

import { ToolCard, Modal } from "@components";

const ToolsPage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [toolsArray, setToolsArray] = useState([]);

    const [selectedTool, setSelectedTool] = useState("");
    // Modal can be of "publish" or "delete" mode
    const [modalMode, setModalMode] = useState("");
    const publishConfirmation = `Are you sure you want to publish ${selectedTool}? Your tool will be available to the public!`;
    const deleteConfirmation = `Are you sure you want to delete ${selectedTool}? This is a permanent action that cannot be undone.`;

    const [selectedTab, setSelectedTab] = useState("draft");

    // TODO: Need to update this to calculate relative date
    const date = new Date();

    const filterTools = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: "/api/tool/getAll",
            });

            const filteredTools = response.data.filter((t) => {
                return t["status"] === selectedTab;
            });

            setToolsArray(filteredTools);
        } catch (err) {
            console.log(err);
            //TODO: update error handling
        }
    };

    useEffect(() => {
        filterTools();
    }, [selectedTab]);

    const onLinkModule = () => {
        console.log("hello");
    };

    const onPublish = (toolName) => {
        setModalMode("publish");
        setSelectedTool(toolName);
        onOpen();
    };

    const onDelete = (toolName) => {
        setModalMode("delete");
        setSelectedTool(toolName);
        onOpen();
    };

    useEffect(() => {
        filterTools();
    }, []);

    return (
        <Center>
            <Modal
                isOpen={isOpen}
                onCancel={onClose}
                onConfirm={onClose}
                header={
                    modalMode === "publish"
                        ? `Publish ${selectedTool}`
                        : `Delete ${selectedTool}`
                }
                bodyText={
                    modalMode === "publish"
                        ? publishConfirmation
                        : deleteConfirmation
                }
                confirmText={modalMode === "publish" ? `Publish` : `Delete`}
                confirmButtonColor={modalMode === "publish" ? `black` : `red`}
                size="lg"
            />
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
                        onClick={() => setSelectedTab("draft")}
                        isActive={selectedTab === "draft"}
                    >
                        Drafts
                    </Button>
                    <Button
                        variant="link"
                        _active={{ textDecoration: "underline", color: "#000" }}
                        onClick={() => setSelectedTab("published")}
                        isActive={selectedTab === "published"}
                    >
                        Published
                    </Button>
                </Flex>
                <Stack>
                    {toolsArray.map((tool, idx) => {
                        return (
                            <ToolCard
                                key={idx}
                                title={tool["title"]}
                                creators={tool["createdBy"]}
                                updated={date}
                                module={tool["moduleID"] !== ""}
                                published={tool["status"] === "published"}
                                onLinkModule={onLinkModule}
                                onPublish={() => onPublish(tool["title"])}
                                onDelete={() => onDelete(tool["title"])}
                            />
                        );
                    })}
                </Stack>
            </Flex>
        </Center>
    );
};

export default ToolsPage;
