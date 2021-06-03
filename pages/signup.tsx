import React from "react";
import { Spacer, Flex } from "@chakra-ui/react";
import Auth from "../src/components/main/auth";
import auth0 from "auth0-js";

import { Header, Main, Cards, Footer } from "@components";

const Signup: React.FC = ({ auth }) => {
    console.log(auth);
    // const auth = new Auth();
    // const auth = new auth0.WebAuth({
    //   domain: 'dev-90echocb.us.auth0.com',
    //   clientID: '3OcvtQQ33UfWeIq9GqMnO9P4QyfsiIME',
    //   redirectUri: 'https://localhost:3000',
    //   responseType: "token id_token",
    //   scope: "openid profile email"
    // })

    // const emailLogin = () => {
    //   auth.login({
    //     email: 'test@test.com',
    //     password: 'Blueprint1!',
    //     realm : 'Username-Password-Authentication'
    // },function(err, authResult){
    //     if(err){
    //         console.log("error", err);
    //     }
    //     else{
    //         console.log("success", authResult);
    //   //ajax call to my apis
    //     }
    // });
    // }
    return (
        <Flex direction="column" minH="100vh">
            <Header />
            <div>SIGN UP</div>
            <button onClick={auth.login}>LOG IN</button>
            <Spacer />
            <Footer />
        </Flex>
    );
};

export default Signup;
