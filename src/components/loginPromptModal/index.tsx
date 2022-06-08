import React from "react";
import {
    Button,
    Modal as ChakraModal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Text,
    Spacer,
    CloseButton,
    Box,
    Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { AuthButton } from "@components/authButton";
import { Auth } from "aws-amplify";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";

export interface LoginPromptModalProps {
    isOpen: boolean;
    onCancel: () => void;
}

export const LoginPromptModal: React.FC<LoginPromptModalProps> = (props) => {
    const { isOpen, onCancel } = props;
    const router = useRouter();
    return (
        <ChakraModal isCentered onClose={onCancel} isOpen={isOpen}>
            <ModalOverlay />
            <ModalContent padding="0px 32px">
                <CloseButton
                    onClick={onCancel}
                    alignSelf="flex-end"
                    m="10px -20px -20px 0px"
                />
                <ModalHeader
                    textAlign="center"
                    fontSize="24"
                    fontFamily="Geogrotesque Bold"
                    w="100%"
                >
                    Sign Up or Log In
                </ModalHeader>
                <ModalBody>
                    Please sign up or log in to save your progress and download
                    your certificate.
                    <AuthButton
                        text={"Continue with Google"}
                        backgroundColor="transparent"
                        fontFamily="Inter"
                        fontSize="14"
                        w="full"
                        mt="18px"
                        mb="8px"
                        color="black"
                        onClick={() =>
                            Auth.federatedSignIn({
                                provider:
                                    CognitoHostedUIIdentityProvider.Google,
                            })
                        }
                    />
                    <Box mt="-35px" mb="35px" ml="10px">
                        <img src="/icons/google-icon.svg" />
                    </Box>
                    <Flex justify="space-between">
                        <hr style={{ width: "40%" }} />
                        <Text mt="-12px" fontFamily="Inter">
                            or
                        </Text>
                        <hr style={{ width: "40%" }} />
                    </Flex>
                    <AuthButton
                        text={"Sign up with your Email"}
                        backgroundColor="transparent"
                        fontFamily="Inter"
                        fontSize="14"
                        w="full"
                        mt="12px"
                        mb="8px"
                        color="black"
                        onClick={() => router.push("/signup")}
                    />
                    <Flex mt="35px" justify="center">
                        <Text textAlign="center" fontFamily="Inter">
                            Already have an account?{" "}
                        </Text>
                        <Text
                            color="brand.green"
                            textAlign="center"
                            fontFamily="Inter"
                        >
                            <Link href="login">&nbsp;Log In</Link>
                        </Text>
                    </Flex>
                </ModalBody>
                <ModalFooter mx="-56px">
                    <Flex
                        bg="black"
                        color="white"
                        fontFamily="Inter"
                        w="full"
                        justify="center"
                        p="15px"
                        textDecoration="underline"
                    >
                        <Link href="/">No thanks, back to Toolkit</Link>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </ChakraModal>
    );
};
