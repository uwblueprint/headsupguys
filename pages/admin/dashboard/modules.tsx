import React from "react";
import {
    Flex,
    Text,
    Button,
    Spacer,
    SimpleGrid,
    Stack,
} from "@chakra-ui/react";

import { ModuleCard } from "@components/ModuleCard";
import { Page } from "types/Page";
import { AdminLayout } from "@components";

const Modules: Page = () => {
    const modules = React.useMemo(
        () => [
            {
                moduleId: 1,
                title: "Module Alpha",
                tool: "Starter Tool",
                lastUpdated: new Date("December 17, 1995 03:24:00"),
                author: "Mayank",
            },
            {
                moduleId: 2,
                title: "Module Beta",
                lastUpdated: new Date(Date.now()),
                author: "Tony",
            },
            {
                moduleId: 3,
                title: "Module Gamma",
                lastUpdated: new Date(Date.now()),
                author: "Daniel",
            },
            {
                moduleId: 4,
                title: "Module Phi",
                lastUpdated: new Date(Date.now()),
                author: "Chamod",
            },
            {
                moduleId: 5,
                title: "Module Iota",
                lastUpdated: new Date(Date.now()),
                author: "Jenna",
            },
        ],
        [],
    );
    return (
        <Stack spacing={8}>
            <Flex direction="row">
                <Text mr={2} mb={0} fontWeight="bold" fontSize="4xl">
                    Modules
                </Text>
                <Spacer />
                <Button variant="outlineBlack">Create Module</Button>
            </Flex>

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
            </Flex>
            <SimpleGrid minChildWidth="20rem" spacing={10}>
                {modules.map(
                    ({ moduleId, title, tool, lastUpdated, author }) => (
                        <ModuleCard
                            key={moduleId}
                            title={title}
                            tool={tool}
                            lastUpdated={lastUpdated}
                            author={author}
                        />
                    ),
                )}
            </SimpleGrid>
        </Stack>
    );
};

Modules.layout = AdminLayout;

export default Modules;
