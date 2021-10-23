import React, { useState } from "react";
import { Spacer, Flex } from "@chakra-ui/react";

import { MarkdownEditor, MarkdownRenderer } from "@components";

const Home: React.FC = () => {
    const [editorText, setEditorText] = useState("Hello world!"); // stores inputted markdown
    return (
        <Flex direction="column" minH="100vh">
            <div className="container">
                <MarkdownEditor value={editorText} setValue={setEditorText} />
            </div>
            {JSON.stringify(editorText)}
            <MarkdownRenderer variables={{ hi: ["h", "e", "l", "l", "o"] }}>
                {editorText}
            </MarkdownRenderer>
            <Spacer />
        </Flex>
    );
};

export default Home;
