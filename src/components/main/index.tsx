import React, { FunctionComponent } from "react";
import { Box, useTheme } from "@chakra-ui/react";
import { Auth } from "aws-amplify";
import { AuthButton } from "@components";

interface Props {
    title?: string;
}

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log("error signing out: ", error);
    }
}

export const Main: FunctionComponent<Props> = (props: Props) => {
    const theme = useTheme();
    return (
        <Box bg="main.100" color="white" textAlign="center" py={10}>
            <h1 style={{ fontSize: theme.fontSizes["5xl"] }}>superplate</h1>
            <p style={{ fontSize: theme.fontSizes["lg"] }}>
                {props.title || `The frontend boilerplate with superpowers!`}
            </p>
            <AuthButton text="Log out" onClick={signOut}></AuthButton>
        </Box>
    );
};
