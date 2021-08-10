import React, { useEffect, useState } from "react";
import {
    Flex,
    Text,
    Button,
    Spacer,
    SimpleGrid,
    Stack,
} from "@chakra-ui/react";
import axios from "axios"; // axios

import { ModuleCard } from "@components/ModuleCard";
import { Page } from "types/Page";
import { AdminLayout } from "@components";

// const ObjectId = require("mongodb").ObjectId;

const Modules: React.FC = () => {
    // const [isLoading, setIsLoading] = useState(true);
    const [modules, setModules] = useState([]);
    // const modules = React.useMemo(
    //     () => [
    //         {
    //             moduleId: 1,
    //             title: "Module Alpha",
    //             tool: "Starter Tool",
    //             lastUpdated: new Date("December 17, 1995 03:24:00"),
    //             author: "Mayank",
    //         },
    //         {
    //             moduleId: 2,
    //             title: "Module Beta",
    //             lastUpdated: new Date(Date.now()),
    //             author: "Tony",
    //         },
    //         {
    //             moduleId: 3,
    //             title: "Module Gamma",
    //             lastUpdated: new Date(Date.now()),
    //             author: "Daniel",
    //         },
    //         {
    //             moduleId: 4,
    //             title: "Module Phi",
    //             lastUpdated: new Date(Date.now()),
    //             author: "Chamod",
    //         },
    //         {
    //             moduleId: 5,
    //             title: "Module Iota",
    //             lastUpdated: new Date(Date.now()),
    //             author: "Jenna",
    //         },
    //     ],
    //     [],
    // );

    async function getModules() {
        try {
            const response = await axios({
                method: "GET",
                url: "/api/module/getAll",
            });
            setModules(response.data);
            console.log(response.data);
        } catch (err) {
            console.log(err);
            //TODO: update error handling
        }
    }

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
                    ({ moduleId, title, toolID, lastUpdated, createdBy }) => (
                        <ModuleCard
                            key={moduleId}
                            title={title}
                            tool={toolID}
                            // lastUpdated={ObjectId(moduleId).getTimestamp()}
                            author={createdBy}
                        />
                    ),
                )}
            </SimpleGrid>
        </Stack>
    );
};

Modules.layout = AdminLayout;

export default Modules;
