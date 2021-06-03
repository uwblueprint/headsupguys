import React, { useState, useEffect } from "react";
import { Spacer, Flex } from "@chakra-ui/react";

import { Header, Main, Cards, Footer } from "@components";

const Home: React.FC = ({ auth }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [profile, setProfile] = useState();

    useEffect(() => {
        setLoggedIn(auth.isAuthenticated());
    }, []);

    useEffect(() => {
        auth.getProfile((profile) => {
            setProfile(profile);
            console.log(profile);
        });
    }, []);

    return (
        <Flex direction="column" minH="100vh">
            <Header />
            <div>This is a protected route</div>
            {loggedIn ? (
                <div>You are logged in</div>
            ) : (
                <div>You aren't logged in</div>
            )}
            {profile && (
                <div>
                    <h1>YOUR PROFILE</h1>
                    <p>Email: {profile.email}</p>
                    <p>Nickname: {profile.nickname}</p>
                    <img src={profile.picture} />
                </div>
            )}
            <Spacer />
            <Footer />
        </Flex>
    );
};

export default Home;
