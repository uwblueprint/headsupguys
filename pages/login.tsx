import React, { useState, useEffect } from "react";
import { Flex, Box, Heading, Text, Spacer, Link } from "@chakra-ui/react";
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

    const validateEmail = () => {
        // instead of isEmail, use a check to see if email exists
        if (isEmail(email)) {
            setEmailInvalid({ isInvalid: false, reason: "" });
            setCanContinue(true);
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
            //   userHasAuthenticated(true);
            incrementStage();
        } catch (e) {
            console.log("ERROR", e);
            setPasswordInvalid({
                isInvalid: true,
                reason: "Incorrect Password",
            });
        }
    }

    const loginEmailStage = (
        <>
            <AuthButton text="Continue with Google [placeholder]" />
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
            <AuthButton text="Continue with Google [placeholder]" />
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
        // add logic to check if it's possible
        if (currStage < stages.length) setCurrStage(currStage + 1);
        if (currStage == stages.length) return; // go to the "get started" link
        setCanContinue(false);
    };

    const decrementStage = () => {
        // what does pressing back do?
        // slight "bug" is that when going back, setContinue will be set to false
        // that means that you will need to focus on the input field to have it re-validate
        // even if it's technically already valid
        // alternatively we can individually call the validate fncs for each section
        // in this going back fnc (seperate if for each stage) instead of always setting canContinue to false
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
                <Text
                    alignSelf="start"
                    tabindex="0"
                    role="button"
                    onClick={decrementStage}
                >
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
                    //onClick={logIn}
                    onClick={logIn}
                    isDisabled={false}
                />
            )}

            {/* progress bar */}
        </Flex>
    );
};

export default Login;
