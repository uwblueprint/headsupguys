import {
    Box,
    Button,
    Container,
    Divider,
    Flex,
    Spacer,
    Stack,
} from "@chakra-ui/react";
import { CheckboxComp, ModuleSectionSelect } from "@components";
import { ModuleState } from "pages/admin/dashboard/builder";
import React, { Dispatch } from "react";

const Editor = ({
    dispatch,
    state,
    isSidebarOpen,
    toggleSidebar,
}: {
    dispatch: Dispatch<{ type: string; payload?: unknown; index?: unknown }>;
    state: ModuleState;
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}): React.ReactElement => {
    return (
        <Box
            w={isSidebarOpen ? "60%" : "5%"}
            overflow="auto"
            transition="all 0.25s"
        >
            <Flex bg={isSidebarOpen ? "black" : "white"}>
                <Spacer />
                <Button
                    variant={isSidebarOpen ? "solid" : "ghost"}
                    colorScheme="blackAlpha"
                    onClick={toggleSidebar}
                >
                    {isSidebarOpen ? "<<" : ">>"}
                </Button>
            </Flex>
            {isSidebarOpen && (
                <Box>
                    <Container maxW="70%" py={4}>
                        {state.slides[state.currentSlide].sections.map(
                            (_, idx) => (
                                <React.Fragment
                                    key={`${state.currentSlide}:${idx}`}
                                >
                                    {idx > 0 ? (
                                        <Box marginTop="5%" marginBottom="5%">
                                            <Divider />
                                        </Box>
                                    ) : null}
                                    <ModuleSectionSelect
                                        slide={state.slides[state.currentSlide]}
                                        sectionNumber={idx}
                                        setSlide={(slide) => {
                                            dispatch({
                                                type: "updateSlide",
                                                index: state.currentSlide,
                                                payload: slide,
                                            });
                                        }}
                                    />
                                </React.Fragment>
                            ),
                        )}
                        <Button
                            onClick={() => {
                                dispatch({
                                    type: "newSection",
                                    index: state.currentSlide,
                                });
                            }}
                            colorScheme="black"
                            variant="outline"
                        >
                            + New Section
                        </Button>
                    </Container>

                    <Container>
                        <Stack spacing={10} direction="row">
                            {Object.entries(
                                state.slides[state.currentSlide].buttons,
                            ).map(([buttonKey, isChecked]) => (
                                <CheckboxComp
                                    key={`${state.currentSlide}:${buttonKey}`}
                                    text={buttonKey}
                                    isChecked={isChecked}
                                    onChange={(event) => {
                                        dispatch({
                                            type: "updateSlide",
                                            index: state.currentSlide,
                                            payload: {
                                                ...state.slides[
                                                    state.currentSlide
                                                ],
                                                buttons: {
                                                    ...state.slides[
                                                        state.currentSlide
                                                    ].buttons,
                                                    [buttonKey]:
                                                        event.target.checked,
                                                },
                                            },
                                        });
                                    }}
                                />
                            ))}
                        </Stack>
                    </Container>
                </Box>
            )}
        </Box>
    );
};

export default Editor;
