import React from "react";
import { Flex, Heading, VStack, Spacer } from "@chakra-ui/react";

const NAVBAR_WIDTH = "280px";

const NavItem = ({ children, ...rest }) => (
    <Heading as="span" size="lg" {...rest}>
        <Flex>{children}</Flex>
    </Heading>
);

const Navbar = () => {
    return (
        <Flex
            as="nav"
            bg="gray.100"
            direction="column"
            w={NAVBAR_WIDTH}
            h="100%"
            px={{ base: 6, md: 8, lg: 12 }}
            py={{ base: 4, sm: 8, md: 12, xl: 20 }}
            justify="space-between"
            overflowX="hidden"
            textTransform="capitalize"
            role="navigation"
            position="fixed"
            left="0"
            top="0"
        >
            <NavItem mb={8}>Home</NavItem>
            <VStack spacing={2} align="flex-start">
                <NavItem>Tools</NavItem>
                <NavItem>Modules</NavItem>
                <NavItem>Insights</NavItem>
                <NavItem>Settings</NavItem>
            </VStack>
            <Spacer />
        </Flex>
    );
};

export { Navbar, NAVBAR_WIDTH };
