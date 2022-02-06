import React, { useState } from "react";
import {
    Stack,
    Flex,
    Text,
    Button,
    useDisclosure,
    Spacer,
    Spinner,
} from "@chakra-ui/react";
import { ToolCard, Modal, AdminLayout } from "@components";
import { Page } from "types/Page";
import { useRouter } from "next/router";
import { isAuthenticated } from "src/utils/auth/authHelpers";
import { GetServerSideProps } from "next";
import axios from "axios";
import useSWR from "swr";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    if (process.env.USE_ADMIN_LOGIN === "true") {
        const authProps = await isAuthenticated(req, res, "/redirect", true); // TODO: change redirect to login page (once we have a login page that's deployed)
        return {
            props: {
                auth: authProps,
            },
        };
    } else {
        return {
            props: {},
        };
    }
};

const fetcher = async (url) => {
    const response = await axios({
        method: "GET",
        url,
    });
    return response.data;
};

export interface ToolsProps {
    selectedTab: string;
}

export interface ToolsHeaderProps extends ToolsProps {
    setSelectedTab: (tabName: string) => void;
}

const ToolsHeader: React.FC<ToolsHeaderProps> = ({
    selectedTab,
    setSelectedTab,
}) => {
    const router = useRouter();
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
                    selfCheckGroupID: "",
                    relatedToolsIDs: ["", "", ""],
                    status: "draft",
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
            const newTool = toolResponse.data;
            newTool.selfCheckGroupID = selfCheckResponse.data._id;
            await axios({
                method: "PATCH",
                url: `/api/tool/update?id=${newTool._id}`,
                data: newTool,
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

    return (
        <>
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
        </>
    );
};

const Tools: React.FC<ToolsProps> = ({ selectedTab }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedTool, setSelectedTool] = useState("");
    const [selectedToolId, setSelectedToolId] = useState("");
    const [selectedSelfCheckId, setSelectedSelfCheckId] = useState("");
    // Modal can be of "publish" or "delete" mode
    const [modalMode, setModalMode] = useState("");
    const publishConfirmation = `Are you sure you want to publish ${selectedTool}? Your tool will be available to the public!`;
    const deleteConfirmation = `Are you sure you want to delete ${selectedTool}? This is a permanent action that cannot be undone.`;
    const [refresh, setRefresh] = useState(false);

    const onLinkModule = (e) => {
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

    const onDelete = (e, toolName, id, selfCheckId) => {
        setModalMode("delete");
        setSelectedTool(toolName);
        setSelectedToolId(id);
        setSelectedSelfCheckId(selfCheckId);
        onOpen();
        e.stopPropagation();
    };

    const deleteTool = async () => {
        await axios({
            method: "DELETE",
            url: `/api/tool/deleteOne?id=${selectedToolId}`,
        });
        await axios({
            method: "DELETE",
            url: `/api/self-check/${selectedSelfCheckId}`,
        });
        setRefresh(!refresh);
        onClose();
    };

    const { data, error } = useSWR("/api/tool", fetcher);
    if (error) return <div>An error has occurred.</div>;
    if (!data) return <Spinner color="brand.lime" size="xl" />;

    const toolsArray = data.filter((t) => {
        return t["status"] === selectedTab;
    });

    return (
        <>
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
            <Stack>
                {toolsArray.map((tool) => {
                    return (
                        <ToolCard
                            key={tool._id}
                            id={tool._id}
                            selfCheckId={tool.selfCheckGroupID}
                            title={tool.title}
                            creators={tool.createdBy}
                            updated={
                                tool.updatedAt
                                    ? new Date(tool.updatedAt)
                                    : new Date()
                            }
                            module={tool.linkedModuleID || null}
                            published={tool.status === "published"}
                            onLinkModule={(e) => {
                                onLinkModule(e);
                            }}
                            onPublish={(e) => {
                                onPublish(e, tool.title);
                            }}
                            onUnlinkModule={(e) => {
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
        </>
    );
};

const ToolsPage: Page = () => {
    const [selectedTab, setSelectedTab] = useState("draft");

    return (
        <Stack spacing={8}>
            <Flex direction="column" minH="100vh">
                <ToolsHeader
                    selectedTab={selectedTab}
                    setSelectedTab={setSelectedTab}
                />
                <Tools selectedTab={selectedTab} />
            </Flex>
        </Stack>
    );
};

ToolsPage.layout = AdminLayout;
export default ToolsPage;
