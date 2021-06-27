import React, { FunctionComponent } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { ButtonProps } from "@chakra-ui/react";

interface AuthButtonProps extends ButtonProps {
    text?: string;
}

export const AuthButton: FunctionComponent<AuthButtonProps> = ({
    text,
    ...rest
}) => {
    return (
        <div>
            <Button
                _hover={{
                    backgroundColour: "blue.100",
                }}
                _pressed={{
                    backgroundColour: "blue.100",
                }}
                backgroundColor="blue.500"
                textColor="white"
                fontSize="16px"
                variant="solid"
                size="md"
                height="40px"
                width="312.01px"
                borderRadius="0px"
                fontFamily="Geogrotesque"
                boxShadow="xs"
                {...rest}
            >
                {text}
            </Button>
        </div>
    );
};
