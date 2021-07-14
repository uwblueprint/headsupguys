import React from "react";
import { Box, Grid } from "@chakra-ui/react";

import { Navbar, NAVBAR_WIDTH } from "@components/Navbar";

export const Layout: React.FC = ({ children }) => {
    return (
        <Grid
            templateColumns={`${NAVBAR_WIDTH} 1fr`}
            templateRows="100vh"
            h="100vh"
        >
            <Box w="100%" h="100%">
                {/** Navbar width is set manually to keep the position fixed */}
                <Navbar />
            </Box>
            <Box w="100%" h="100%">
                {children}
            </Box>
        </Grid>
    );
};
