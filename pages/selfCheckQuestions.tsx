import React from "react";
import {
    Spacer,
    Text,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalFooter,
    ModalCloseButton,
    useDisclosure,
    Flex,
    SimpleGrid,
    Button,
    ButtonGroup,
} from "@chakra-ui/react";
import { Header, SelfCheckQuestionCards, Footer } from "@components";
import { questionList } from "@components/selfCheckQuestion";
import selfCheckData from "@public/selfCheckQuestions.json";

const Home: React.FC = () => {
    const selfCheckQuestionSize = (selfCheckData?.questions ?? []).map(
        (question) => null,
    ).length;
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Flex direction="column" minH="100vh">
            <Header mb={12} />
            <Flex mt={10} wrap={"wrap"} justifyContent={"left"} width={"full"}>
                <Text mx={10} fontWeight="bold" fontSize="4xl">
                    Create a Tool
                </Text>
                <Spacer />
                <ButtonGroup wrap={"wrap"} spacing={"1.5rem"} mx={12}>
                    <Button
                        _hover={{ bg: "#F3F3F3" }}
                        _active={{
                            transform: "scale(0.95)",
                        }}
                        onClick={onOpen}
                        minWidth={"90"}
                        colorScheme="white"
                        variant="outline"
                    >
                        Discard
                    </Button>
                    <Button
                        _hover={{ bg: "#121310" }}
                        _active={{
                            transform: "scale(0.95)",
                        }}
                        minWidth={"90"}
                        color="white"
                        background="black"
                        variant="outline"
                    >
                        Save
                    </Button>
                </ButtonGroup>
            </Flex>
            <Modal
                blockScrollOnMount={false}
                isOpen={isOpen}
                onClose={onClose}
                motionPreset="slideInBottom"
            >
                <ModalOverlay />
                <ModalContent p={"5"}>
                    <ModalHeader>Delete Tool </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are you sure you want to delete this tool? This is a
                        permanent action that cannot be undone.
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            variant="outline"
                            colorScheme="black"
                            mr={3}
                            w={100}
                            onClick={onClose}
                        >
                            Cancel
                        </Button>
                        <Button w={100} colorScheme="red">
                            Delete
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <SimpleGrid columns={1} spacing={0} px={10} py={10}>
                {(questionList ?? []).map((question) => (
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
