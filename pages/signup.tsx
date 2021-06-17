import React, { useState, useEffect } from "react";
import { Spacer, Flex, Box } from "@chakra-ui/react";

import { Header, Main, Footer, TextInput, PasswordInput, MyButton, CheckboxComp } from "@components";

const Home: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailInvalid, setEmailInvalid] = useState(false);
    const [passwordInvalid, setPasswordInvalid] = useState(false);

    useEffect(() => {
        console.log("email", email);
        if (email == "invalid") {
            setEmailInvalid(true);
        } else {
            setEmailInvalid(false);
        }
    }, [email]);

    useEffect(() => {
        console.log("password", password);
        if (password == "1234") {
            setPasswordInvalid(true);
        } else {
            setPasswordInvalid(false);
        }
    }, [password]);

    return (
        <Flex direction="column" minH="100vh">
            <Header />
            <Main title="This the signup page" />
            <Box className="login-form" m={5}>
                <p>Sign up with your Email</p>
                <TextInput
                    name="email"
                    label="Your Email"
                    placeholder="Email Address"
                    helperText="Helpful message!"
                    // errorMessage="WRONG!
                    isInvalid={emailInvalid}
                    isRequired
                    onChange={(event) => setEmail(event.currentTarget.value)}
                />
                <PasswordInput
                    placeholder="*****"
                    name="password"
                    label="Password"
                    errorMessage="Password can't be 1234"
                    helperText="Must contain one uppercase letter and one lowercase letter"
                    isInvalid={passwordInvalid}
                    onChange={(event) => setPassword(event.currentTarget.value)}
                />
                <CheckboxComp text="Testing" required={true} isDisabled={false} onChange={() => console.log("HELLO")} />
                <MyButton text="Sign up!" />
            </Box>
            <Spacer />
            <Footer />
        </Flex>
    );
};

export default Home;
