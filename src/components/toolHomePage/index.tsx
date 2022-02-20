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

export interface ToolHomePageProps {
    toolId: string;
    title: string;
    type: string;
    video: string;
    thumbnail: string;
    description: string;
    linkedModuleID: string;
    relatedResources: string[][];
    relatedStories: string[][];
    externalResources: string[][];
    relatedToolsIDs: string[];
    allModules: Record<string, string>[];
    allTools: string[][];
    onChangeInput: (
        target: string | string[],
        type: string,
        index1?: number,
        index2?: number,
    ) => void;
}

//Self check question card component
export const ToolHomePage: React.FC<ToolHomePageProps> = ({
    toolId,
    title,
    type,
    video,
    thumbnail,
    description,
    linkedModuleID,
    relatedResources,
    relatedStories,
    externalResources,
    relatedToolsIDs,
    allModules,
    allTools,
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
                        onChange={(e) => onChangeInput(e.target.value, "title")}
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
                        onChange={(e) => onChangeInput(e.target.value, "type")}
                    >
                        <option>Problem</option>
                        <option>Skill</option>
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
                        onChange={(e) => {
                            onChangeInput(e.target.value, "thumbnail");
                        }}
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
                        onChange={(e) => {
                            onChangeInput(e.target.value, "description");
                        }}
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
                        value={linkedModuleID}
                        onChange={(e) => {
                            onChangeInput(e.target.value, "linkedModuleID");
                        }}
                    >
                        {allModules
                            .filter(({ toolID, _id }) => {
                                return toolID == null || _id == linkedModuleID;
                            })
                            .map(({ _id, title }) => (
                                <option key={_id} value={_id}>
                                    {title}
                                </option>
                            ))}
                    </Select>
                </FormControl>
                <FormControl>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        Video Link
                    </FormLabel>
                    <Input
                        type="url"
                        width={"full"}
                        _valid={{ outline: "red" }}
                        size={"lg"}
                        isRequired
                        onChange={(e) => onChangeInput(e.target.value, "video")}
                        value={video}
                        placeholder="URL"
                        isTruncated
                    />
                </FormControl>
            </WrapItem>
            <Grid templateColumns="repeat(3, 1fr)" gap={6} width={"full"}>
                {(relatedLinks ?? []).map((link, idx) => (
                    <GridItem minWidth={0} key={link + idx.toString()}>
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
                                <Box
                                    width={"full"}
                                    key={choice + link.toString()}
                                >
                                    <WrapItem>
                                        <Text
                                            color="blue.400"
                                            isTruncated
                                            textDecoration={
                                                link[2][index][0] != ""
                                                    ? "underline"
                                                    : "default"
                                            }
                                            cursor="pointer"
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
                                        <Spacer></Spacer>
                                        <CloseButton
                                            mt={"-5px"}
                                            onClick={() => {
                                                onChangeInput(
                                                    ["", ""],
                                                    String(link[1]),
                                                    index,
                                                );
                                            }}
                                        />
                                    </WrapItem>
                                    <Modal
                                        onClose={() => {
                                            setOpenModal(false);
                                        }}
                                        closeOnOverlayClick={true}
                                        blockScrollOnMount={false}
                                        isOpen={openModal}
                                        motionPreset="slideInBottom"
                                    >
                                        <ModalOverlay
                                            opacity={"1"}
                                            color={"red"}
                                        />
                                        <ModalContent p={"5"}>
                                            <ModalHeader
                                                fontWeight={"bold"}
                                                fontSize={30}
                                            >
                                                Add Link
                                            </ModalHeader>
                                            <ModalBody>
                                                <FormControl isRequired>
                                                    <FormLabel
                                                        fontSize={20}
                                                        fontWeight={"bold"}
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
                                                <FormControl isRequired>
                                                    <FormLabel
                                                        fontSize={20}
                                                        fontWeight={"bold"}
                                                        mt={10}
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
                                            <ModalFooter>
                                                <Button
                                                    variant="outline"
                                                    colorScheme="black"
                                                    mr={"3"}
                                                    w={100}
                                                    onClick={() =>
                                                        setOpenModal(false)
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        setOpenModal(false);
                                                        onChangeInput(
                                                            [
                                                                (
                                                                    document.getElementById(
                                                                        "linkText" +
                                                                            index +
                                                                            idx,
                                                                    ) as HTMLInputElement
                                                                ).value,
                                                                (
                                                                    document.getElementById(
                                                                        "linkLink" +
                                                                            index +
                                                                            idx,
                                                                    ) as HTMLInputElement
                                                                ).value,
                                                            ],
                                                            currentRelatedLink[1],
                                                            modalIndex,
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
                                </Box>
                            ))}
                        </Wrap>
                    </GridItem>
                ))}
            </Grid>
            <WrapItem width={"50%"}>
                <FormControl>
                    <FormLabel fontSize={20} fontWeight={"bold"}>
                        Select Related Tools
                    </FormLabel>
                    {(relatedToolsIDs ?? []).map((choice, index) => (
                        <Select
                            key={choice + index}
                            placeholder={"Select option"}
                            mb={"3"}
                            value={relatedToolsIDs[index]}
                            onChange={(e) =>
                                onChangeInput(
                                    e.target.value,
                                    "relatedToolsIDs",
                                    index,
                                )
                            }
                        >
                            {(
                                allTools[0].filter((id) => {
                                    return (
                                        !relatedToolsIDs
                                            .filter((item) => {
                                                return (
                                                    relatedToolsIDs.indexOf(
                                                        item,
                                                    ) != index
                                                );
                                            })
                                            .includes(id) && id != toolId
                                    );
                                }) ?? []
                            ).map((selection) => (
                                <option
                                    key={choice + selection}
                                    value={selection}
                                >
                                    {
                                        allTools[1][
                                            allTools[0].indexOf(selection)
                                        ]
                                    }
                                </option>
                            ))}
                        </Select>
                    ))}
                </FormControl>
            </WrapItem>
        </Wrap>
    );
};
