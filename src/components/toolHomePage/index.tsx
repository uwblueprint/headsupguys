import React, { useState } from "react";
import {
    VStack,
    FormControl,
    FormLabel,
    Wrap,
    WrapItem,
    Box,
    Heading,
    Circle,
    Square,
    Spacer,
    Input,
    Image,
    InputLeftElement,
    InputRightElement,
    InputGroup,
    CloseButton,
    Button,
    ButtonGroup,
    Stack,
    HStack,
    Badge,
    IconButton,
    Select,
    Textarea,
    useDisclosure,
    Modal,
    ModalHeader,
    ModalOverlay,
    ModalContent,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
//Interface Props
// export interface ToolHomePageProps {
//     toolProps: any;
//     onChangeTitleInput: (target: string) => void;
// }

//Self check question card component
export const ToolHomePage: React.FC = ({
    toolId,
    title,
    videoLink,
    onChangeTitleInput,
    additionalResources,
}) => {
    return (
        <Wrap spacing="30px">
            <WrapItem width={"full"}>
                <FormControl id="first-name" isRequired>
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
                <FormControl id="first-name" isRequired ml={"5"}>
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
                <FormControl id="first-name" isRequired>
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
                <FormControl id="first-name" isRequired>
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
                <FormControl id="first-name" isRequired ml={"5"}>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        Video Link
                    </FormLabel>
                    <Input
                        width={"full"}
                        size={"lg"}
                        isRequired
                        onChange={(e) =>
                            onChangeTitleInput(toolId, e.target.value)
                        }
                        value={title}
                        placeholder="URL"
                        isTruncated
                    />
                </FormControl>
            </WrapItem>
            <WrapItem width={"full"}>
                <FormControl id="first-name" alignSelf={"right"}>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        Related Resources
                    </FormLabel>
                    <VStack spacing="24px">
                        <Button colorScheme="teal" variant="link">
                            + Add Link
                        </Button>
                        <Button colorScheme="teal" variant="link">
                            + Add Link
                        </Button>
                        <Button colorScheme="teal" variant="link">
                            + Add Link
                        </Button>
                    </VStack>
                </FormControl>
                <FormControl id="first-name" ml={"5"}>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        Related Stories
                    </FormLabel>
                    <Input
                        width={"full"}
                        size={"lg"}
                        isRequired
                        onChange={(e) =>
                            onChangeTitleInput(toolId, e.target.value)
                        }
                        value={title}
                        placeholder="URL"
                        isTruncated
                    />
                </FormControl>
                <FormControl id="first-name" ml={"5"}>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        External Resources
                    </FormLabel>
                    <Input
                        width={"full"}
                        size={"lg"}
                        isRequired
                        onChange={(e) =>
                            onChangeTitleInput(toolId, e.target.value)
                        }
                        value={title}
                        placeholder="URL"
                        isTruncated
                    />
                </FormControl>
            </WrapItem>
            <WrapItem width={"full"}>
                <FormControl id="first-name" isRequired>
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
