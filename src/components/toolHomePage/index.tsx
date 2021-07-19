import React, { useState } from "react";
import {
    Flex,
    Center,
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
                    <FormLabel type={"url"} fontSize={20} fontWeight={"bold"}>
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
                    <Select placeholder={"Select option"}>
                        <option>Module 1</option>
                        <option>Module 2</option>
                        <option>Module 3</option>
                        <option>Module 4</option>
                        <option>Module 5</option>
                    </Select>
                </FormControl>
            </WrapItem>
            <WrapItem width={"full"}>
                <FormControl id="first-name" isRequired>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        Additional Resource
                    </FormLabel>
                    <HStack>
                        <Button variant="outline" p={"20"}>
                            <Circle
                                borderColor={"#E5E5E5"}
                                borderWidth={"2px"}
                                size={"7"}
                            >
                                <AddIcon color={"#E5E5E5"} />
                            </Circle>
                        </Button>

                        {additionalResources.map((item, index) => (
                            <Box
                                ml={"50"}
                                maxW={"400"}
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                            >
                                <Heading
                                    p={5}
                                    mb={"40"}
                                    height={"80%"}
                                    fontSize={"20"}
                                >{`Additional Resource Title ${
                                    index + 1
                                }`}</Heading>
                                <Box d="flex" alignItems="baseline">
                                    <Button
                                        width={"full"}
                                        p={"6"}
                                        bg={"#E5E5E5"}
                                        color={"black"}
                                        _hover={{ background: "grey" }}
                                    >
                                        Delete
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </HStack>
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
