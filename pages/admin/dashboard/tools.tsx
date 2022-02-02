import React, { useState, useEffect } from "react";
import {
    Stack,
    Flex,
    Text,
    Button,
    Select,
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
    if (process.env.NODE_ENV == "production") {
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
    const [selectedModuleId, setSelectedModuleId] = useState("");
    const [selectedSelfCheckId, setSelectedSelfCheckId] = useState("");
    const [modalMode, setModalMode] = useState("");
    const publishConfirmation = `Are you sure you want to publish ${selectedTool}? Your tool will be available to the public!`;
    const deleteConfirmation = `Are you sure you want to delete ${selectedTool}? This is a permanent action that cannot be undone.`;
    const unpublishConfirmation = `Are you sure you want to unpublish ${selectedTool}? This will make your tool unavailable to the public.`;
    const unlinkConfirmation = `Are you sure you want to unlink ${selectedTool}? This will remove the tool from the module.`;
    const linkConfirmation = `Select a module to link ${selectedTool} to.`;
    const [refresh, setRefresh] = useState(false);
    const [allModules, setAllModules] = useState([]);
    const getAllModules = async () => {
        try {
            const response = await axios({
                method: "GET",
                url: "/api/module/getAll",
            });
            const newAllModules = [];
            for (const module in response.data) {
                newAllModules.push([
                    response.data[module]._id,
                    response.data[module].title,
                    response.data[module].toolID,
                ]);
            }
            setAllModules(newAllModules);
        } catch (err) {
            console.log(err);
            //TODO: update error handling
        }
    };
    useEffect(() => {
        getAllModules();
    }, []);
    const unlinkedModules = allModules.filter((module) => {
        return module[2] == null;
    });
    const onEdit = (e, id, toolName, modalMode) => {
        setModalMode(modalMode);
        setSelectedTool(toolName);
        setSelectedToolId(id);
        onOpen();
        e.stopPropagation();
    };

    const onDelete = (e, toolName, id, selfCheckId) => {
        setModalMode("delete");
        setSelectedTool(toolName);
        setSelectedToolId(id);
        setSelectedSelfCheckId(selfCheckId);
        onOpen();
        e.stopPropagation();
    };

    const patchTool = async (changedField) => {
        await axios({
            method: "PATCH",
            url: `/api/tool/update?id=${selectedToolId}`,
            data: changedField,
        });
        setRefresh(!refresh);
        // setRefresh(!refresh);
        onClose();
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
                children={
                    modalMode === "link" ? (
                        <Select
                            placeholder={"Select option"}
                            size={"lg"}
                            p={2}
                            onChange={(e) =>
                                setSelectedModuleId(e.target.value)
                            }
                        >
                            {unlinkedModules.map((moduleNames) => (
                                <option
                                    key={moduleNames[0]}
                                    value={moduleNames[0]}
                                >
                                    {moduleNames[1]}
                                </option>
                            ))}
                        </Select>
                    ) : null
                }
                isOpen={isOpen}
                onCancel={onClose}
                onConfirm={() => {
                    modalMode === "publish"
                        ? patchTool({ status: "published" })
                        : modalMode === "draft"
                        ? patchTool({ status: "draft" })
                        : modalMode === "delete"
                        ? deleteTool()
                        : modalMode === "unlink"
                        ? patchTool({ linkedModuleID: "" })
                        : modalMode === "link"
                        ? patchTool({ linkedModuleID: selectedModuleId })
                        : null;
                }}
                header={
                    modalMode === "publish"
                        ? `Publish ${selectedTool}`
                        : modalMode === "delete"
                        ? `Delete ${selectedTool}`
                        : modalMode === "draft"
                        ? `Unpublish ${selectedTool}`
                        : modalMode === "unlink"
                        ? `Unlink ${selectedTool}`
                        : modalMode === "link"
                        ? `Link ${selectedTool}`
                        : null
                }
                bodyText={
                    modalMode === "publish"
                        ? publishConfirmation
                        : modalMode === "delete"
                        ? deleteConfirmation
                        : modalMode === "draft"
                        ? unpublishConfirmation
                        : modalMode === "unlink"
                        ? unlinkConfirmation
                        : modalMode === "link"
                        ? linkConfirmation
                        : null
                }
                confirmText={
                    modalMode === "publish"
                        ? "Publish"
                        : modalMode === "delete"
                        ? "Delete"
                        : modalMode === "draft"
                        ? "Unpublish"
                        : modalMode === "unlink"
                        ? "Unlink"
                        : modalMode === "link"
                        ? "Link"
                        : null
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
                                onEdit(e, tool._id, tool.title, "link");
                            }}
                            onUnlinkModule={(e) => {
                                onEdit(e, tool._id, tool.title, "unlink");
                            }}
                            onPublish={(e) => {
                                onEdit(e, tool._id, tool.title, "publish");
                            }}
                            onUnpublish={(e) => {
                                onEdit(e, tool._id, tool.title, "draft");
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
