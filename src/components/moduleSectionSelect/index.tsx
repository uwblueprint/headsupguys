import React from "react";
import { Box, Heading, Select } from "@chakra-ui/react";
import { Button } from "..";

export interface ModuleSectionSelectProps {
    sectionNumber: number;
}

export const ModuleSectionSelect: React.FC<ModuleSectionSelectProps> = (
    props,
) => {
    const { sectionNumber, ...rest } = props;

    const styles = {};

    return (
        <Box>
            <Heading size="lg">Section {sectionNumber}</Heading>
            <br />
            <Heading size="md">Select Content Type</Heading>
            <Select w="368px" my={3} placeholder="Select Option">
                <option value="staticContent">Text / Image / Video</option>
                <option value="multipleChoice">Multiple Choice</option>
                <option value="multiSelect">Multiselect</option>
                <option value="shortAnswer">Short Answer</option>
            </Select>
        </Box>
    );
};
