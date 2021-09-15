import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    Wrap,
    WrapItem,
    Input,
    Button,
    Grid,
    Text,
    GridItem,
    Select,
    Textarea,
    CloseButton,
    Spacer,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from "@chakra-ui/react";
import { NumericTypes } from "mongoose";

const recommendedToolsList = ["Tool 1", "Tool 2", "Tool 3", "Tool 4", "Tool 5"];

export interface SelfCheckQuestionCardProps {
    toolId: string;
    title: string;
    type: string;
    video: string;
    description: string;
    linkedModule: string;
    relatedResources: string[][];
    relatedStories: string[][];
    externalResources: string[][];
    recommendedTools: string[];
    onChangeInput: (
        id: string,
        target: string,
        type: string,
        index1?: number,
        index2?: number,
    ) => void;
}

//Self check question card component
export const ToolHomePage: React.FC = ({
    toolId,
    title,
    type,
    video,
    thumbnail,
    description,
    linkedModule,
    relatedResources,
    relatedStories,
    externalResources,
    recommendedTools,
    onChangeInput,
}) => {
    const [openModal, setOpenModal] = useState(false);
    const [modalIndex, setModalIndex] = useState(null);
    const relatedLinks = [
        ["Related Resources", "relatedResources", relatedResources],
        ["Related Stories", "relatedStories", relatedStories],
        ["External Resources", "externalResources", externalResources],
    ];
    const [currentRelatedLink, setCurrentRelatedLink] = useState(null);
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
                        type="url"
                        width={"full"}
                        _valid={{ outline: "red" }}
                        size={"lg"}
                        isRequired
                        onChange={(e) =>
                            onChangeInput(toolId, e.target.value, "thumbnail")
                        }
                        value={thumbnail}
                        placeholder="URL"
                        isTruncated
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
            <Grid templateColumns="repeat(3, 1fr)" gap={6} width={"full"}>
                {(relatedLinks ?? []).map((link, idx) => (
                    <GridItem minWidth={0} key={link + "gridItem"}>
                        <Wrap key={link + "wrap"}>
                            <FormLabel
                                fontSize={20}
                                fontWeight={"bold"}
                                mb={"5"}
                                key={link + "formLabel"}
                            >
                                {link[0]}
                            </FormLabel>
                            {(link ?? []).map((choice, index) => (
                                <>
                                    <WrapItem
                                        width={"full"}
                                        key={link + choice + index + "wrapitem"}
                                    >
                                        <Text
                                            color="blue.400"
                                            isTruncated
                                            key={
                                                link + choice + index + "input"
                                            }
                                            _hover={{ cursor: "pointer" }}
                                            onClick={() => {
                                                setCurrentRelatedLink(link);
                                                setModalIndex(index);
                                                setOpenModal(true);
                                            }}
                                        >
                                            {`${
                                                link[2][index][0] != ""
                                                    ? link[2][index][0]
                                                    : "+ Add Link"
                                            }`}
                                        </Text>
                                        <Spacer
                                            key={
                                                link + choice + index + "spacer"
                                            }
                                        ></Spacer>
                                        <CloseButton
                                            key={
                                                link + choice + index + "close"
                                            }
                                            mt={-1}
                                            onClick={() => {
                                                onChangeInput(
                                                    toolId,
                                                    "",
                                                    link[1],
                                                    index,
                                                    0,
                                                );
                                                onChangeInput(
                                                    toolId,
                                                    "",
                                                    link[1],
                                                    index,
                                                    1,
                                                );
                                            }}
                                        />
                                    </WrapItem>
                                    <Modal
                                        onClose={() => {
                                            setOpenModal(false);
                                        }}
                                        closeOnOverlayClick={true}
                                        key={link + choice + index + "modal"}
                                        blockScrollOnMount={false}
                                        isOpen={openModal}
                                        motionPreset="slideInBottom"
                                    >
                                        <ModalOverlay
                                            onClick={() => {
                                                console.log("close");
                                                setOpenModal(false);
                                            }}
                                            key={
                                                link +
                                                choice +
                                                index +
                                                "modalOverlay"
                                            }
                                        />
                                        <ModalContent
                                            p={"5"}
                                            key={
                                                link +
                                                choice +
                                                index +
                                                "modalContent"
                                            }
                                        >
                                            <ModalHeader
                                                key={
                                                    link +
                                                    choice +
                                                    index +
                                                    "modalHeader"
                                                }
                                                fontWeight={"bold"}
                                                fontSize={30}
                                            >
                                                Add Link
                                            </ModalHeader>
                                            <ModalBody
                                                key={
                                                    link +
                                                    choice +
                                                    index +
                                                    "modalBody"
                                                }
                                            >
                                                <FormControl
                                                    isRequired
                                                    key={
                                                        link +
                                                        choice +
                                                        index +
                                                        "formControlText"
                                                    }
                                                >
                                                    <FormLabel
                                                        fontSize={20}
                                                        fontWeight={"bold"}
                                                        key={
                                                            link +
                                                            choice +
                                                            index +
                                                            "formLabelText"
                                                        }
                                                    >
                                                        Text
                                                    </FormLabel>
                                                    <Input
                                                        width={"full"}
                                                        size={"lg"}
                                                        id={
                                                            "linkText" +
                                                            index +
                                                            idx
                                                        }
                                                        key={
                                                            "linkText" +
                                                            index +
                                                            idx
                                                        }
                                                        placeholder="Text Here"
                                                        defaultValue={
                                                            currentRelatedLink
                                                                ? currentRelatedLink[2][
                                                                      modalIndex
                                                                  ][0] ?? ""
                                                                : ""
                                                        }
                                                        isTruncated
                                                    />
                                                </FormControl>
                                                <FormControl
                                                    isRequired
                                                    key={
                                                        link +
                                                        choice +
                                                        "formControlLink"
                                                    }
                                                >
                                                    <FormLabel
                                                        fontSize={20}
                                                        fontWeight={"bold"}
                                                        mt={10}
                                                        key={
                                                            link +
                                                            choice +
                                                            "formLabelLink"
                                                        }
                                                    >
                                                        Link
                                                    </FormLabel>
                                                    <Input
                                                        mb={10}
                                                        width={"full"}
                                                        size={"lg"}
                                                        id={
                                                            "linkLink" +
                                                            index +
                                                            idx
                                                        }
                                                        key={
                                                            "linkLink" +
                                                            index +
                                                            idx
                                                        }
                                                        placeholder="Link"
                                                        defaultValue={
                                                            currentRelatedLink
                                                                ? currentRelatedLink[2][
                                                                      modalIndex
                                                                  ][1] ?? ""
                                                                : ""
                                                        }
                                                        isTruncated
                                                    />
                                                </FormControl>
                                            </ModalBody>
                                            <ModalFooter
                                                key={
                                                    link +
                                                    choice +
                                                    "modalFooter"
                                                }
                                            >
                                                <Button
                                                    variant="outline"
                                                    colorScheme="black"
                                                    mr={"3"}
                                                    w={100}
                                                    onClick={() =>
                                                        setOpenModal(false)
                                                    }
                                                    key={
                                                        link + choice + "cancel"
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    key={link + choice + "save"}
                                                    onClick={() => {
                                                        setOpenModal(false);
                                                        onChangeInput(
                                                            toolId,
                                                            document.getElementById(
                                                                "linkText" +
                                                                    index +
                                                                    idx,
                                                            ).value,
                                                            currentRelatedLink[1],
                                                            modalIndex,
                                                            0,
                                                        );
                                                        onChangeInput(
                                                            toolId,
                                                            document.getElementById(
                                                                "linkLink" +
                                                                    index +
                                                                    idx,
                                                            ).value,
                                                            currentRelatedLink[1],
                                                            modalIndex,
                                                            1,
                                                        );
                                                    }}
                                                    w={100}
                                                    background="black"
                                                    _active={{
                                                        transform:
                                                            "scale(0.95)",
                                                    }}
                                                >
                                                    Save
                                                </Button>
                                            </ModalFooter>
                                        </ModalContent>
                                    </Modal>
                                </>
                            ))}
                        </Wrap>
                    </GridItem>
                ))}
            </Grid>
            <WrapItem width={"50%"}>
                <FormControl isRequired>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        Select Recommended Tools
                    </FormLabel>
                    {(recommendedTools ?? []).map((choice, index) => (
                        <Select
                            key={choice + index + "option"}
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
                            ).map((selection, idx) => (
                                <option
                                    key={
                                        choice +
                                        selection +
                                        index +
                                        idx +
                                        "option"
                                    }
                                    value={choice}
                                >
                                    {choice}
                                </option>
                            ))}
                        </Select>
                    ))}
                </FormControl>
            </WrapItem>
        </Wrap>
    );
};
