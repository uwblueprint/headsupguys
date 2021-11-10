// This is an example of a protected route for the app (for administrators)
// Call the hook isAuthenticated() to validate that the user is authenticated
// as admin and get user props

import React from "react";
import { GetServerSideProps } from "next";
import { Spacer, Flex } from "@chakra-ui/react";
import { isAuthenticated, AuthInterface } from "../src/utils/auth/authHelpers";

interface ProtectedProps {
    auth: AuthInterface;
}

const Protected: React.FC<ProtectedProps> = ({ auth }) => {
    return (
        <Flex direction="column" minH="100vh">
            <h5>
                This is a protected admin route with user{" "}
                {auth.attributes.email}
            </h5>
            <Spacer />
        </Flex>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const authProps = await isAuthenticated(req, res, true);
    return {
        props: {
            auth: authProps,
        },
    };
};

export default Protected;
