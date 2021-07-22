import React, { useState } from "react";
import { Flex, Box, Heading, Text, Center } from "@chakra-ui/react";
import isEmail from "validator/lib/isEmail";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { Link } from "@chakra-ui/react";
import { Auth } from "aws-amplify";

import { TextInput, PasswordInput, AuthButton } from "@components";

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
    const [confirmationCode, setConfirmationCode] = useState("");
    const [canContinue, setCanContinue] = useState(false);
    const [message, setMessage] = useState(null);

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
                        return true;
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
                reason: "Invalid Email",
            });
            setCanContinue(false);
        }
    };

    const isPasswordValid = (password) => {
        var pattern = new RegExp(
            "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$",
        );
        return pattern.test(password);
    };

    const validatePassword = () => {
        if (newPassword == "") {
            // don't set as error state if it's currently empty
            setPasswordRequirements({ isInvalid: false, reason: "" });
            setCanContinue(false);
        } else if (newPassword.length < 8) {
            setPasswordRequirements({
                isInvalid: true,
                reason: "Password is too short, password must be 8 characters",
            });
            setCanContinue(false);
        } else {
            if (isPasswordValid(newPassword)) {
                setPasswordRequirements({
                    isInvalid: false,
                    reason: "",
                });
                if (
                    newPassword == confirmPassword &&
                    confirmationCode.length > 0
                )
                    setCanContinue(true);
                else {
                    setCanContinue(false);
                }
            } else {
                setPasswordRequirements({
                    isInvalid: true,
                    reason: "Password must contain a special character, capital letter, lowecase letter and number.",
                });
                setCanContinue(false);
            }
        }
    };

    const incrementStage = () => {
        if (currStage < stages.length) setCurrStage(currStage + 1);
        if (currStage == 2) {
            setCanContinue(true);
            return;
        }
        setCanContinue(false);
    };

    const decrementStage = () => {
        if (currStage >= 0) {
            setCurrStage(currStage - 1);
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
            <AuthButton
                text="Send Instructions"
                onClick={() => {
                    // Send confirmation code to user's email
                    Auth.forgotPassword(email)
                        .then()
                        .catch((err) => alert(err.message));
                    incrementStage();
                }}
                isDisabled={!canContinue}
            />
        </>
    );

    const NewPassword = (
        <>
            <Text textAlign="left">
                Your new password must be different from previous passwords.
            </Text>
            {/* improve validation to ensure confirmation code is present */}
            <TextInput
                name="confirmationCode"
                label="Enter your password reset Confirmation Code"
                placeholder="Confirmation Code"
                value={confirmationCode}
                isRequired
                onChange={(event) => {
                    setConfirmationCode(event.currentTarget.value);
                }}
                onBlur={() => {
                    if (
                        isPasswordValid(newPassword) &&
                        confirmPassword == newPassword &&
                        confirmationCode.length > 0
                    ) {
                        setCanContinue(true);
                    } else {
                        setCanContinue(false);
                    }
                }}
            />
            {/* Check to see if password meets requirements */}
            <PasswordInput
                name="password"
                label="Enter your new Password"
                placeholder="Password"
                isInvalid={passwordRequirements.isInvalid}
                errorMessage={passwordRequirements.reason}
                isRequired
                onChange={(event) => setNewPassword(event.currentTarget.value)}
                onBlur={validatePassword}
                mb={5}
            />
            {/* check to make sure passwords match at this point 
            verify that is original password changes, both checks still run 
            */}
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
                            reason: "Passwords do not match",
                        });
                        setCanContinue(false);
                    } else {
                        if (confirmationCode.length > 0) {
                            setPasswordInvalid({
                                isInvalid: false,
                                reason: "",
                            });
                            setCanContinue(true);
                        }
                    }
                }}
                mb={5}
            />
            <Text textAlign="left">
                Passwords must contain one uppercase, one lowercase, one number,
                one symbol and must be at least 8 characters.
            </Text>
            <AuthButton
                text="Reset Password"
                onClick={() => {
                    Auth.forgotPasswordSubmit(
                        email,
                        confirmationCode,
                        newPassword,
                    )
                        .then((data) => {
                            setMessage(null);
                            incrementStage();
                        })
                        .catch((err) => setMessage(err.message));
                }}
                isDisabled={!canContinue}
            />
        </>
    );

    const stages = [
        {
            title: "Reset Password",
            component: EmailStage,
        },
        {
            title: "Check Email",
            component: (
                <Box>
                    <Text>
                        Password recovery instructions have been sent to your
                        email, open up your email app to see the instructions.
                    </Text>
                    <Center>
                        <Text mt="5" as="u">
                            <Link onClick={incrementStage} mt="5">
                                Continue
                            </Link>
                        </Text>
                    </Center>
                    <Text mt="70%">
                        Did not recieve the email? Check your spam folder or{" "}
                        <Link
                            onClick={() => {
                                // Send confirmation code to user's email
                                Auth.forgotPassword(email)
                                    .then()
                                    .catch((err) => alert(err.message));
                            }}
                        >
                            <Text as="u">resend email.</Text>
                        </Link>
                    </Text>
                </Box>
            ),
        },
        {
            title: "New Password",
            component: NewPassword,
        },
        {
            title: "Success!",
            component: (
                <Box>
                    <Text textAlign="left">Password reset successful.</Text>
                    <AuthButton
                        text="Log in to my account"
                        onClick={() => (location.href = "/login")}
                        isDisabled={false}
                    />
                </Box>
            ),
        },
    ];

    return (
        <Flex direction="column" align="center" minH="100vh" m={4}>
            {currStage > 0 && (
                <Text
                    alignSelf="start"
                    role="button"
                    onClick={decrementStage}
                    mb="-5"
                    mt="2"
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
            {message != null ? (
                <Text textAlign="center" color="red">
                    {" "}
                    {message}{" "}
                </Text>
            ) : null}
        </Flex>
    );
};

export default ResetPassword;
