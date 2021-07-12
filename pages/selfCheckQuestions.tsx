import React from "react";
import { Spacer, Flex } from "@chakra-ui/react";

import { Header, SelfCheckQuestionCards, Footer } from "@components";
import selfCheckData from "@public/selfCheckQuestions.json";

const Home: React.FC = () => {
    const selfCheckQuestionSize = (selfCheckData?.questions ?? []).map(
        (question) => null,
    ).length;
    return (
        <Flex direction="column" minH="100vh">
            <Header />
            {(selfCheckData?.questions ?? []).map((question) => (
                <SelfCheckQuestionCards
                    questionNumber={question.questionNumber}
                    selfCheckQuestionSize={selfCheckQuestionSize}
                    type={question.type}
                    options={question.options}
                />
            ))}
            <Spacer />
            <Footer />
        </Flex>
    );
};

export default Home;
