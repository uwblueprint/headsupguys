import React from "react";
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

export interface ModuleSectionSelectProps {
    slide: {
        checkpoint: boolean;
        progressBarEnabled: boolean;
        buttons: {
            save: boolean;
            print: boolean;
            previous: boolean;
            next: boolean;
        };
        sections: {
            type: string; //markdown, mc, ms, sa
            padding: {
                top: number;
                right: number;
                bottom: number;
                left: number;
            };
            markdown?: string; //stores markdown content, only applies to md component
            alignment?: string; //on frontend this will be a dropdown
        }[];
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSlide: React.SetStateAction<any>; // TYPE IS SLIDE RIGHT ABOVE
    slideNumber: number;
}

export const ModuleSectionSelect: React.FC<ModuleSectionSelectProps> = (
    props,
) => {
    const { slide, setSlide, slideNumber } = props;

    const paddingMap = {
        T: "top",
        R: "right",
        B: "bottom",
        L: "left",
    };

    const handleSelect = (e) => {
        slide.sections[slideNumber].type = e.currentTarget.value;
        setSlide(_.cloneDeep(slide));
    };

    const handleMarkdownChange = (text) => {
        console.log("markdownchange");
        slide.sections[slideNumber].markdown = text;
        console.log("slide", slide);
        setSlide(_.cloneDeep(slide));
    };

    const handlePaddingChange = (padVal) => {
        slide.sections[slideNumber].padding[paddingMap[padVal]];
        setSlide(_.cloneDeep(slide));
    };

    return (
        <Box>
            <Heading size="lg">Section {slideNumber + 1}</Heading>
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
            {slide.sections[slideNumber].type == "staticContent" ? (
                <Stack spacing={2}>
                    <MarkdownEditor
                        value={slide.sections[slideNumber].markdown || ""}
                        setValue={handleMarkdownChange}
                    />
                    <HStack spacing={10}>
                        <Heading size="sm">Padding&nbsp;(%)</Heading>
                        {["T", "R", "B", "L"].map((padVal) => (
                            <HStack>
                                <Text>{padVal}&nbsp;</Text>
                                <Input
                                    onChange={() => handlePaddingChange(padVal)}
                                    placeholder="0%"
                                />
                            </HStack>
                        ))}
                    </HStack>
                </Stack>
            ) : slide.sections[slideNumber].type == "multipleChoice" ? (
                "<MultipleChoice />"
            ) : slide.sections[slideNumber].type == "multiSelect" ? (
                "<MultiSelect />"
            ) : slide.sections[slideNumber].type == "shortAnswer" ? (
                "<ShortAnswer />"
            ) : (
                <></>
            )}
        </Box>
    );
};
