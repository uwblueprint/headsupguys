import React from "react";
import { Spacer, Flex } from "@chakra-ui/react";
import { Header, Main, Cards, Footer } from "@components";

import Amplify from "@aws-amplify/core";
import { Auth } from "aws-amplify";

const Home: React.FC = () => {
    return (
        <Flex direction="column" minH="100vh">
            <Header />
            <Main title="login page" />
            <Cards />
            <Spacer />
            <Footer />
        </Flex>
    );
};

export default Home;
