import React from "react";
import { Flex, Button, VStack, Spacer, Link } from "@chakra-ui/react";

import NextLink from "next/link";
const NAVBAR_WIDTH = "280px";

const NavItem = ({ children, to, ...rest }) => (
    <Link as={NextLink} href={to}>
        <Button variant="link" size="sm" as="span" size="lg" {...rest}>
            {children}
        </Button>
    </Link>
);

const Navbar: React.FC = () => {
    return (
        <Flex
            as="nav"
            bg="background.light"
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
            <NavItem to="/" mb={8}>
                HeadsUpGuys
            </NavItem>
            <VStack spacing={2} align="flex-start">
                <NavItem to="/admin/tools">Tools</NavItem>
                <NavItem to="/admin/modules">Modules</NavItem>
                <NavItem to="/admin/insights">Insights</NavItem>
                <NavItem to="/admin/settings">Settings</NavItem>
            </VStack>
            <Spacer />
        </Flex>
    );
};

export { Navbar, NAVBAR_WIDTH };
