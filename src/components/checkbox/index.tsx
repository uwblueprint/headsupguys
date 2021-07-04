import React, { FunctionComponent, CSSProperties } from "react";
import {
    Checkbox,
    CheckboxGroup,
    useProps,
    Text,
    Center,
    Stack,
} from "@chakra-ui/react";

interface Props {
    text?: string;
    value?: boolean;
    isDisabled?: boolean;
    required?: boolean;
    onChange(event: any): any;
}

export const CheckboxComp: FunctionComponent<Props> = (props: Props) => {
    const [checkedItem, setCheckedItem] = React.useState(props.value);

    return (
        <>
            <Stack spacing={1} direction="row">
                <Checkbox
                    borderColor="black"
                    borderEndColor="black"
                    isChecked={checkedItem}
                    isDisabled={props.isDisabled}
                    iconColor="black"
                    colorScheme="whiteAlpha"
                    onChange={(e) => props.onChange(e)}
                    isRequired={props.required}
                />
                {props.required ? <Text color="red.500">*</Text> : null}
                <Text>{props.text}</Text>
            </Stack>
        </>
    );
};
