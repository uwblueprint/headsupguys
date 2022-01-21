import {
    Box,
    ButtonGroup,
    Container,
    Flex,
    IconButton,
    VStack,
} from "@chakra-ui/react";
import {
    MarkdownRenderer,
    ModulePreview,
    MultipleChoicePreview,
    MultiSelectPreview,
} from "@components";
import { ModuleState } from "pages/admin/dashboard/builder";
import React from "react";
import { FaMobileAlt } from "react-icons/fa";
import { IoDesktopOutline } from "react-icons/io5";

const Document = ({
    state,
    isSidebarOpen,
    sidebarOpen,
    sidebarClose,
}: {
    state: ModuleState;
    isSidebarOpen: boolean;
    sidebarOpen: () => void;
    sidebarClose: () => void;
}): React.ReactElement => {
    const modulePreviewVariant = isSidebarOpen ? "mobile" : "desktop";
    return (
        <VStack flex="1" bg="gray.200">
            <Box
                minH="80%"
                border="1px"
                borderColor="gray.700"
                boxShadow="md"
                overflow="auto"
                bg="white"
                mt={4}
                position="relative"
                align="center"
            >
                <ModulePreview
                    previous={
                        state.slides[state.currentSlide].buttons.previous
                            ? true
                            : false
                    }
                    next={
                        state.slides[state.currentSlide].buttons.next
                            ? true
                            : false
                    }
                    save={
                        state.slides[state.currentSlide].buttons.save
                            ? true
                            : false
                    }
                    print={
                        state.slides[state.currentSlide].buttons.print
                            ? true
                            : false
                    }
                    progressValue={
                        ((state.currentSlide + 1) / state.slides.length) * 100
                    }
                    variant={modulePreviewVariant}
                >
                    {state.slides[state.currentSlide].sections.map(
                        (section) => {
                            let sectionPreview;
                            if (section.type === "staticContent") {
                                sectionPreview = (
                                    <Container
                                        paddingTop={section.padding.top}
                                        paddingRight={section.padding.right}
                                        paddingBottom={section.padding.bottom}
                                        paddingLeft={section.padding.left}
                                    >
                                        <MarkdownRenderer>
                                            {section.markdown}
                                        </MarkdownRenderer>
                                    </Container>
                                );
                            } else if (section.type === "multipleChoice") {
                                sectionPreview = (
                                    <Container
                                        paddingTop={section.padding.top}
                                        paddingRight={section.padding.right}
                                        paddingBottom={section.padding.bottom}
                                        paddingLeft={section.padding.left}
                                    >
                                        <MultipleChoicePreview
                                            question={
                                                section.multipleChoice.question
                                            }
                                            options={
                                                section.multipleChoice.options
                                            }
                                            variant={modulePreviewVariant}
                                            columns={section.properties.columns}
                                        />
                                    </Container>
                                );
                            } else if (section.type === "multiSelect") {
                                sectionPreview = (
                                    <Container
                                        paddingTop={section.padding.top}
                                        paddingRight={section.padding.right}
                                        paddingBottom={section.padding.bottom}
                                        paddingLeft={section.padding.left}
                                    >
                                        <MultiSelectPreview
                                            question={
                                                section.multiSelect.question
                                            }
                                            options={
                                                section.multiSelect.options
                                            }
                                            variant={modulePreviewVariant}
                                            columns={section.properties.columns}
                                        />
                                    </Container>
                                );
                            }
                            return sectionPreview;
                        },
                        "",
                    )}
                </ModulePreview>
            </Box>
            <Box display="flex" w="80%" justifyContent="flex-end">
                <Flex>
                    <ButtonGroup spacing={0}>
                        <IconButton
                            color="black"
                            background={isSidebarOpen ? "gray.300" : "white"}
                            _hover={{ background: "gray.300" }}
                            borderColor="gray.300"
                            borderWidth="1px"
                            aria-label="mobile"
                            borderTopRightRadius="0px"
                            borderBottomRightRadius="0px"
                            icon={<FaMobileAlt />}
                            onClick={sidebarOpen}
                        />
                        <IconButton
                            color="black"
                            background={isSidebarOpen ? "white" : "gray.300"}
                            borderColor="gray.300"
                            borderWidth="1px"
                            _hover={{ background: "gray.300" }}
                            aria-label="desktop"
                            borderTopLeftRadius="0px"
                            borderBottomLeftRadius="0px"
                            icon={<IoDesktopOutline />}
                            onClick={sidebarClose}
                        />
                    </ButtonGroup>
                </Flex>
            </Box>
        </VStack>
    );
};

export default Document;
