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
import { Slide } from "pages/admin/dashboard/builder";

export interface ModuleSectionSelectProps {
    slide: Slide;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSlide: (s: Slide) => void; // TYPE IS SLIDE RIGHT ABOVE
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

    const handlePaddingChange = (padVal, val) => {
        const newSlide = _.cloneDeep(slide);
        newSlide.sections[sectionNumber].padding[paddingMap[padVal]] = val;
        setSlide(newSlide);
    };

    const isNumeric = (value) => {
        return /^\d+$/.test(value);
    };

    const validatePadding = (padVal) => {
        const paddingVal =
            slide.sections[sectionNumber].padding[paddingMap[padVal]];
        // set max padding to 90% for now
        if (
            (!isNumeric(paddingVal) && paddingVal != "") ||
            parseInt(paddingVal) > 90
        ) {
            handlePaddingChange(padVal, "0");
            console.log("invalid padding");
        }
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
                                    value={
                                        slide.sections[sectionNumber].padding[
                                            paddingMap[padVal]
                                        ] || ""
                                    }
                                    onChange={(e) =>
                                        handlePaddingChange(
                                            padVal,
                                            e.target.value,
                                        )
                                    }
                                    onBlur={() => validatePadding(padVal)}
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
