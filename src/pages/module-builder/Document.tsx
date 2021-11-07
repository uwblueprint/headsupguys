import { Box, ButtonGroup, Flex, IconButton, VStack } from "@chakra-ui/react";
import { MarkdownRenderer, ModulePreview } from "@components";
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
                        (state.currentSlide / state.slides.length) * 100
                    }
                    variant={""}
                >
                    <MarkdownRenderer>
                        {state.slides[state.currentSlide].sections.reduce(
                            (prev, cur) => prev + "\n" + cur.markdown,
                            "",
                        )}
                    </MarkdownRenderer>
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