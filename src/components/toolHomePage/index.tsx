import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    Wrap,
    WrapItem,
    Input,
    Button,
    Select,
    Textarea,
} from "@chakra-ui/react";

//Self check question card component
export const ToolHomePage: React.FC = ({
    toolId,
    title,
    videoLink,
    onChangeTitleInput,
    onChangeVideoLinkInput,
}) => {
    return (
        <Wrap spacing="30px">
            <WrapItem width={"full"}>
                <FormControl isRequired>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        Title
                    </FormLabel>
                    <Input
                        width={"full"}
                        size={"lg"}
                        isRequired
                        onChange={(e) =>
                            onChangeTitleInput(toolId, e.target.value)
                        }
                        value={title}
                        placeholder="Title"
                        isTruncated
                    />
                </FormControl>
                <FormControl isRequired ml={"5"}>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        Select Tool Type
                    </FormLabel>
                    <Select placeholder={"Select option"} size={"lg"}>
                        <option>Type 1</option>
                        <option>Type 2</option>
                        <option>Type 3</option>
                        <option>Type 4</option>
                        <option>Type 5</option>
                    </Select>
                </FormControl>
            </WrapItem>
            <WrapItem width={"full"}>
                <FormControl isRequired>
                    <FormLabel fontSize={20}>Thumbnail</FormLabel>
                    <Button
                        variant="outline"
                        width={"50%"}
                        mb={"3"}
                        colorScheme="blue"
                    >
                        Upload Image
                    </Button>
                </FormControl>
            </WrapItem>
            <WrapItem width={"full"}>
                <FormControl isRequired>
                    <FormLabel fontSize={20}>
                        <b> Description </b>
                        <>(max 500 characters)</>
                    </FormLabel>
                    <Textarea
                        width={"full"}
                        size={"lg"}
                        isRequired
                        placeholder="Description"
                        isTruncated
                    />
                </FormControl>
            </WrapItem>
            <WrapItem width={"full"}>
                <FormControl isRequired>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        Link Module
                    </FormLabel>
                    <Select placeholder={"Select option"} size={"lg"}>
                        <option>Module 1</option>
                        <option>Module 2</option>
                        <option>Module 3</option>
                        <option>Module 4</option>
                        <option>Module 5</option>
                    </Select>
                </FormControl>
                <FormControl isRequired ml={"5"}>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        Video Link
                    </FormLabel>
                    <Input
                        width={"full"}
                        size={"lg"}
                        isRequired
                        placeholder="URL"
                        isTruncated
                    />
                </FormControl>
            </WrapItem>
            <WrapItem width={"full"}>
                <FormControl alignSelf={"right"}>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        Related Resources
                    </FormLabel>
                    <Wrap>
                        <WrapItem width={"full"}>
                            <Button variant="link" mb={"3"} colorScheme="blue">
                                + Add Link
                            </Button>
                        </WrapItem>
                        <WrapItem width={"full"}>
                            <Button variant="link" mb={"3"} colorScheme="blue">
                                + Add Link
                            </Button>
                        </WrapItem>
                        <WrapItem width={"full"}>
                            <Button variant="link" mb={"3"} colorScheme="blue">
                                + Add Link
                            </Button>
                        </WrapItem>
                    </Wrap>
                </FormControl>
                <FormControl ml={"5"}>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        Related Stories
                    </FormLabel>
                    <Wrap>
                        <WrapItem width={"full"}>
                            <Button variant="link" mb={"3"} colorScheme="blue">
                                + Add Link
                            </Button>
                        </WrapItem>
                        <WrapItem width={"full"}>
                            <Button variant="link" mb={"3"} colorScheme="blue">
                                + Add Link
                            </Button>
                        </WrapItem>
                        <WrapItem width={"full"}>
                            <Button variant="link" mb={"3"} colorScheme="blue">
                                + Add Link
                            </Button>
                        </WrapItem>
                    </Wrap>
                </FormControl>
                <FormControl ml={"5"}>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        External Resources
                    </FormLabel>
                    <Wrap>
                        <WrapItem width={"full"}>
                            <Button variant="link" mb={"3"} color="#3182CE">
                                + Add Link
                            </Button>
                        </WrapItem>
                        <WrapItem width={"full"}>
                            <Button variant="link" mb={"3"} color="#3182CE">
                                + Add Link
                            </Button>
                        </WrapItem>
                        <WrapItem width={"full"}>
                            <Button variant="link" mb={"3"} color="#3182CE">
                                + Add Link
                            </Button>
                        </WrapItem>
                    </Wrap>
                </FormControl>
            </WrapItem>
            <WrapItem width={"full"}>
                <FormControl isRequired>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        Select Recommended Tools
                    </FormLabel>
                    <Select placeholder={"Select option"} mb={"3"}>
                        <option>Tool 1</option>
                        <option>Tool 2</option>
                        <option>Tool 3</option>
                        <option>Tool 4</option>
                        <option>Tool 5</option>
                    </Select>
                    <Select placeholder={"Select option"} mb={"3"}>
                        <option>Tool 1</option>
                        <option>Tool 2</option>
                        <option>Tool 3</option>
                        <option>Tool 4</option>
                        <option>Tool 5</option>
                    </Select>
                    <Select placeholder={"Select option"} mb={"3"}>
                        <option>Tool 1</option>
                        <option>Tool 2</option>
                        <option>Tool 3</option>
                        <option>Tool 4</option>
                        <option>Tool 5</option>
                    </Select>
                </FormControl>
            </WrapItem>
        </Wrap>
    );
};
