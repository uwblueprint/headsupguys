import React, { Fragment } from "react";
import { AppProps } from "next/app";
import Script from "next/script";
import Head from "next/head";
import { ChakraProvider } from "@chakra-ui/react";
import { defaultTheme } from "@definitions/chakra/theme";
import { Page } from "types/Page";
import { PublicLayout } from "@components";
import Amplify from "aws-amplify";
import awsExports from "../src/aws-exports";
import "@styles/global.css";

Amplify.configure({ ...awsExports, ssr: true });

type AppPropsWithLayout = AppProps & {
    Component: Page;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout): JSX.Element {
    const Layout = Component.layout || PublicLayout;

    return (
        <>
            {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID && (
                <>
                    <Script
                        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`}
                        strategy="afterInteractive"
                    />
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){window.dataLayer.push(arguments);}
                        gtag('js', new Date());

                        gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}');
                        `}
                    </Script>
                </>
            )}
            <ChakraProvider theme={defaultTheme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ChakraProvider>
        </>
    );
}

export default MyApp;
