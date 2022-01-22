import {
    Button,
    ButtonGroup,
    Editable,
    EditableInput,
    EditablePreview,
    Flex,
    HStack,
    IconButton,
    Spacer,
    Text,
} from "@chakra-ui/react";
import {
    ModuleAction,
    ModuleState,
    ModuleActionType,
} from "pages/admin/dashboard/builder";
import { Dispatch } from "react";
import {
    IoIosRedo,
    IoIosUndo,
    IoMdArrowBack,
    IoMdArrowForward,
} from "react-icons/io";
import { IoTrash } from "react-icons/io5";

const UNDO_ENABLED = false;

const Toolbar = ({
    dispatch,
    state,
}: {
    dispatch: Dispatch<ModuleAction>;
    state: ModuleState;
}): React.ReactElement => {
    const handleEditableErrors = (e) => {
        const target = e.target as HTMLInputElement;
        if (
            !isNaN(parseInt(target.value)) &&
            parseInt(target.value) >= 1 &&
            parseInt(target.value) <= state.slides.length
        ) {
            dispatch({
                type: ModuleActionType.SET_SLIDE,
                index: parseInt(target.value) - 1 || 0,
            });
        } else {
            dispatch({
                type: ModuleActionType.SET_SLIDE,
                index: 0,
            });
        }
    };

    return (
        <Flex
            px={2}
            py={4}
            alignItems="center"
            border="1px"
            borderColor="black"
        >
            <Button
                onClick={() => {
                    dispatch({ type: ModuleActionType.ADD_SLIDE });
                }}
            >
                New Slide
            </Button>
            <Spacer />
            <HStack spacing={2}>
                <IconButton
                    variant="ghost"
                    aria-label="previous slide"
                    icon={<IoMdArrowBack />}
                    onClick={() =>
                        dispatch({
                            type: ModuleActionType.SET_SLIDE,
                            index: Math.max(state.currentSlide - 1, 0),
                        })
                    }
                />
                <Editable
                    defaultValue="1"
                    value={(state.currentSlide + 1).toString()}
                    onChange={(nextValue) => {
                        dispatch({
                            type: ModuleActionType.SET_SLIDE,
                            index: parseInt(nextValue) - 1 || 0,
                        });
                    }}
                    onBlur={handleEditableErrors}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleEditableErrors(e);
                        }
                    }}
                    width={8}
                    textAlign="center"
                    type="number"
                >
                    <EditablePreview />
                    <EditableInput />
                </Editable>
                <Text> / &nbsp; &nbsp; {state.slides.length} Slides</Text>
                <IconButton
                    variant="ghost"
                    aria-label="previous slide"
                    onClick={() =>
                        dispatch({
                            type: ModuleActionType.SET_SLIDE,
                            index: Math.min(
                                state.currentSlide + 1,
                                state.slides.length - 1,
                            ),
                        })
                    }
                    icon={<IoMdArrowForward />}
                />
            </HStack>
            <Spacer />
            <ButtonGroup variant="ghost">
                {/* TODO: Add functionality to these buttons */}
                {UNDO_ENABLED && (
                    <>
                        <IconButton aria-label="undo" icon={<IoIosUndo />} />
                        <IconButton aria-label="redo" icon={<IoIosRedo />} />
                    </>
                )}
                <IconButton
                    aria-label="trash"
                    icon={<IoTrash />}
                    onClick={() => {
                        dispatch({
                            type: ModuleActionType.REMOVE_SLIDE,
                            index: state.currentSlide,
                        });
                    }}
                />
            </ButtonGroup>
        </Flex>
    );
};

export default Toolbar;
