import React from "react";
import { Spacer, Flex } from "@chakra-ui/react";

import { Header, Main, Cards, Footer } from "@components";

const Home: React.FC = () => {
    return (
        <Flex direction="column" minH="100vh">
            <Header />
            <Main title="This is a protected route" />
            <Cards />
            <Spacer />
            <Footer />
        </Flex>
    );
};

export default Home;