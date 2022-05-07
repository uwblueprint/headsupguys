import React, { useState } from "react";
import { useRouter } from "next/router";
import { Flex, Box, Heading, Text, Link } from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Auth } from "aws-amplify";

import { TextInput, PasswordInput, AuthButton } from "@components";
import { validateEmailHelper } from "src/utils/auth/authHelpers";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";

const Login: React.FC = () => {
    const router = useRouter();
    const moduleId = router.query["moduleId"] ? router.query : "";
    const [currStage, setCurrStage] = useState(0);
    const [email, setEmail] = useState("");
    const [emailInvalid, setEmailInvalid] = useState({
        isInvalid: false,
        reason: "",
    });
    const [password, setPassword] = useState("");
    const [passwordInvalid, setPasswordInvalid] = useState({
        isInvalid: false,
        reason: "",
    });
    const [canContinue, setCanContinue] = useState(false);

    const validateEmail = async () => {
        const validateEmailRes = await validateEmailHelper(email);
        if (!validateEmailRes.isValidFormat) {
            setCanContinue(false);
            setEmailInvalid({
                isInvalid: true,
                reason: "Not a valid email format",
            });
            return;
        }
        if (!validateEmailRes.accountExists) {
            setCanContinue(false);
            setEmailInvalid({
                isInvalid: true,
                reason: "No account associated with this email",
            });
            return;
        }
        setCanContinue(true);
        setEmailInvalid({
            isInvalid: false,
            reason: "",
        });
    };

    async function logIn(event) {
        event.preventDefault();
        try {
            setPasswordInvalid({ isInvalid: false, reason: "" });
            await Auth.signIn(email, password);
            console.log("Logged in", moduleId);
            moduleId
                ? router.push(`/module/${moduleId.moduleId}`)
                : router.push("/");
        } catch (e) {
            setPasswordInvalid({
                isInvalid: true,
                reason: "Incorrect Password",
            });
        }
    }

    const loginEmailStage = (
        <>
            <AuthButton
                text={"Login with Google"}
                onClick={() => {
                    console.log(moduleId);
                    Auth.federatedSignIn({
                        provider: CognitoHostedUIIdentityProvider.Google,
                        customState: String(moduleId.moduleId),
                    });
                }}
            ></AuthButton>

            <Text m={5}>OR</Text>
            <TextInput
                fontFamily="Geogrotesque"
                name="email"
                label="Enter your email"
                placeholder="Email"
                type="email"
                value={email}
                errorMessage={emailInvalid.reason}
                isInvalid={emailInvalid.isInvalid}
                isRequired
                onChange={(event) => setEmail(event.currentTarget.value)}
                onBlur={validateEmail}
            />
        </>
    );

    const loginPasswordStage = (
        <>
            <AuthButton
                text={"Login with Google"}
                onClick={() => {
                    console.log(moduleId);
                    Auth.federatedSignIn({
                        provider: CognitoHostedUIIdentityProvider.Google,
                        customState: String(moduleId.moduleId),
                    });
                }}
            ></AuthButton>
            <PasswordInput
                fontFamily="Geogrotesque"
                name="password"
                placeholder="Password"
                isRequired
                errorMessage={passwordInvalid.reason}
                isInvalid={passwordInvalid.isInvalid}
                onChange={(event) => {
                    setPassword(event.currentTarget.value);
                }}
            />
            <Link href="/reset">Forgot Password?</Link>
        </>
    );

    const stages = [
        {
            title: "Log In",
            component: loginEmailStage,
            buttonText: "Continue",
        },
        {
            title: "Log In",
            component: loginPasswordStage,
            buttonText: "Continue",
        },
    ];

    const incrementStage = () => {
        if (currStage < stages.length) setCurrStage(currStage + 1);
        if (currStage == stages.length) return;
        setCanContinue(false);
    };

    const decrementStage = () => {
        if (currStage >= 0) {
            setCurrStage(currStage - 1);
            setCanContinue(false);
        }
    };

    return (
        <Flex
            direction="column"
            align="center"
            // justifyContent="center"
            h="100vh"
            m={2}
        >
            {/* dont have account button */}
            {currStage == 0 && (
                <Flex direction="row" m={10} h="0vh" paddingTop="15%">
                    <Text>Don't have an account?</Text>
                    <Link
                        href={
                            moduleId
                                ? `/signup?moduleId=${moduleId.moduleId}`
                                : "/signup"
                        }
                        style={{ fontWeight: "bold" }}
                    >
                        {" "}
                        Sign Up
                    </Link>
                </Flex>
            )}

            {/* back button */}
            {currStage == 1 && (
                <Text alignSelf="start" role="button" onClick={decrementStage}>
                    <ChevronLeftIcon />
                    Back
                </Text>
            )}
            <Box
                align="center"
                className="login-form"
                m={8}
                pt={20}
                pb={0}
                fontFamily="Geogrotesque"
            >
                <Heading
                    fontFamily="Geogrotesque"
                    style={{ fontWeight: "bold" }}
                    h="25%"
                >
                    {stages[currStage].title}
                </Heading>
                {stages[currStage].component}
            </Box>

            {currStage == 0 && (
                <AuthButton
                    paddingTop="-10%"
                    text={stages[currStage].buttonText}
                    onClick={incrementStage}
                    isDisabled={!canContinue}
                />
            )}

            {currStage == 1 && (
                <AuthButton
                    text={stages[currStage].buttonText}
                    onClick={logIn}
                    isDisabled={false}
                />
            )}
        </Flex>
    );
};

export default Login;
