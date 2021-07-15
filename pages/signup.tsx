import React, { useState } from "react";
import { useRouter } from "next/router";
import { Flex, Box, Heading, Text, Icon } from "@chakra-ui/react";
import isEmail from "validator/lib/isEmail";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { IoCheckmarkCircle } from "react-icons/io5";
import {
    TextInput,
    PasswordInput,
    AuthButton,
    CheckboxComp,
    ProgressDots,
} from "@components";
import { Auth } from "aws-amplify";

const Signup: React.FC = () => {
    const router = useRouter();
    const [currStage, setCurrStage] = useState(0);
    const [email, setEmail] = useState("");
    const [emailInvalid, setEmailInvalid] = useState({
        isInvalid: false,
        reason: "",
    });
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordInvalid, setPasswordInvalid] = useState({
        isInvalid: false,
        reason: "",
    });
    const [termsAgreement, setTermsAgreement] = useState({
        saveEmail: false,
        saveProgress: false,
        participateSurvey: false,
    });
    const [canContinue, setCanContinue] = useState(false);

    async function signup(event) {
        event.preventDefault();
    }

    const validateEmail = () => {
        if (email == "") {
            // don't set as error state if it's currently empty
            setEmailInvalid({ isInvalid: false, reason: "" });
            setCanContinue(false);
        } else if (isEmail(email)) {
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

    const validatePassword = () => {
        if (password == "") {
            // don't set as error state if it's currently empty
            setPasswordInvalid({ isInvalid: false, reason: "" });
            setCanContinue(false);
        } else if (password.length < 8) {
            // add actual validations here later
            setPasswordInvalid({
                isInvalid: true,
                reason: "Password is too short",
            });
            setCanContinue(false);
        } else {
            setPasswordInvalid({
                isInvalid: false,
                reason: "",
            });
            setCanContinue(true);
        }
    };

    const validateTermsAgreement = (agreements = termsAgreement) => {
        if (agreements.saveEmail && agreements.saveProgress) {
            setCanContinue(true);
        } else {
            setCanContinue(false);
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
                onBlur={validatePassword}
                isInvalid={passwordInvalid.isInvalid}
                errorMessage={passwordInvalid.reason}
            />
        </>
    );

    const termsAgreementStage = (
        <Box m={2} textAlign="left">
            <CheckboxComp
                mb={5}
                text="I agree to have my email saved in order to create my account, and for Email Check-ins"
                isChecked={termsAgreement.saveEmail}
                isRequired={true}
                onChange={() => {
                    setTermsAgreement({
                        ...termsAgreement,
                        saveEmail: !termsAgreement.saveEmail,
                    });
                    validateTermsAgreement({
                        ...termsAgreement,
                        saveEmail: !termsAgreement.saveEmail,
                    });
                }}
            />
            <CheckboxComp
                mb={5}
                text="I agree to have my Tool Progress saved and tracked"
                isChecked={termsAgreement.saveProgress}
                isRequired={true}
                onChange={() => {
                    setTermsAgreement({
                        ...termsAgreement,
                        saveProgress: !termsAgreement.saveProgress,
                    });
                    validateTermsAgreement({
                        ...termsAgreement,
                        saveProgress: !termsAgreement.saveProgress,
                    });
                }}
            />
            <CheckboxComp
                text="I agree to to participate in a brief survey and share my demographic data with HUG "
                isChecked={termsAgreement.participateSurvey}
                isRequired={false}
                onChange={() => {
                    setTermsAgreement({
                        ...termsAgreement,
                        participateSurvey: !termsAgreement.participateSurvey,
                    });
                    validateTermsAgreement({
                        ...termsAgreement,
                        participateSurvey: !termsAgreement.participateSurvey,
                    });
                }}
            />
        </Box>
    );

    const stages = [
        {
            title: "Create an Account",
            component: signupEmailStage,
            buttonText: "Continue",
            validation: validateEmail,
        },
        {
            title: "Create an Account",
            component: signupNameStage,
            buttonText: "Continue",
            validation: validateName,
        },
        {
            title: "Create an Account",
            component: signupPasswordStage,
            buttonText: "Continue",
            validation: validatePassword,
        },
        {
            title: "Terms Agreement",
            component: termsAgreementStage,
            buttonText: "Sign up",
            validation: validateTermsAgreement,
        },
        {
            component: (
                <Box mt={24}>
                    <Icon as={IoCheckmarkCircle} boxSize={24}></Icon>
                    <Heading>You're all set</Heading>
                </Box>
            ),
            buttonText: "Get started",
        },
    ];

    const incrementStage = async () => {
        if (currStage < stages.length - 2) {
            setCanContinue(false);
            stages[currStage + 1].validation();
            setCurrStage(currStage + 1);
        } else if (currStage == stages.length - 2) {
            try {
                //Create new user with Cognito
                const newUser = await Auth.signUp({
                    username: email,
                    password: password,
                    attributes: {
                        name: name,
                    },
                });
                // last stage before signup
                setCanContinue(true);
                setCurrStage(currStage + 1);
                console.log("USER CREATED", newUser);
            } catch (e) {
                console.log("ERROR");
            }
        } else {
            // go to "Get Started" link
            router.push("/"); // temporary link back to "/"
        }
    };

    const decrementStage = () => {
        if (currStage >= 0) {
            setCurrStage(currStage - 1);
            stages[currStage - 1].validation();
        }
    };

    return (
        <Flex direction="column" align="center" h="100vh" m={4}>
            {currStage > 0 && currStage < stages.length - 1 && (
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
            <Box align="center" className="login-form" mt={24} h="50%">
                {stages[currStage].title && (
                    <Heading m={5}>{stages[currStage].title}</Heading>
                )}
                {stages[currStage].component}
            </Box>

            <AuthButton
                text={stages[currStage].buttonText}
                onClick={incrementStage}
                isDisabled={!canContinue}
                mb={5}
            />
            {currStage < stages.length - 1 && (
                <ProgressDots
                    m={5}
                    numStages={stages.length - 1}
                    currStage={currStage}
                />
            )}
        </Flex>
    );
};

export default Signup;
