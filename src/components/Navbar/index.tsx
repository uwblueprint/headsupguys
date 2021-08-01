import React from "react";
import {
    Flex,
    Heading,
    VStack,
    Spacer,
    Link,
    Button,
    Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/dist/client/router";
const NAVBAR_WIDTH = "280px";

const NavItem = ({ children, to, ...rest }) => {
    const router = useRouter();
    const active = to == router.pathname;
    return (
        <Link as={NextLink} href={to}>
            <Button
                variant="link"
                color="black"
                isActive={active}
                _hover={{ color: "gray.700" }}
                _active={{ fontWeight: 700, textDecoration: "underline" }}
                size="sm"
                fontSize="2xl"
                {...rest}
            >
                {children}
            </Button>
        </Link>
    );
};

const Navbar: React.FC = () => {
    return (
        <Flex
            as="nav"
            bg="background.light"
            direction="column"
            w={NAVBAR_WIDTH}
            h="100%"
            px={{ base: 6, md: 8, lg: 12 }}
            py={{ base: 4, sm: 8, md: 12, xl: 16 }}
            justify="space-between"
            overflowX="hidden"
            textTransform="capitalize"
            alignItems="flex-start"
            role="navigation"
            position="fixed"
            left="0"
            top="0"
        >
            <Text fontSize="2xl" mb={12} fontWeight={700}>
                HeadsUpGuys
            </Text>
            <VStack spacing={2} align="flex-start">
                <NavItem to="/admin/dashboard/tools">Tools</NavItem>
                <NavItem to="/admin/dashboard/modules">Modules</NavItem>
                <NavItem to="/admin/dashboard/insights">Insights</NavItem>
                <NavItem to="/admin/dashboard/settings">Settings</NavItem>
            </VStack>
            <Spacer />
        </Flex>
    );
};

export { Navbar, NAVBAR_WIDTH };
