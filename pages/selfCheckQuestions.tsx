import React from "react";
import { Spacer, Flex, SimpleGrid } from "@chakra-ui/react";
import { Header, SelfCheckQuestionCards, Footer } from "@components";
import { questionArray } from "@components/selfCheckQuestion";
import selfCheckData from "@public/selfCheckQuestions.json";

const Home: React.FC = () => {
    const selfCheckQuestionSize = (selfCheckData?.questions ?? []).map(
        (question) => null,
    ).length;
    return (
        <Flex direction="column" minH="100vh">
            <Header />
            <SimpleGrid columns={1} spacing={0} px={10} py={10}>
                {(questionArray ?? []).map((question) => (
                    <SelfCheckQuestionCards
                        key={question.questionNumber}
                        questionId={question._id}
                        questionNumber={question.questionNumber}
                        selfCheckQuestionSize={selfCheckQuestionSize}
                        type={question.type}
                        options={question.options}
                    />
                ))}
            </SimpleGrid>
            <Spacer />
            <Footer />
        </Flex>
    );
};

export default Home;
