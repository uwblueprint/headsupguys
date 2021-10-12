import React, { useEffect, useState } from "react";
import {
    Flex,
    Text,
    Button,
    Spacer,
    SimpleGrid,
    Stack,
} from "@chakra-ui/react";
import axios from "axios";
import Link from "next/link";

import { ModuleCard } from "@components/ModuleCard";
import { Page } from "types/Page";
import { AdminLayout } from "@components";

const ModulesPage: Page = () => {
    const [modules, setModules] = useState([]);

    async function getModules() {
        try {
            const response = await axios({
                method: "GET",
                url: "/api/module/getAll",
            });
            setModules(response.data);
        } catch (err) {
            console.log(err);
            //TODO: update error handling
        }
    }

    // TODO: Implement Create connection

    useEffect(() => {
        getModules();
    }, []);
    return (
        <Stack spacing={8}>
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
            <SimpleGrid minChildWidth="20rem" spacing={10}>
                {modules.map(
                    ({ moduleId, title, toolID, lastUpdated, createdBy }) => (
                        <Link href={`builder?moduleId=${moduleId}`}>
                            <ModuleCard
                                key={moduleId}
                                title={title}
                                tool={toolID}
                                lastUpdated={lastUpdated}
                                author={createdBy.join(", ")}
                            />
                        </Link>
                    ),
                )}
            </SimpleGrid>
        </Stack>
    );
};

ModulesPage.layout = AdminLayout;

export default ModulesPage;
