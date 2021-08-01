import React from "react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Select,
    SelectProps,
} from "@chakra-ui/react";
import { WarningIcon } from "@chakra-ui/icons";

export interface DropDownProps extends SelectProps {
    name: string;
    label?: string;
    placeholder?: string;
    errorMessage?: string;
    helperText?: string;
    isInvalid?: boolean;
}

export const DropDown: React.FC<DropDownProps> = ({
    name,
    label,
    placeholder,
    errorMessage,
    helperText,
    isInvalid,
    ...rest
}) => {
    return (
        <FormControl id={name} isInvalid={isInvalid} mb={5}>
            <FormLabel
                fontWeight={400}
                color={isInvalid ? "red.500" : "blackAlpha"}
            >
                {label}
            </FormLabel>
            <Select
                placeholder={placeholder}
                errorBorderColor="red.600"
                {...rest}
            />
            {errorMessage && (
                <FormErrorMessage>
                    <WarningIcon mr={2} /> {errorMessage}
                </FormErrorMessage>
            )}
            {helperText && !isInvalid && (
                <FormHelperText>{helperText}</FormHelperText>
            )}
        </FormControl>
    );
};
