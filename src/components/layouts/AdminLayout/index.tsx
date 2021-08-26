import React from "react";
import { Box, ChakraProvider, Grid } from "@chakra-ui/react";

import { Navbar, NAVBAR_WIDTH } from "@components/Navbar";
import { adminTheme } from "@definitions/chakra/theme";

export const AdminLayout: React.FC = ({ children }) => {
    return (
        <ChakraProvider theme={adminTheme}>
            <Grid
                templateColumns={`${NAVBAR_WIDTH} 1fr`}
                templateRows="100vh"
                h="100vh"
            >
                <Box w="100%" h="100%">
                    {/** Navbar width is set manually to keep the position fixed */}
                    <Navbar />
                </Box>
                <Box w="100%" h="100%" p={12}>
                    {children}
                </Box>
            </Grid>
        </ChakraProvider>
    );
};
