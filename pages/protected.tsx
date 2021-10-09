// This is an example of a protected route for the app
// We can use Auth.currentAuthenticatedUser() to get the current user
// from the session and either pass the object as a prop or redirect
// if they aren't authenticated

import React from "react";
import { GetServerSideProps } from "next";
import { withSSRContext } from "aws-amplify";
import { Spacer, Flex } from "@chakra-ui/react";
import { Auth } from "aws-amplify"; // if you wanted to call Auth on client-side

interface ProtectedProps {
    username?: string;
}

const Protected: React.FC<ProtectedProps> = ({ username }) => {
    return (
        <Flex direction="column" minH="100vh">
            <h5>This is a protected route with user {username}</h5>
            <Spacer />
        </Flex>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    const { Auth } = withSSRContext({ req });
    try {
        const user = await Auth.currentAuthenticatedUser(); // retrieve user session
        return {
            props: {
                authenticated: true,
                username: user.username,
            },
        };
    } catch (err) {
        res.writeHead(302, { Location: "/" });
        res.end();
    }
    return { props: {} };
};

export default Protected;
