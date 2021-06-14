import React, { useState } from "react";
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    Input,
    InputProps,
    InputGroup,
    InputRightElement,
    IconButton,
    FormHelperText,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, WarningIcon } from "@chakra-ui/icons";
export interface PasswordInputProps extends InputProps {
    name: string;
    label?: string;
    placeholder?: string;
    errorMessage?: string;
    helperText?: string;
    isInvalid: boolean;
}

export const PasswordInput: React.FC<PasswordInputProps> = ({
    name,
    label,
    placeholder,
    errorMessage,
    helperText,
    isInvalid,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);
    const handlePasswordVisibility = () => setShowPassword(!showPassword);

    return (
        <FormControl id={name} mt={6} isInvalid={isInvalid}>
            <FormLabel color={isInvalid ? "red.500" : "blackAlpha"}>
                {label}
            </FormLabel>
            <InputGroup>
                <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder || "*****"}
                    errorBorderColor="red.600"
                    {...rest}
                />
                <InputRightElement width="3rem" align="center" height="100%">
                    <IconButton
                        aria-label="Search database"
                        variant="ghost"
                        w="fit-content"
                        _hover={{ backgroundColor: "transparent" }}
                        icon={
                            showPassword ? (
                                <ViewIcon
                                    size="sm"
                                    boxSize={6}
                                    color={isInvalid ? "red.200" : "gray.300"}
                                />
                            ) : (
                                <ViewOffIcon
                                    size="sm"
                                    boxSize={6}
                                    color={isInvalid ? "red.200" : "gray.300"}
                                />
                            )
                        }
                        onClick={handlePasswordVisibility}
                    />
                </InputRightElement>
            </InputGroup>
            {errorMessage && (
                <FormErrorMessage>
                    <WarningIcon mr={1} /> {errorMessage}
                </FormErrorMessage>
            )}
            {helperText && !isInvalid && (
                <FormHelperText>{helperText}</FormHelperText>
            )}
        </FormControl>
    );
};
