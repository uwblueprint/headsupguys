import React, { useState } from "react";
import {
    Box,
    HStack,
    Grid,
    GridItem,
    Stack,
    Heading,
    Text,
    Select,
    Input,
} from "@chakra-ui/react";
import { MarkdownEditor } from "@components";

export interface ModuleSectionSelectProps {
    sectionNumber: number;
    editorText: string;
    setEditorText: React.Dispatch<React.SetStateAction<string>>;
}

export const ModuleSectionSelect: React.FC<ModuleSectionSelectProps> = (
    props,
) => {
    const { sectionNumber, editorText, setEditorText } = props;
    const [contentType, setContentType] = useState("");

    const handleSelect = (e) => {
        setContentType(e.currentTarget.value);
    };

    return (
        <Box>
            <Heading size="lg">Section {sectionNumber}</Heading>
            <br />
            <Heading size="md">Select Content Type</Heading>
            <Select
                w="368px"
                my={3}
                placeholder="Select Option"
                onChange={handleSelect}
            >
                <option value="staticContent">Text / Image / Video</option>
                <option value="multipleChoice">Multiple Choice</option>
                <option value="multiSelect">Multiselect</option>
                <option value="shortAnswer">Short Answer</option>
            </Select>
            {contentType == "staticContent" ? (
                <Stack spacing={2}>
                    <MarkdownEditor
                        value={editorText}
                        setValue={setEditorText}
                    />
                    <Grid templateColumns="repeat(6, 1fr)" gap={4}>
                        <GridItem colSpan={2}>
                            <Heading size="sm">Padding (%)</Heading>
                        </GridItem>
                        {["T", "R", "B", "L"].map((padding) => (
                            <HStack key={padding}>
                                <Text>{padding}&nbsp;</Text>
                                <Input width="50%" placeholder="0%" />
                            </HStack>
                        ))}
                    </Grid>
                </Stack>
            ) : contentType == "multipleChoice" ? (
                "<MultipleChoice />"
            ) : contentType == "multiSelect" ? (
                "<MultiSelect />"
            ) : contentType == "shortAnswer" ? (
                "<ShortAnswer />"
            ) : (
                <></>
            )}
        </Box>
    );
};
