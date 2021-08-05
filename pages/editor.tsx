import React, { useState } from "react";
import { Spacer, Flex } from "@chakra-ui/react";

import { Header, Main, Footer, MarkdownEditor } from "@components";

const Home: React.FC = () => {
    const [editorText, setEditorText] = useState("Hello world!");
    return (
        <Flex direction="column" minH="100vh">
            <Header />
            <Main title="Text editor testing page" />
            <div className="container">
                <MarkdownEditor value={editorText} setValue={setEditorText} />
            </div>
            <Spacer />
            <Footer />
        </Flex>
    );
};

export default Home;
