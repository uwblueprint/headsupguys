import React, { useState } from "react";
import { Flex, Box, Heading, Text, Link } from "@chakra-ui/react";
import isEmail from "validator/lib/isEmail";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Auth } from "aws-amplify";

import { TextInput, PasswordInput, AuthButton } from "@components";

const Login: React.FC = () => {
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

    const userExist = async (email) => {
        return await Auth.signIn(email.toLowerCase(), "123")
            .then((res) => {
                return false;
            })
            .catch((error) => {
                const code = error.code;
                switch (code) {
                    case "UserNotFoundException":
                        return false;
                    case "NotAuthorizedException":
                        return true;
                    case "PasswordResetRequiredException":
                        return true;
                    default:
                        return false;
                }
            });
    };

    const validateEmail = async () => {
        if (isEmail(email)) {
            var emailExists = await userExist(email);
            if (!emailExists) {
                setEmailInvalid({
                    isInvalid: true,
                    reason: "Invalid email- no account associated with this email",
                });
                setCanContinue(false);
            } else {
                setEmailInvalid({ isInvalid: false, reason: "" });
                setCanContinue(true);
            }
        } else {
            setEmailInvalid({
                isInvalid: true,
                reason: "Not a valid HeadsUpGuys email!",
            });
            setCanContinue(false);
        }
    };

    async function logIn(event) {
        event.preventDefault();
        try {
            setPasswordInvalid({ isInvalid: false, reason: "" });
            await Auth.signIn(email, password);
            incrementStage();
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
                onClick={() => Auth.federatedSignIn({ provider: "Google" })}
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
                onClick={() => Auth.federatedSignIn({ provider: "Google" })}
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
            <Link href="/signup">Forgot Password?</Link>
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
        {
            title: "Protected Route", // will need to change this
            component: (
                <Box>
                    <Text>You are now logged in!</Text>
                </Box>
            ),
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
                    <Link href="/signup" style={{ fontWeight: "bold" }}>
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
