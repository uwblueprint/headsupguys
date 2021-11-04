import React from "react";
import {
    Flex,
    Text,
    Button,
    Spacer,
    SimpleGrid,
    Stack,
    Spinner,
} from "@chakra-ui/react";
import axios from "axios";
import useSWR from "swr";
import Link from "next/link";

import { ModuleCard } from "@components/ModuleCard";
import { Page } from "types/Page";
import { AdminLayout } from "@components";

const fetcher = async (url) => {
    const response = await axios({
        method: "GET",
        url,
    });
    return response.data;
};

const ModulesHeader: React.FC = () => {
    return (
        <>
            <Flex direction="row">
                <Text mr={2} mb={0} fontWeight="bold" fontSize="4xl">
                    Modules
                </Text>
                <Spacer />
                <Link href="builder">
                    <Button variant="outlineBlack">Create Module</Button>
                </Link>
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
        </>
    );
};

const Modules: React.FC = () => {
    const { data, error } = useSWR("/api/module/getAll", fetcher);
    if (error) return "An error has occurred.";
    if (!data) return <Spinner color="brand.lime" size="xl" />;

    return (
        <SimpleGrid minChildWidth="20rem" spacing={10}>
            {data.map(({ _id, title, toolID, lastUpdated, createdBy }) => (
                <ModuleCard
                    key={_id}
                    moduleId={_id}
                    title={title}
                    tool={toolID}
                    lastUpdated={lastUpdated}
                    author={createdBy.join(", ")}
                />
            ))}
        </SimpleGrid>
    );
};

const ModulesPage: Page = () => {
    return (
        <Stack spacing={8}>
            <ModulesHeader />
            <Modules />
        </Stack>
    );
};

ModulesPage.layout = AdminLayout;

export default ModulesPage;
