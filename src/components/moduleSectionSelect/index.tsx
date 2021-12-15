import React, { ChangeEvent } from "react";
import {
    Box,
    HStack,
    Stack,
    Heading,
    Text,
    Select,
    Input,
} from "@chakra-ui/react";
import _ from "lodash";
import { MarkdownEditor } from "@components";
import { Section, Slide } from "pages/admin/dashboard/builder";

export interface ModuleSectionSelectProps {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    section: Section;
    setSection: (s: Section) => void; // TYPE IS SLIDE RIGHT ABOVE
    sectionNumber: number;
}

export const ModuleSectionSelect: React.FC<ModuleSectionSelectProps> = (
    props,
) => {
    const { section, setSection, sectionNumber } = props;

    const paddingMap = {
        T: "top",
        R: "right",
        B: "bottom",
        L: "left",
    };

    const handleSelect = (e) => {
        setSection({ ...section, type: e.currentTarget.value });
    };

    const handleMarkdownChange = (text) => {
        setSection({ ...section, markdown: text });
    };

    const handlePaddingChange = (newPadding) => {
        console.log({
            ...section,
            padding: { ...section.padding, ...newPadding },
        });
        setSection({
            ...section,
            padding: { ...section.padding, ...newPadding },
        });
    };
    const { type, markdown } = section;
    return (
        <Box>
            <Heading size="lg">Section {sectionNumber + 1}</Heading>
            <br />
            <Heading size="md">Select Content Type</Heading>
            <Select
                w="368px"
                my={3}
                value={type}
                placeholder="Select Option"
                onChange={handleSelect}
            >
                <option value="staticContent">Text / Image / Video</option>
                <option value="multipleChoice">Multiple Choice</option>
                <option value="multiSelect">Multiselect</option>
                <option value="shortAnswer">Short Answer</option>
            </Select>
            {section.type == "staticContent" ? (
                <Stack spacing={2}>
                    <MarkdownEditor
                        value={markdown || ""}
                        setValue={handleMarkdownChange}
                    />
                    <HStack spacing={10}>
                        <Heading size="sm">Padding&nbsp;(%)</Heading>
                        {Object.entries(section.padding).map(
                            ([direction, value]) => (
                                <HStack key={direction}>
                                    <Text>{direction}&nbsp;</Text>
                                    <Input
                                        value={value}
                                        onChange={(
                                            e: ChangeEvent<HTMLInputElement>,
                                        ) =>
                                            handlePaddingChange({
                                                [direction]: parseInt(
                                                    e.target.value,
                                                ),
                                            })
                                        }
                                        placeholder={"0"}
                                    />
                                </HStack>
                            ),
                        )}
                    </HStack>
                </Stack>
            ) : type == "multipleChoice" ? (
                "<MultipleChoice />"
            ) : type == "multiSelect" ? (
                "<MultiSelect />"
            ) : type == "shortAnswer" ? (
                "<ShortAnswer />"
            ) : (
                <></>
            )}
        </Box>
    );
};
