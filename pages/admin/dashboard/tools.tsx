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
import { useRouter } from "next/router";
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
    const date = new Date();
    const router = useRouter();
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

    const createTool = async () => {
        try {
            const toolResponse = await axios({
                method: "POST",
                url: "/api/tool/post",
                data: {
                    title: "Untitled Tool",
                    type: "",
                    thumnbnail: "",
                    video: "",
                    description: "",
                    linkedModuleID: "",
                    relatedResources: [
                        ["", ""],
                        ["", ""],
                        ["", ""],
                    ],
                    relatedStories: [
                        ["", ""],
                        ["", ""],
                        ["", ""],
                    ],
                    externalResources: [
                        ["", ""],
                        ["", ""],
                        ["", ""],
                    ],
                    relatedToolsIDs: ["", "", ""],
                },
            });
            const selfCheckResponse = await axios({
                method: "POST",
                url: "/api/self-check/post",
                data: [
                    {
                        type: "multiple_choice",
                        question: "Untitled Question",
                        options: [
                            ["", ""],
                            ["", ""],
                            ["", ""],
                        ],
                        alphanumericInput: true,
                        questionNumber: 1,
                    },
                ],
            });
            router.push({
                pathname: "/admin/dashboard/toolBuilder",
                query: {
                    toolID: toolResponse.data._id,
                    selfCheckID: selfCheckResponse.data._id,
                },
            });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        filterTools();
    }, [selectedTab, refresh]);

    const onLinkModule = (e) => {
        console.log("hello");
        e.stopPropagation();
    };

    const onPublish = (e, toolName) => {
        setModalMode("publish");
        setSelectedTool(toolName);
        onOpen();
        e.stopPropagation();
        //TODO: Implement publishing the tool in the db
    };
    const onUnpublish = (e, toolName) => {
        setModalMode("draft");
        setSelectedTool(toolName);
        onOpen();
        e.stopPropagation();
        //TODO: Implement publishing the tool in the db
    };

    const onDelete = (e, toolName, id) => {
        setModalMode("delete");
        setSelectedTool(toolName);
        setSelectedToolId(id);
        onOpen();
        e.stopPropagation();
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
                        onClick={() => {
                            createTool();
                        }}
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
                    {toolsArray.map((tool) => {
                        return (
                            <ToolCard
                                key={tool._id}
                                id={tool._id}
                                title={tool.title}
                                creators={tool.createdBy}
                                updated={date}
                                module={tool.linkedModuleID !== null}
                                published={tool.status === "published"}
                                onLinkModule={(e) => {
                                    onLinkModule(e);
                                }}
                                onPublish={(e) => {
                                    onPublish(e, tool.title);
                                }}
                                onUnlinkModule={(e) => {
                                    console.log("unlink");
                                    e.stopPropagation();
                                }}
                                onUnpublish={(e) => {
                                    onUnpublish(e, tool.title);
                                }}
                                onDelete={onDelete}
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
