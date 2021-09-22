import React, { useState, useEffect } from "react";
import {
    Stack,
    Flex,
    Text,
    Button,
    useDisclosure,
    Spacer,
} from "@chakra-ui/react";
import { ToolCard, Modal, AdminLayout } from "@components";
import { Page } from "types/Page";
import axios from "axios";

const ToolsPage: Page = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [toolsArray, setToolsArray] = useState([]);

    const [selectedTool, setSelectedTool] = useState("");
    const [selectedToolId, setSelectedToolId] = useState("");
    // Modal can be of "publish" or "delete" mode
    const [modalMode, setModalMode] = useState("");
    const publishConfirmation = `Are you sure you want to publish ${selectedTool}? Your tool will be available to the public!`;
    const deleteConfirmation = `Are you sure you want to delete ${selectedTool}? This is a permanent action that cannot be undone.`;

    const [selectedTab, setSelectedTab] = useState("draft");
    const [refresh, setRefresh] = useState(false);

    // TODO: Need to update this to calculate relative date
    // const date = new Date();

    const filterTools = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: "/api/tool",
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
    }, [selectedTab, refresh]);

    const onLinkModule = () => {
        console.log("hello");
    };

    const onPublish = (toolName) => {
        setModalMode("publish");
        setSelectedTool(toolName);
        onOpen();
        //TODO: Implement publishing the tool in the db
    };

    const onDelete = (toolName, id) => {
        setModalMode("delete");
        setSelectedTool(toolName);
        setSelectedToolId(id);
        onOpen();
    };

    const deleteTool = async () => {
        await axios({
            method: "DELETE",
            url: `/api/tool/deleteOne?id=${selectedToolId}`,
        });
        setRefresh(!refresh);
        onClose();
    };

    useEffect(() => {
        filterTools();
    }, []);

    //TODO: Add connection to DB for unpublish and linking/unlinking tools

    return (
        <Stack spacing={8}>
            <Modal
                isOpen={isOpen}
                onCancel={onClose}
                onConfirm={() => {
                    deleteTool();
                }}
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
                confirmButtonColorScheme={
                    modalMode === "publish" ? `black` : `red`
                }
            />
            <Flex direction="column" minH="100vh">
                <Flex wrap={"wrap"} justify={"left"} width={"full"}>
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
                                updated={
                                    tool["updatedAt"]
                                        ? tool["updatedAt"]
                                        : new Date()
                                }
                                module={tool["moduleID"] !== ""}
                                published={tool["status"] === "published"}
                                onLinkModule={onLinkModule}
                                onPublish={() => onPublish(tool["title"])}
                                onUnlinkModule={() => {
                                    console.log("unlink");
                                }}
                                onUnpublish={() => {
                                    console.log("unpub");
                                }}
                                onDelete={() =>
                                    onDelete(tool["title"], tool["_id"])
                                }
                            />
                        );
                    })}
                </Stack>
            </Flex>
        </Stack>
    );
};

ToolsPage.layout = AdminLayout;
export default ToolsPage;
