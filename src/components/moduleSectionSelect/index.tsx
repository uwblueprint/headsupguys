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

export interface ISlide {
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
}
export interface ModuleSectionSelectProps {
    slide: ISlide;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSlide: React.Dispatch<React.SetStateAction<ISlide>>; // TYPE IS SLIDE RIGHT ABOVE
    sectionNumber: number;
}

export const ModuleSectionSelect: React.FC<ModuleSectionSelectProps> = (
    props,
) => {
    const { slide, setSlide, sectionNumber } = props;

    const paddingMap = {
        T: "top",
        R: "right",
        B: "bottom",
        L: "left",
    };

    const handleSelect = (e) => {
        const newSlide = _.cloneDeep(slide);
        newSlide.sections[sectionNumber].type = e.currentTarget.value;
        setSlide(newSlide);
    };

    const handleMarkdownChange = (text) => {
        const newSlide = _.cloneDeep(slide);
        newSlide.sections[sectionNumber].markdown = text;

        setSlide(newSlide);
    };

    const handlePaddingChange = (padVal) => {
        const newSlide = _.cloneDeep(slide);
        newSlide.sections[sectionNumber].padding[paddingMap[padVal]];
        setSlide(newSlide);
    };

    return (
        <Box>
            <Heading size="lg">Section {sectionNumber + 1}</Heading>
            <br />
            <Heading size="md">Select Content Type</Heading>
            <Select
                w="368px"
                my={3}
                value={slide.sections[sectionNumber].type}
                placeholder="Select Option"
                onChange={handleSelect}
            >
                <option value="staticContent">Text / Image / Video</option>
                <option value="multipleChoice">Multiple Choice</option>
                <option value="multiSelect">Multiselect</option>
                <option value="shortAnswer">Short Answer</option>
            </Select>
            {slide.sections[sectionNumber].type == "staticContent" ? (
                <Stack spacing={2}>
                    <MarkdownEditor
                        value={slide.sections[sectionNumber].markdown || ""}
                        setValue={handleMarkdownChange}
                    />
                    <HStack spacing={10}>
                        <Heading size="sm">Padding&nbsp;(%)</Heading>
                        {["T", "R", "B", "L"].map((padVal) => (
                            <HStack key={padVal}>
                                <Text>{padVal}&nbsp;</Text>
                                <Input
                                    onChange={() => handlePaddingChange(padVal)}
                                    placeholder="0%"
                                />
                            </HStack>
                        ))}
                    </HStack>
                </Stack>
            ) : slide.sections[sectionNumber].type == "multipleChoice" ? (
                "<MultipleChoice />"
            ) : slide.sections[sectionNumber].type == "multiSelect" ? (
                "<MultiSelect />"
            ) : slide.sections[sectionNumber].type == "shortAnswer" ? (
                "<ShortAnswer />"
            ) : (
                <></>
            )}
        </Box>
    );
};
