import {
    Flex,
    Button,
    Spacer,
    Stack,
    Box,
    Heading,
    HStack,
    Editable,
    EditablePreview,
    EditableInput,
} from "@chakra-ui/react";
import Link from "next/link";
import { Dispatch } from "react";
import {
    INITIAL_STATE,
    ModuleAction,
    ModuleState,
    ModuleActionType,
} from "pages/admin/dashboard/builder";

const Header = ({
    dispatch,
    state,
    handleSaveModule,
    handleDiscardModule,
}: {
    dispatch: Dispatch<ModuleAction>;
    state: ModuleState;
    handleSaveModule: () => void;
    handleDiscardModule: () => void;
}): React.ReactElement => {
    const handleNullTitleErrors = (e) => {
        const target = e.target as HTMLInputElement;
        if (target.value === "") {
            dispatch({
                type: ModuleActionType.CHANGE_TITLE,
                value: INITIAL_STATE.title,
            });
        }
    };

    return (
        <Stack spacing={2} p={6}>
            <Box>
                <Link href="modules">
                    <Button variant="link">{"<"} Exit Builder</Button>
                </Link>
            </Box>
            <Flex>
                <Heading>
                    <Editable
                        defaultValue={INITIAL_STATE.title}
                        value={state.title}
                        onChange={(title) =>
                            dispatch({
                                type: ModuleActionType.CHANGE_TITLE,
                                value: title,
                            })
                        }
                        onBlur={(e) => {
                            handleNullTitleErrors(e);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleNullTitleErrors(e);
                            }
                        }}
                        width={350}
                    >
                        <EditablePreview />
                        <EditableInput />
                    </Editable>
                </Heading>
                <Spacer />
                <HStack spacing={2}>
                    <Button
                        variant="outline"
                        onClick={() => {
                            handleDiscardModule();
                        }}
                    >
                        Discard
                    </Button>
                    <Button
                        onClick={() => {
                            handleSaveModule();
                        }}
                        isDisabled={state.title === ""}
                    >
                        Save
                    </Button>
                </HStack>
            </Flex>
        </Stack>
    );
};

export default Header;
