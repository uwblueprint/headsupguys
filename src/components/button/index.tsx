import React, { FunctionComponent } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { ButtonProps } from "@chakra-ui/react";

interface Props {
    text?: string;
}

export const MyButton: FunctionComponent<Props> = (props: Props) => {
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
            >
                {props.text}
            </Button>
        </div>
    );
};
