import React from "react";
import { Box, Stack, Text, Flex, Select, Heading } from "@chakra-ui/react";
import { Slide } from "pages/admin/dashboard/builder";

export interface UserResponseProps {
    slides: Slide[];
    setQuestion: (slideIdx: number, sectionIdx: number) => void;
}

export const UserResponse: React.FC<UserResponseProps> = ({
    slides,
    setQuestion,
}) => {
    const handleSelect = (e) => {
        const selectedQuestion = e.target.value.split(",");
        const slideIdx = Number(selectedQuestion[0]);
        const sectionIdx = Number(selectedQuestion[1]);
        setQuestion(slideIdx, sectionIdx);
    };

    return (
        <Stack spacing={2}>
            <Heading size="md">User Response (Variable)</Heading>
            <Select
                w="368px"
                my={3}
                placeholder="Select User Response"
                onChange={handleSelect}
            >
                {slides.map((slide, slideIndex) => {
                    return slide.sections.map((section, sectionIndex) => {
                        if (section.type == "multipleChoice") {
                            return (
                                <option
                                    key={slideIndex + sectionIndex}
                                    value={`${slideIndex},${sectionIndex}`}
                                >
                                    {`Slide ${slideIndex + 1} - Section ${
                                        sectionIndex + 1
                                    }: ${section.multipleChoice.question}`}
                                </option>
                            );
                        } else if (section.type == "multiSelect") {
                            return (
                                <option
                                    key={slideIndex + sectionIndex}
                                    value={`${slideIndex},${sectionIndex}`}
                                >
                                    {`Slide ${slideIndex + 1} - Section ${
                                        sectionIndex + 1
                                    }: ${section.multiSelect.question}`}
                                </option>
                            );
                        } else if (section.type == "shortAnswer") {
                            return (
                                <option
                                    key={slideIndex + sectionIndex}
                                    value={`${slideIndex},${sectionIndex}`}
                                >
                                    {`Slide ${slideIndex + 1} - Section ${
                                        sectionIndex + 1
                                    }: ${section.shortAnswer}`}
                                </option>
                            );
                        }
                    });
                })}
            </Select>
        </Stack>
    );
};

interface userResponsePreviewProps {
    slides: Slide[];
    slideIdx: number;
    sectionIdx: number;
}

export const UserResponsePreview: React.FC<userResponsePreviewProps> = ({
    slides,
    slideIdx,
    sectionIdx,
}) => {
    if (!isNaN(slideIdx) && !isNaN(sectionIdx)) {
        return (
            <Box>
                <Flex p={1}>
                    <Stack width={"full"} pb={5} alignItems={"flex-start"}>
                        <Text size="md">{`Slide ${slideIdx + 1} - Section ${
                            sectionIdx + 1
                        }`}</Text>
                        {slides[slideIdx].sections[sectionIdx].type ==
                        "multipleChoice" ? (
                            <Text>
                                {
                                    slides[slideIdx].sections[sectionIdx]
                                        .multipleChoice.question
                                }
                            </Text>
                        ) : slides[slideIdx].sections[sectionIdx].type ==
                          "multiSelect" ? (
                            <Text>
                                {
                                    slides[slideIdx].sections[sectionIdx]
                                        .multiSelect.question
                                }
                            </Text>
                        ) : slides[slideIdx].sections[sectionIdx].type ==
                          "shortAnswer" ? (
                            <Text>
                                {
                                    slides[slideIdx].sections[sectionIdx]
                                        .shortAnswer
                                }
                            </Text>
                        ) : (
                            <></>
                        )}
                    </Stack>
                </Flex>
            </Box>
        );
    } else {
        return null;
    }
};
