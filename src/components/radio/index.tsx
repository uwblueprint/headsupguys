import React from "react";
import { useRadio, Box } from "@chakra-ui/react";

interface IProps {
    value?: string | number;
    children?: React.ReactNode;
}

export const StyledRadio: React.FC<IProps> = (props: IProps) => {
    const { getInputProps, getCheckboxProps } = useRadio(props);

    const input = getInputProps();
    const checkbox = getCheckboxProps();

    return (
        <Box as="label" borderColor="black" w="100%">
            <input {...input} />
            <Box
                {...checkbox}
                cursor="pointer"
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                borderColor="black"
                _focus={{
                    boxShadow: "outline",
                }}
                _checked={{
                    bg: "teal.600",
                    color: "white",
                    borderColor: "teal.600",
                }}
                px={5}
                py={3}
                my={1}
            >
                {props.children}
            </Box>
        </Box>
    );
};
