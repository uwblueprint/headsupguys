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
import { ModuleState } from "pages/admin/dashboard/builder";
import { Dispatch } from "react";
import { IoIosRedo, IoIosUndo } from "react-icons/io";
import { IoTrash } from "react-icons/io5";

const Toolbar = ({
    dispatch,
    state,
}: {
    dispatch: Dispatch<{ type: string; value?: unknown }>;
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
                type: "setSlide",
                value: parseInt(target.value) - 1 || 0,
            });
        } else {
            dispatch({
                type: "setSlide",
                value: 0,
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
                    dispatch({ type: "addSlide" });
                }}
            >
                New Slide
            </Button>
            <Spacer />
            <HStack spacing={2}>
                <Editable
                    defaultValue="1"
                    value={(state.currentSlide + 1).toString()}
                    onChange={(nextValue) => {
                        dispatch({
                            type: "setSlide",
                            value: parseInt(nextValue) - 1 || 0,
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
                <Text>/ {state.slides.length} Slides</Text>
            </HStack>
            <Spacer />
            <ButtonGroup variant="ghost">
                {/* TODO: Add functionality to these buttons */}
                <IconButton aria-label="undo" icon={<IoIosUndo />} />
                <IconButton aria-label="redo" icon={<IoIosRedo />} />
                <IconButton aria-label="trash" icon={<IoTrash />} />
            </ButtonGroup>
        </Flex>
    );
};

export default Toolbar;
