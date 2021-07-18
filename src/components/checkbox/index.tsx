import React, { FunctionComponent } from "react";
import { Checkbox, CheckboxProps, Text, Stack } from "@chakra-ui/react";

interface Props extends CheckboxProps {
    text?: string;
    isRequired?: boolean;
}

export const CheckboxComp: FunctionComponent<Props> = ({
    text,
    isRequired,
    isChecked,
    isDisabled,
    onChange,
    mb,
    ...rest
}) => {
    return (
        <>
            <Stack spacing={1} direction="row" mb={mb}>
                <Checkbox
                    borderColor="black"
                    borderEndColor="black"
                    isChecked={isChecked}
                    isDisabled={isDisabled}
                    iconColor="black"
                    colorScheme="whiteAlpha"
                    onChange={(e) => onChange(e)}
                    isRequired={isRequired}
                    mr={3}
                    {...rest}
                />
                <Text as="span">
                    {isRequired ? (
                        <Text color="red.500" as="span">
                            *{" "}
                        </Text>
                    ) : null}
                    {text}
                </Text>
            </Stack>
        </>
    );
};
