import React from "react";
import {
    Flex,
    Button,
    Heading,
    Spacer,
    Text,
    Icon,
    Box,
    HStack,
    VStack,
    Stack,
} from "@chakra-ui/react";
import { IoTrash } from "react-icons/io5";
import { formatDaysAgo } from "src/utils/datetime/formatDaysAgo";

export const ModuleCard: React.FC<{
    tool?: string;
    lastUpdated?: Date;
    author?: string;
}> = (props) => {
    const { tool, lastUpdated, author } = props;
    return (
        <Flex
            direction="column"
            borderWidth="1px"
            borderColor="background.dark"
            borderRadius="lg"
            overflow="hidden"
            p={8}
        >
            <Flex mb={4} direction="row" alignItems="center">
                <Heading size="lg">Module Title</Heading>
                <Spacer />
                <Icon as={IoTrash} w={8} h={8}></Icon>
            </Flex>
            <Spacer />
            <Stack w="100%" spacing={0}>
                {tool ? (
                    <Text mb={0} color="green">
                        Linked To: {tool}
                    </Text>
                ) : null}
                <Text mb={0} textTransform="capitalize">
                    Last Updated: {formatDaysAgo(lastUpdated)}
                </Text>
                <Text>Created By: {author} </Text>
            </Stack>{" "}
            <Button mt={4} w="100%">
                Link to A Tool
            </Button>
        </Flex>
    );
};
