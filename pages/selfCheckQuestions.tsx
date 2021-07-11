import React from "react";
import { Spacer, Flex } from "@chakra-ui/react";

import { Header, SelfCheckQuestionCards, Footer } from "@components";

const Home: React.FC = () => {
    return (
        <Flex direction="column" minH="100vh">
            <Header />
            <SelfCheckQuestionCards />
            <Spacer />
            <Spacer />
            <Spacer />
            <Footer />
        </Flex>
    );
};

export default Home;
