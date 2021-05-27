import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@definitions/chakra/theme";
import "@styles/global.css";
import { UserProvider } from "@auth0/nextjs-auth0";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    return (
        <UserProvider>
            <ChakraProvider theme={theme}>
                <Component {...pageProps} />
                <a href="/api/auth/login">Login</a>
                <a href="/api/auth/logout">Logout</a>
            </ChakraProvider>
        </UserProvider>
    );
}

export default MyApp;
