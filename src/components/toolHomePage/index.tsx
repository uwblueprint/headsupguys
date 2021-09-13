import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    Wrap,
    WrapItem,
    Input,
    Button,
    Grid,
    Box,
    Select,
    Textarea,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalCloseButton,
    useDisclosure,
} from "@chakra-ui/react";

const recommendedToolsList = ["Tool 1", "Tool 2", "Tool 3", "Tool 4", "Tool 5"];

//Self check question card component
export const ToolHomePage: React.FC = ({
    toolId,
    title,
    type,
    video,
    description,
    linkedModule,
    relatedResources,
    relatedStories,
    externalResources,
    recommendedTools,
    onChangeInput,
    onChangeThumbnail,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Wrap spacing="30px">
            <WrapItem width={"full"}>
                <FormControl isRequired mr={"5"}>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        Title
                    </FormLabel>
                    <Input
                        width={"full"}
                        size={"lg"}
                        isRequired
                        onChange={(e) =>
                            onChangeInput(toolId, e.target.value, "title")
                        }
                        value={title}
                        placeholder="Title"
                        isTruncated
                    />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        Select Tool Type
                    </FormLabel>
                    <Select
                        placeholder={"Select option"}
                        size={"lg"}
                        value={type}
                        onChange={(e) =>
                            onChangeInput(toolId, e.target.value, "type")
                        }
                    >
                        <option>Type 1</option>
                        <option>Type 2</option>
                        <option>Type 3</option>
                        <option>Type 4</option>
                        <option>Type 5</option>
                    </Select>
                </FormControl>
            </WrapItem>
            <WrapItem width={"full"} left={"0"}>
                <FormControl isRequired>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        Thumbnail
                    </FormLabel>
                    <Input
                        size={"lg"}
                        padding={"2"}
                        left={"0"}
                        type="file"
                        id="thumbnail"
                        name="thumbnail"
                        accept="image/*"
                        onChange={(e) =>
                            onChangeThumbnail(toolId, e.target.value)
                        }
                    ></Input>
                </FormControl>
            </WrapItem>
            <WrapItem width={"full"}>
                <FormControl isRequired>
                    <FormLabel fontSize={20}>
                        <b> Description </b>
                        <>(max 500 characters)</>
                    </FormLabel>
                    <Textarea
                        maxLength={500}
                        width={"full"}
                        size={"lg"}
                        isRequired
                        onChange={(e) =>
                            onChangeInput(toolId, e.target.value, "description")
                        }
                        value={description}
                        placeholder="Description"
                    />
                </FormControl>
            </WrapItem>
            <WrapItem width={"full"}>
                <FormControl isRequired mr={"5"}>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        Link Module
                    </FormLabel>
                    <Select
                        placeholder={"Select option"}
                        size={"lg"}
                        value={linkedModule}
                        onChange={(e) =>
                            onChangeInput(
                                toolId,
                                e.target.value,
                                "linkedModule",
                            )
                        }
                    >
                        <option>Module 1</option>
                        <option>Module 2</option>
                        <option>Module 3</option>
                        <option>Module 4</option>
                        <option>Module 5</option>
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        Video Link
                    </FormLabel>
                    <Input
                        type="url"
                        width={"full"}
                        _valid={{ outline: "red" }}
                        size={"lg"}
                        isRequired
                        onChange={(e) =>
                            onChangeInput(toolId, e.target.value, "video")
                        }
                        value={video}
                        placeholder="URL"
                        isTruncated
                    />
                </FormControl>
            </WrapItem>
            <Grid templateColumns="repeat(3, 1fr)" width={"full"} gap={6}>
                <Box>
                    <FormLabel fontSize={20} fontWeight={"bold"} mb={"5"}>
                        Related Resources
                    </FormLabel>
                    <Wrap>
                        {(externalResources ?? []).map((choice, index) => (
                            <WrapItem width={"full"}>
                                <Button
                                    variant="link"
                                    mb={"3"}
                                    colorScheme="blue"
                                >
                                    {`${
                                        externalResources[index] != ""
                                            ? externalResources[index]
                                            : "+ Add Link"
                                    }`}
                                </Button>
                            </WrapItem>
                        ))}
                    </Wrap>
                </Box>
                <Box>
                    <FormLabel fontSize={20} fontWeight={"bold"} mb={"5"}>
                        Related Stories
                    </FormLabel>
                    <Wrap>
                        {(externalResources ?? []).map((choice, index) => (
                            <WrapItem width={"full"}>
                                <Button
                                    variant="link"
                                    mb={"3"}
                                    colorScheme="blue"
                                >
                                    {`${
                                        externalResources[index] != ""
                                            ? externalResources[index]
                                            : "+ Add Link"
                                    }`}
                                </Button>
                            </WrapItem>
                        ))}
                    </Wrap>
                </Box>
                <Box>
                    <FormLabel fontSize={20} fontWeight={"bold"} mb={"5"}>
                        External Resources
                    </FormLabel>
                    <Wrap>
                        {(externalResources ?? []).map((choice, index) => (
                            <WrapItem width={"full"}>
                                <Button
                                    variant="link"
                                    mb={"3"}
                                    colorScheme="blue"
                                >
                                    {`${
                                        externalResources[index] != ""
                                            ? externalResources[index]
                                            : "+ Add Link"
                                    }`}
                                </Button>
                            </WrapItem>
                        ))}
                    </Wrap>
                </Box>
            </Grid>
            <WrapItem width={"50%"}>
                <FormControl isRequired>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        Select Recommended Tools
                    </FormLabel>
                    {(recommendedTools ?? []).map((choice, index) => (
                        <Select
                            placeholder={"Select option"}
                            mb={"3"}
                            value={recommendedTools[index]}
                            onChange={(e) =>
                                onChangeInput(
                                    toolId,
                                    e.target.value,
                                    "recommendedTools",
                                    index,
                                )
                            }
                        >
                            {(
                                recommendedToolsList.filter((item) => {
                                    return !recommendedTools
                                        .filter((item) => {
                                            return (
                                                recommendedTools.indexOf(
                                                    item,
                                                ) != index
                                            );
                                        })
                                        .includes(item);
                                }) ?? []
                            ).map((choice, index) => (
                                <option value={choice}>{choice}</option>
                            ))}
                        </Select>
                    ))}
                </FormControl>
            </WrapItem>
        </Wrap>
    );
};
