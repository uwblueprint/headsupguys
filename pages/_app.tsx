import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { defaultTheme } from "@definitions/chakra/theme";
import { Page } from "types/Page";
import { PublicLayout } from "@components";
//import Amplify from "aws-amplify";
import awsExports from "../src/aws-exports";
import "@styles/global.css";

//Amplify.configure({ ...awsExports, ssr: true });

type AppPropsWithLayout = AppProps & {
    Component: Page;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
    const Layout = Component.layout || PublicLayout;
    return (
        <ChakraProvider theme={defaultTheme}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </ChakraProvider>
    );
}

export default MyApp;
