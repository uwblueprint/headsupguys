import React, { useState, useEffect } from "react";
import { Spacer, Flex, Box, Heading, Text } from "@chakra-ui/react";
import isEmail from "validator/lib/isEmail";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/react";

import { TextInput, PasswordInput, AuthButton } from "@components";

// outer component
// canMoveOn = false
// email = ""
// validateEmail = () => {validates stuff}

// inner component calls setCanMoveOn(true)
// inner component needs to set email?
// how does inner access email?
// -> but then who validates email?
// inner calls validateEamil to validate it and then passes result forwards

// outer component waits for changes and if canMoveOn is true, make the button enabled
// once you click button, reset canMoveOn and change the stage

const ResetPassword: React.FC = () => {
    const [currStage, setCurrStage] = useState(0);
    const [email, setEmail] = useState("");
    const [emailInvalid, setEmailInvalid] = useState({
        isInvalid: false,
        reason: "",
    });
    const [passwordRequirements, setPasswordRequirements] = useState({
        isInvalid: false,
        reason: "",
    });
    const [passwordInvalid, setPasswordInvalid] = useState({
        isInvalid: false,
        reason: "",
    });
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [canContinue, setCanContinue] = useState(false);

    const validateEmail = () => {
        if (isEmail(email)) {
            //TODO: check that an account exists
            setEmailInvalid({ isInvalid: false, reason: "" });
            setCanContinue(true);
        } else {
            setEmailInvalid({
                isInvalid: true,
                reason: "Invalid Email",
            });
            setCanContinue(false);
        }
    };

    const EmailStage = (
        <>
            <Text textAlign="left">
                Enter the email associated with your account and we’ll send you
                instructions to reset your password.
            </Text>
            <TextInput
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

    const NewPassword = (
        <>
            <Text textAlign="left">
                Your new password must be different from previous passwords.
            </Text>
            {/* Check to see if password meets requirements */}
            <PasswordInput
                name="password"
                label="Enter your new Password"
                placeholder="Password"
                isInvalid={passwordRequirements.isInvalid}
                errorMessage={passwordRequirements.reason}
                isRequired
                onChange={(event) => {
                    setNewPassword(event.currentTarget.value);
                    // password validation
                    if (
                        /[A-Z]/.test(newPassword) &&
                        /[a-z]/.test(newPassword) &&
                        /[0-9]/.test(newPassword) &&
                        /[^A-Za-z0-9]/.test(newPassword) &&
                        newPassword.length > 8
                    ) {
                        setPasswordRequirements({
                            isInvalid: false,
                            reason: "",
                        });
                    } else {
                        setPasswordRequirements({
                            isInvalid: true,
                            reason: "Password does not meet requirements",
                        });
                        setCanContinue(true);
                    }
                }}
                mb={5}
            />
            {/* check to make sure passwords match at this point */}
            <PasswordInput
                name="password"
                label="Re-Enter your Password"
                placeholder="Password"
                isInvalid={passwordInvalid.isInvalid}
                errorMessage={passwordInvalid.reason}
                isRequired
                onChange={(event) => {
                    setConfirmPassword(event.currentTarget.value);
                }}
                onBlur={() => {
                    if (confirmPassword != newPassword) {
                        setPasswordInvalid({
                            isInvalid: true,
                            reason: "Passwords Do Not Match",
                        });
                        setCanContinue(false);
                    } else {
                        setPasswordInvalid({
                            isInvalid: false,
                            reason: "",
                        });
                        setCanContinue(true);
                    }
                }}
                mb={5}
            />
            <Text textAlign="left">
                Passwords must contain one uppercase, one lowercase, one number,
                one symbol and must be at least 8 characters
            </Text>
        </>
    );

    const stages = [
        {
            title: "Reset Password",
            component: EmailStage,
            buttonText: "Send Instructions",
        },
        {
            title: "Check Email",
            component: (
                <Box>
                    <Text>
                        Password recovery instructions have been sent to your
                        email.
                    </Text>
                    {/* TODO: add continue hyperlink */}
                </Box>
            ),
            buttonText: "Open Email App",
        },
        {
            title: "New Password",
            component: NewPassword,
            buttonText: "Reset Password",
        },
        {
            title: "Success",
            component: (
                <Box>
                    <Text>Password reset successful.</Text>
                </Box>
            ),
            buttonText: "Log in to my account",
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
            minH="100vh"
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
            <Box
                alignItems="center"
                className="login-form"
                m={8}
                pt={20}
                pb={0}
            >
                <Heading alignItems="left" as="h1" size="2xl">
                    {stages[currStage].title}
                </Heading>
                {stages[currStage].component}
            </Box>

            <AuthButton
                text={stages[currStage].buttonText}
                onClick={incrementStage}
                isDisabled={!canContinue}
            />
            {currStage == 1 ? (
                <>
                    <Link onClick={incrementStage}>Continue</Link>
                    {/* Insert Footer here with links */}
                </>
            ) : null}
        </Flex>
    );
};

export default ResetPassword;
