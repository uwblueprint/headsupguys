import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@definitions/chakra/theme";
import "@styles/global.css";
import Auth from "../src/components/main/auth";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    const auth = new Auth();
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} auth={auth} />
        </ChakraProvider>
    );
}

export default MyApp;
