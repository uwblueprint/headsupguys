import React, { FunctionComponent } from "react";
import { Box, useTheme } from "@chakra-ui/react";

import { MyButton } from "@components";

interface Props {
    title?: string;
}

export const Main: FunctionComponent<Props> = (props: Props) => {
    const theme = useTheme();
    return (
        <Box bg="main.100" color="white" textAlign="center" py={10}>
            <h1 style={{ fontSize: theme.fontSizes["5xl"] }}>superplate</h1>
            <p style={{ fontSize: theme.fontSizes["lg"] }}>
                {props.title || `The frontend boilerplate with superpowers!`}
            </p>
            <MyButton>
                <a href="https://pankod.github.io/superplate/" target="_blank">
                    Docs
                </a>
            </MyButton>
        </Box>
    );
};
