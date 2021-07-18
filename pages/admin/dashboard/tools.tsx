import React, { useState, useEffect } from "react";
import { Stack, Center, Flex, Text, Button, useDisclosure } from "@chakra-ui/react";

import { ToolCard, Modal } from "@components";
import toolsList from "data/tools"

const ToolsPage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ toolsArray, setToolsArray ] = useState([]);

    const [ selectedTool, setSelectedTool ] = useState("");
    // Modal can be of "publish" or "delete" mode
    const [ modalMode, setModalMode ] = useState("");
    const publishConfirmation = `Are you sure you want to delete ${selectedTool}? Your tool will be available to the public!`
    const deleteConfirmation = `Are you sure you want to delete ${selectedTool}? This is a permanent action that cannot be undone.`

    // TODO: Need to update this to calculate relative date
    const date = new Date();

    const onLinkModule = () => {
        console.log("hello");
    };

    const onPublish = (toolName) => {
        setModalMode("publish")
        setSelectedTool(toolName);
        onOpen()
    };

    const onDelete = (toolName) => {
        setModalMode("delete")
        setSelectedTool(toolName);
        onOpen()
    };

    useEffect(() => {
        setToolsArray(toolsList);
    }, [])


    return (
        <Center>
        <Modal
            isOpen={isOpen}
            onCancel={onClose}
            onConfirm={onClose}
            header={`Delete ${selectedTool}`}
            bodyText={modalMode === "publish"? publishConfirmation: deleteConfirmation}
            confirmText="Delete"
            confirmButtonColor="red"
            size="lg"
        />
        <Flex direction="column" minH="100vh" pl="48px" pr="48px">
        <Flex mt={10} wrap={"wrap"} justify={"left"} width={"full"}>
                <Text mr={2} fontWeight="bold" fontSize="4xl">
                    Tools
                </Text>
                <Flex wrap={"wrap"} ml={"auto"}>
                    <Button
                        _hover={{ bg: "#F3F3F3" }}
                        _active={{
                            transform: "scale(0.95)",
                        }}
                        onClick={() => {}}
                        minWidth={"90"}
                        colorScheme="white"
                        variant="outline"
                    >
                        Create Tool
                    </Button>
                </Flex>
        </Flex>
        <Stack>
            {
                toolsArray.map((tool) => {
                    return (
                        <ToolCard
                            title={tool["title"]}
                            creators={tool["createdBy"]}
                            updated={date}
                            module={tool["moduleID"] !== ""}
                            published={tool["status"] === "published"}
                            onLinkModule={onLinkModule}
                            onPublish={() => onPublish(tool["title"])}
                            onDelete={() => onDelete(tool["title"])}
                        />
                    )
                })
            }
        </Stack>
        </Flex>       
        </Center>
    );
};

export default ToolsPage;
