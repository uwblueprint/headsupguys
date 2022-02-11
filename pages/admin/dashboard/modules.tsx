import React, { useState } from "react";
import {
    Flex,
    Text,
    Button,
    Spacer,
    SimpleGrid,
    Stack,
    Spinner,
    useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import useSWR, { useSWRConfig } from "swr";
import Link from "next/link";
import { isAuthenticated } from "src/utils/auth/authHelpers";
import { GetServerSideProps } from "next";
import { ModuleCard } from "@components/ModuleCard";
import { Page } from "types/Page";
import { AdminLayout, Modal } from "@components";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
    if (process.env.NODE_ENV == "production") {
        const authProps = await isAuthenticated(req, res, "/redirect", true); // TODO: change redirect to login page (once we have a login page that's deployed)
        return {
            props: {
                auth: authProps,
            },
        };
    } else {
        return {
            props: {},
        };
    }
};

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
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedModule, setSelectedModule] = useState("");
    const [selectedModuleId, setSelectedModuleId] = useState("");
    const [selectedModuleTool, setSelectedModuleTool] = useState("");
    const deleteConfirmation =
        selectedModuleTool === ""
            ? `Are you sure you want to delete the ${selectedModule} module? This action cannot be undone.`
            : `Are you sure you want to delete the ${selectedModule} module? This will unpublish the ${selectedModuleTool} tool and the ${selectedModule} module and cannot be undone.`;

    const { mutate } = useSWRConfig();
    const { data, error } = useSWR(
        "/api/module/getAll?getToolTitles=true",
        fetcher,
    );
    if (error) return <div>An error has occurred.</div>;
    if (!data) return <Spinner color="brand.lime" size="xl" />;

    const onDelete = (e, moduleName, moduleId, moduleTool) => {
        setSelectedModule(moduleName);
        setSelectedModuleId(moduleId);
        setSelectedModuleTool(moduleTool);
        onOpen();
        e.stopPropagation();
    };

    const deleteModule = async () => {
        await axios({
            method: "DELETE",
            url: `/api/module/del?id=${selectedModuleId}`,
        });
        mutate("/api/module/getAll");
        setSelectedModule("");
        setSelectedModuleId("");
        setSelectedModuleTool("");
        onClose();
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onCancel={onClose}
                onConfirm={() => {
                    deleteModule();
                }}
                header={`Delete ${selectedModule} Module`}
                bodyText={deleteConfirmation}
                confirmText={`Yes, delete`}
                confirmButtonColorScheme={`red`}
            />
            <SimpleGrid minChildWidth="20rem" spacing={10}>
                {data.map(({ _id, title, toolID, lastUpdated, createdBy }) => (
                    <ModuleCard
                        key={_id}
                        moduleId={_id}
                        title={title}
                        tool={toolID ? toolID.title : toolID}
                        lastUpdated={lastUpdated}
                        author={createdBy.join(", ")}
                        onDelete={onDelete}
                    />
                ))}
            </SimpleGrid>
        </>
    );
};

const ModulesPage: Page = () => {
    return (
        <Stack marginBottom="40px" spacing={8}>
            <ModulesHeader />
            <Modules />
        </Stack>
    );
};

ModulesPage.layout = AdminLayout;

export default ModulesPage;
