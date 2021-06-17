import React, { useState, useEffect } from "react";
import { Spacer, Flex, Box } from "@chakra-ui/react";

import { Header, Main, Footer, TextInput, PasswordInput } from "@components";

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
            </Box>
            <Spacer />
            <Footer />
        </Flex>
    );
};

export default Home;

// Adil's signup page:
// import React from "react";
// import { Spacer, Flex } from "@chakra-ui/react";

// import { Header, Main, Cards, Footer, MyButton, SignUpForm } from "@components";

// const SignUpPage: React.FC = () => {
//     return (
//         <div className="min-h-screen flex bg-gray-200">
//             <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
//                 <div className="text-center mt-24">
//                     <h2 className="mt-6 text-center text-3xl leading-9 font-   extrabold text-gray-900">
//                         Sign up
//                     </h2>
//                     <p className="mt-2 text-center text-md text-gray-600">
//                         already have an account?{" "}
//                         <MyButton>
//                             <a href="/login" className="text-blue-500">
//                                 Log in
//                             </a>
//                         </MyButton>
//                     </p>
//                 </div>
//                 <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
//                     <SignUpForm />
//                 </div>
//             </div>
//         </div>
//     );
// };
// export default SignUpPage;
