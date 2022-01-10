import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Error from "next/error";
import { Page } from "types/Page";
import axios from "axios";
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

const Tool: Page = () => {
    const router = useRouter();
    const { tool } = router.query;
    const [toolData, setToolData] = useState([]);
    const [relatedLinks, setRelatedLinks] = useState([]);
    const [toolExists, setToolExists] = useState(false);
    useEffect(async () => {
        try {
            const existingTools = await axios({
                method: "GET",
                url: `/api/tool/${tool}`,
            });
            setToolData(existingTools.data);
            setRelatedLinks([
                [
                    "Related Resources",
                    "relatedResources",
                    existingTools.data.relatedResources,
                ],
                [
                    "Related Stories",
                    "relatedStories",
                    existingTools.data.relatedStories,
                ],
                [
                    "External Resources",
                    "externalResources",
                    existingTools.data.externalResources,
                ],
            ]);
            console.log(existingTools);
            setToolExists(true);

            // for (const existingTool in existingTools) {
            //     if (existingTool === tool) {
            //         return false;
            //     }
            // }

            return true;
        } catch (err) {
            console.log(err);
        }
    }, [tool]);

    return (
        <div>
            <p>TOOL NAME:{toolExists ? toolData.title : null}</p>
            <p>TOOL DESC:{toolExists ? toolData.description : null}</p>
            <Wrap spacing="30px">
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
                                        border="10px"
                                        borderColor="gray.200"
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
                                                _hover={{
                                                    cursor: "pointer",
                                                }}
                                                // onClick={() => {
                                                //     setCurrentRelatedLink(link);
                                                //     setModalIndex(index);
                                                //     setOpenModal(true);
                                                // }}
                                            >
                                                {`${
                                                    link[2][index][0] != ""
                                                        ? link[2][index][0]
                                                        : "+ Add Link"
                                                }`}
                                            </Text>
                                            <Spacer></Spacer>
                                            {/* <CloseButton
                                                mt={"-5px"}
                                                // onClick={() => {
                                                //     onChangeInput(
                                                //         ["", ""],
                                                //         String(link[1]),
                                                //         index,
                                                //     );
                                                // }}
                                            /> */}
                                        </WrapItem>
                                    </Box>
                                ))}
                            </Wrap>
                        </GridItem>
                    ))}
                </Grid>
            </Wrap>
            {/* <Document
                    state={state}
                    isSidebarOpen={true}
                    sidebarOpen={true}
                    // sidebarClose={sidebarClose}
                /> */}
        </div>
    );
};

export default Tool;
