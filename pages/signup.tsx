import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Flex, Box, Heading, Text, Icon } from "@chakra-ui/react";
import { ChevronLeftIcon, WarningIcon } from "@chakra-ui/icons";
import { IoCheckmarkCircle } from "react-icons/io5";
import {
    TextInput,
    PasswordInput,
    AuthButton,
    CheckboxComp,
    ProgressDots,
} from "@components";
import { Auth } from "aws-amplify";
import {
    validateEmailHelper,
    validatePasswordHelper,
} from "src/utils/auth/authHelpers";
import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth/lib/types";

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
    const [fromGoogle, setFromGoogle] = useState(false);

    useEffect(() => {
        // Go directly to the TOS if coming from the google flow
        if (!router.isReady) {
            // router not ready yet
            // TODO: add spinner
        }
        if (router.query["GoogleFlow"]) {
            setFromGoogle(true);
            setCurrStage(3);
        } else {
            setFromGoogle(false);
        }
    }, [router.isReady]);

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
        if (validateEmailRes.accountExists) {
            setCanContinue(false);
            setEmailInvalid({
                isInvalid: true,
                reason: "Account already exists with this email",
            });
            return;
        }
        setCanContinue(true);
        setEmailInvalid({
            isInvalid: false,
            reason: "",
        });
    };

    const validateName = () => {
        if (name == "") {
            setCanContinue(false);
        } else {
            setCanContinue(true);
        }
    };

    const validatePassword = () => {
        const validatePasswordRes = validatePasswordHelper(password);
        setPasswordInvalid({
            isInvalid: validatePasswordRes.isInvalid,
            reason: validatePasswordRes.reason,
        });
        setCanContinue(validatePasswordRes.canContinue);
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
            <AuthButton
                text={"Sign Up with Google"}
                onClick={() =>
                    Auth.federatedSignIn({
                        provider: CognitoHostedUIIdentityProvider.Google,
                    })
                }
            ></AuthButton>
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
        {
            component: (
                <Box mt={24}>
                    <WarningIcon w={24} h={24} color="red.500" mb={3} />
                    <Heading>Uh oh! There seems to be a problem</Heading>
                </Box>
            ),
            buttonText: "Try Again",
        },
    ];

    const incrementStage = async () => {
        if (currStage < stages.length - 3) {
            // before Terms Agreement
            setCanContinue(false);
            stages[currStage + 1].validation();
            setCurrStage(currStage + 1);
        } else if (currStage == stages.length - 3) {
            // Terms Agreement stage
            try {
                if (!fromGoogle) {
                    // Create new user with Cognito (if not going through google flow)
                    try {
                        await Auth.signUp({
                            username: email,
                            password: password,
                            attributes: {
                                name: name,
                            },
                        });
                        await Auth.signIn(email, password); // immediately sign in the user
                    } catch (err) {
                        console.log("signup failed", err);
                        setCurrStage(stages.length - 1); // push to error stage
                    }
                }
                if (termsAgreement.participateSurvey) {
                    router.push("/demographic"); // jump to demographic survey
                } else {
                    setCanContinue(true);
                    setCurrStage(currStage + 1); // jump to next stage
                }
            } catch (e) {
                // console.log("nothing");
            }
        } else if (currStage == stages.length - 2) {
            // Get Started stage
            router.push("/protected"); // temporary link back to protected page
        } else if (currStage == stages.length - 1) {
            // Error state
            setCurrStage(2); // push back to password stage
            setCanContinue(true);
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
            {currStage > 0 && currStage < stages.length - 1 && !fromGoogle && (
                <Text alignSelf="start" role="button" onClick={decrementStage}>
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
                    numStages={stages.length - 2}
                    currStage={currStage}
                />
            )}
        </Flex>
    );
};

export default Signup;
