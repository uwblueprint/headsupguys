import React from "react";
import { Box } from "@chakra-ui/react";

export const BuilderLayout: React.FC = ({ children }) => {
    return (
        <Box w="100%" h="100%">
            {children}
        </Box>
    );
};
