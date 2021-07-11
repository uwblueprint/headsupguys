import React, { useState, useEffect } from "react";
import { Flex, Box, Heading, Text, Spacer } from "@chakra-ui/react";
import isEmail from "validator/lib/isEmail";
import { ChevronLeftIcon } from "@chakra-ui/icons";

import { TextInput, PasswordInput, AuthButton } from "@components";
import { Auth } from "aws-amplify";

const Signup: React.FC = () => {
    const [currStage, setCurrStage] = useState(0);
    const [email, setEmail] = useState("");
    const [emailInvalid, setEmailInvalid] = useState({
        isInvalid: false,
        reason: "",
    });
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [termsAgreement, setTermsAgreement] = useState();
    const [canContinue, setCanContinue] = useState(false);

    async function signup(event) {
        event.preventDefault();

        try {
            //Create new user with Cognito
            const newUser = await Auth.signUp({
                username: email,
                password: password,
                attributes: {
                    name: name,
                },
            });
            console.log("USER CREATED", newUser);
        } catch (e) {
            console.log("ERROR");
        }
    }

    const validateEmail = () => {
        if (isEmail(email)) {
            setEmailInvalid({ isInvalid: false, reason: "" });
            setCanContinue(true);
        } else {
            setEmailInvalid({
                isInvalid: true,
                reason: "Not a valid email format",
            });
            setCanContinue(false);
        }

        // add another check for account in use later
    };

    const validateName = () => {
        // is first name a required field? or is it allowed to be empty?
        if (name == "") {
            setCanContinue(false);
        } else {
            setCanContinue(true);
        }
    };

    const signupEmailStage = (
        <>
            <AuthButton text="Continue with Google (placeholder)" />
            <Text m={5}>OR</Text>
            <TextInput
                name="email"
                label="Sign up with your Email"
                placeholder="Email Address"
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

    const signupNameStage = (
        <>
            <Text m={5}>
                Sign up as <b>{email}</b>
            </Text>
            <TextInput
                name="name"
                label="First Name"
                placeholder="First Name"
                type="text"
                value={name}
                onChange={(event) => setName(event.currentTarget.value)}
                onBlur={validateName}
            />
        </>
    );

    const signupPasswordStage = (
        <>
            <Text m={5}>
                Hi <b>{name}</b>, please create a password
            </Text>
            <PasswordInput
                name="password"
                label="Password"
                placeholder="******"
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
                // onBlur={validateName}
                isInvalid={true} // update
            />
        </>
    );

    const stages = [
        {
            title: "Create an Account",
            component: signupEmailStage,
            buttonText: "Continue",
        },
        {
            title: "Create an Account",
            component: signupNameStage,
            buttonText: "Continue",
        },
        {
            title: "Create an Account",
            component: signupPasswordStage,
            buttonText: "Continue",
        },
        {
            title: "Create an Account",
            component: (
                <Box>
                    <Text>terms of agreement</Text>
                </Box>
            ),
            buttonText: "Sign up",
        },
        {
            title: "You're all set", // will need to change this
            component: (
                <Box>
                    <Text>You're all set</Text>
                </Box>
            ),
            buttonText: "Get started",
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
            m={4}
        >
            {/* back button */}
            {currStage > 0 && (
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
            <Box align="center" className="login-form" pt={24} h="60%">
                <Heading m={5}>{stages[currStage].title}</Heading>
                {stages[currStage].component}
            </Box>
            {currStage == 2 ? (
                <AuthButton text="SIGN UP" onClick={signup} />
            ) : (
                <AuthButton
                    text={stages[currStage].buttonText}
                    onClick={incrementStage}
                    isDisabled={!canContinue}
                />
            )}
            {/* progress bar */}
        </Flex>
    );
};

export default Signup;
