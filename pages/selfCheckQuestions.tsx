import React from "react";
import { Flex } from "@chakra-ui/react";

import { SelfCheckQuestionCards } from "@components";

const Home: React.FC = () => {
    return (
        <Flex direction="column" minH="100vh">
            <SelfCheckQuestionCards />
        </Flex>
    );
};

export default Home;
