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
import { MarkdownEditor, MultipleChoice } from "@components";
import { Slide } from "pages/admin/dashboard/builder";

export interface ModuleSectionSelectProps {
    slide: Slide;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSlide: (s: Slide) => void; // TYPE IS SLIDE RIGHT ABOVE
    sectionNumber: number;
    saveInputData: boolean;
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

    const handleMultipleChoiceQuestionChange = (newQuestion) => {
        const newSlide = _.cloneDeep(slide);
        newSlide.sections[sectionNumber].multipleChoice.question = newQuestion;
        setSlide(newSlide);
    };

    const handleMultipleChoiceOptionsChange = (newOptions) => {
        const newSlide = _.cloneDeep(slide);
        newSlide.sections[sectionNumber].multipleChoice.options = newOptions;
        setSlide(newSlide);
    };

    const handlePaddingChange = (padVal) => {
        const newSlide = _.cloneDeep(slide);
        newSlide.sections[sectionNumber].padding[paddingMap[padVal]];
        setSlide(newSlide);
    };

    console.log(slide.sections[sectionNumber]);
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
            <Stack spacing={2}>
                {slide.sections[sectionNumber].type == "staticContent" ? (
                    <MarkdownEditor
                        value={slide.sections[sectionNumber].markdown || ""}
                        setValue={handleMarkdownChange}
                    />
                ) : slide.sections[sectionNumber].type == "multipleChoice" ? (
                    <MultipleChoice
                        question={
                            slide.sections[sectionNumber].multipleChoice
                                ? slide.sections[sectionNumber].multipleChoice
                                      .question
                                : ""
                        }
                        setQuestion={handleMultipleChoiceQuestionChange}
                        options={
                            slide.sections[sectionNumber].multipleChoice
                                ? slide.sections[sectionNumber].multipleChoice
                                      .options
                                : [""]
                        }
                        setOptions={handleMultipleChoiceOptionsChange}
                        saveInputData={props.saveInputData}
                    />
                ) : slide.sections[sectionNumber].type == "multiSelect" ? (
                    "<MultiSelect />"
                ) : slide.sections[sectionNumber].type == "shortAnswer" ? (
                    "<ShortAnswer />"
                ) : (
                    <></>
                )}
                {slide.sections[sectionNumber].type && (
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
                )}
            </Stack>
        </Box>
    );
};
