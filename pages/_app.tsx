import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@definitions/chakra/theme";
import "@styles/global.css";
import { Page } from "types/Page";
import { PublicLayout } from "@components";

type AppPropsWithLayout = AppProps & {
    Component: Page;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
    const Layout = Component.layout || PublicLayout;
    return (
        <ChakraProvider theme={theme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ChakraProvider>
    );
}

export default MyApp;
