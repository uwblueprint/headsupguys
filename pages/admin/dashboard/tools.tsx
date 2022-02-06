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
import useSWR, { useSWRConfig } from "swr";

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
    const { mutate } = useSWRConfig();
    const router = useRouter();
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

    const openTool = async (toolID, selfCheckID) => {
        try {
            router.push({
                pathname: "/admin/dashboard/toolBuilder",
                query: {
                    toolID: toolID,
                    selfCheckID: selfCheckID,
                },
            });
        } catch (err) {
            console.log(err);
        }
    };

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

    const getSelfCheck = async (id) => {
        try {
            const response = await axios({
                method: "GET",
                url: `/api/self-check/${id}`,
            });
            return response.data.questions;
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getAllModules();
    }, []);
    const unlinkedModules = allModules.filter((module) => {
        return module[2] == null;
    });

    const toolRequired = [
        /*Specifies tools that are required in the first index of each array.
        The second index specifies the beginning of the tooltip message shown
        when hovering over the submit button to indicate which fields still need
        to be filled by the user*/
        ["title", 'The Home Page "Title"'],
        ["type", 'The Home Page "Type"'],
        ["thumbnail", 'The Home Page "Thumbnail"'],
        ["description", 'The Home Page "Description"'],
        ["linkedModuleID", 'The Home Page "Link Module"'],
        ["relatedResources", 'The Home Page "Related Resources'],
        ["relatedStories", 'The Home Page "Related Stories'],
        ["externalResources", 'The Home Page "External Resources'],
    ];

    //The stillneeded variable defaults to the title
    const [stillNeeded, setStillNeeded] = useState([]);
    const checkRequiredFields = async (checkTool) => {
        const checkQuestion = await getSelfCheck(checkTool.selfCheckGroupID);
        const needed = [];
        //Specifies the tool or question field that still needs to be filled
        for (let i = 0; i < toolRequired.length; i++) {
            if (typeof checkTool[toolRequired[i][0]] == "string") {
                /*Checks if string is empty. Applies to all but the related
                    resources, related stories and external resources.
                    */
                if (checkTool[toolRequired[i][0]] == "") {
                    needed.push(toolRequired[i][1]);
                }
            } else {
                /*First checks the text, then the value properties of the
                    related resources, related stories and external resources fields.
                    */
                for (let j = 0; j < checkTool[toolRequired[i][0]].length; j++) {
                    if (
                        checkTool[toolRequired[i][0]][j][0] == "" &&
                        checkTool[toolRequired[i][0]][j][1] != ""
                    ) {
                        needed.push(toolRequired[i][1] + ' Text"');
                    }
                    if (
                        checkTool[toolRequired[i][0]][j][1] == "" &&
                        checkTool[toolRequired[i][0]][j][0] != ""
                    ) {
                        needed.push(toolRequired[i][1] + ' Link"');
                    }
                }
            }
        }
        //Checks the self check question fields
        for (let k = 0; k < checkQuestion.length; k++) {
            if (checkQuestion[k].question == "") {
                //Checks the question title to ensure it isn't blank
                needed.push(" + 1 or more self check questions");
                setStillNeeded(needed);
                return needed;
            }
            if (
                checkQuestion[k].type == "multiple_choice" ||
                checkQuestion[k].type == "multi_select"
            ) {
                //checks multiple choice/multiselect fields to ensure they aren't blank
                for (let l = 0; l < checkQuestion[k].options.length; l++) {
                    if (checkQuestion[k].options[l][0] == "") {
                        needed.push(" + 1 or more self check questions");
                        setStillNeeded(needed);
                        return needed;
                    }
                    if (checkQuestion[k].options[l][1] == "") {
                        needed.push(" + 1 or more self check questions");
                        setStillNeeded(needed);
                        return needed;
                    }
                }
            }
        }
        setStillNeeded(needed);
        return needed;
    };

    const onEdit = (e, id, toolName, modalMode) => {
        if (modalMode == "publish") {
            setSelectedToolId(id._id);
            setSelectedSelfCheckId(id.selfCheckGroupID);
            checkRequiredFields(id).then((needed) => {
                if (needed.length > 1) {
                    setModalMode("unpublishable");
                } else {
                    setModalMode(modalMode);
                }
            });
        } else {
            setModalMode(modalMode);
            setSelectedToolId(id);
        }
        setSelectedTool(toolName);
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

    const publishTool = () => {
        patchTool({ status: "published" });
    };

    const patchTool = async (changedField) => {
        await axios({
            method: "PATCH",
            url: `/api/tool/update?id=${selectedToolId}`,
            data: changedField,
        });
        mutate("/api/tool");
        getAllModules();
        setRefresh(!refresh);
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
        mutate("/api/tool");
        getAllModules();
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
                        ? publishTool()
                        : modalMode === "unpublishable"
                        ? openTool(selectedToolId, selectedSelfCheckId)
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
                        : modalMode === "unpublishable"
                        ? `To publish ${selectedTool}, please fill the following fields:`
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
                        : modalMode === "unpublishable"
                        ? stillNeeded.join(", ")
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
                        : modalMode === "unpublishable"
                        ? "Edit Tool"
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
                                onEdit(e, tool, tool.title, "publish");
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
