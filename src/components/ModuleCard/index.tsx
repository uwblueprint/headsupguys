import React from "react";
import {
    Flex,
    Button,
    Heading,
    Spacer,
    Text,
    Icon,
    IconButton,
    Stack,
} from "@chakra-ui/react";
import Link from "next/link";
import { IoTrash } from "react-icons/io5";
import { formatDaysAgo } from "src/utils/datetime/formatDaysAgo";

export const ModuleCard: React.FC<{
    moduleId: string;
    title: string;
    tool?: string;
    lastUpdated?: Date;
    author?: string;
    onDelete(event: any, arg2: any, arg3: any, arg4: any): void;
}> = (props) => {
    const { moduleId, tool, lastUpdated, author, title, onDelete } = props;
    return (
        <Link href={`builder?moduleId=${moduleId}`} passHref>
            <Flex
                direction="column"
                borderWidth="1px"
                borderColor="background.dark"
                borderRadius="lg"
                overflow="hidden"
                p={8}
                _hover={{ cursor: "pointer" }}
            >
                <Flex mb={4} direction="row" alignItems="center">
                    <Heading size="lg">{title}</Heading>
                    <Spacer />
                    <IconButton
                        aria-label="Delete module"
                        icon={<IoTrash size={20} />}
                        onClick={(e) => {
                            const moduleTool = tool ? tool : "";
                            onDelete(e, title, moduleId, moduleTool);
                        }}
                        variant="ghost"
                    />
                </Flex>
                <Spacer />
                <Stack w="100%" spacing={0}>
                    {tool ? (
                        <Text mb={0} color="green">
                            Linked To: {tool}
                        </Text>
                    ) : null}
                    <Text mb={0} textTransform="capitalize">
                        Last Updated:{" "}
                        {lastUpdated && formatDaysAgo(lastUpdated)}
                    </Text>
                    <Text>Created By: {author} </Text>
                </Stack>
                <Button mt={4} w="100%">
                    Link to a Tool
                </Button>
            </Flex>
        </Link>
    );
};
