import React from "react";
import { Spacer, Flex } from "@chakra-ui/react";

import { Header, Main, Cards, Footer, ToolCard } from "@components";

const Home: React.FC = () => {
    const creators = ["Christine Ng", "Heads Up Guys"];
    const date = new Date();

    const onLinkModule = () => {
        console.log("hello");
    };
    const onPublish = () => {
        console.log("hello");
    };
    const onDelete = () => {
        console.log("hello");
    };

    return (
        <Flex direction="column" minH="100vh">
            <ToolCard
                title="Tool Title"
                creators={creators}
                updated={date}
                module={false}
                published={false}
                onLinkModule={onLinkModule}
                onPublish={onPublish}
                onDelete={onDelete}
            />
        </Flex>
    );
};

export default Home;
