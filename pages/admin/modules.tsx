import React from "react";
import {
    Heading,
    Flex,
    Center,
    Text,
    VStack,
    Button,
    Spacer,
    Box,
    SimpleGrid,
    Stack,
} from "@chakra-ui/react";

import { ModuleCard } from "@components/ModuleCard";
import { Page } from "types/Page";
import { AdminLayout } from "@components";

const Modules: Page = () => {
    const data = React.useMemo(
        () => [
            {
                tool: "Starter Tool",
                lastUpdated: new Date("December 17, 1995 03:24:00"),
                author: "Mayank",
            },
            {
                lastUpdated: new Date(Date.now()),
                author: "Tony",
            },
            {
                lastUpdated: new Date(Date.now()),
                author: "Daniel",
            },
            {
                lastUpdated: new Date(Date.now()),
                author: "Chamod",
            },
            {
                lastUpdated: new Date(Date.now()),
                author: "Jenna",
            },
        ],
        [],
    );
    return (
        <Stack spacing={8}>
            <Heading size="2xl">Modules</Heading>
            <Flex direction="row">
                <Button
                    color="black"
                    textDecoration="underline"
                    variant="link"
                    mr={4}
                >
                    Drafts
                </Button>
                <Button variant="link">Published</Button>
                <Spacer />
                <Button variant="outlineBlack">Create Module</Button>
            </Flex>
            <SimpleGrid minChildWidth="20rem" spacing={10}>
                {/* <SimpleGrid columns={3} spacing={10}> */}
                {data.map(({ tool, lastUpdated, author }) => (
                    <ModuleCard
                        tool={tool}
                        lastUpdated={lastUpdated}
                        author={author}
                    />
                ))}
            </SimpleGrid>
        </Stack>
    );
};

Modules.layout = AdminLayout;

export default Modules;
