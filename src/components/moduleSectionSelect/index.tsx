import React, { useState } from "react";
import { Box, Heading, Select } from "@chakra-ui/react";
import { MarkdownEditor } from "@components";

export interface ModuleSectionSelectProps {
    sectionNumber: number;
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
                <MarkdownEditor value={editorText} setValue={setEditorText} />
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
