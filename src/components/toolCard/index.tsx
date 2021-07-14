import React, { useState } from "react";
import {
    SimpleGrid,
    Box,
    Heading,
    Text,
    InputProps,
    Tag,
    TagLeftIcon,
    TagLabel,
    Flex,
    Button,
    IconButton,
    Tooltip,
} from "@chakra-ui/react";
import { CheckIcon, DeleteIcon, StarIcon } from "@chakra-ui/icons";

export interface ToolCardProps extends InputProps {
    title: string;
    creators: string[];
    updated: Date;
    module: boolean;
    published: boolean;
    image?: string;
    onLinkModule(event: any): any;
    onPublish(event: any): any;
    onDelete(event: any): any;
}

export const ToolCard: React.FC<ToolCardProps> = ({
    title,
    creators,
    updated,
    module,
    published,
    image,
    onLinkModule,
    onPublish,
    onDelete,
}) => {
    console.log(creators);
    const creatorsText = creators.map((name, i) =>
        i == creators.length - 1 ? name : name + ", ",
    );
    const currentDate = new Date();
    const lastUpdated = Math.round(
        Math.abs(
            (currentDate.getTime() - updated.getTime()) / (24 * 60 * 60 * 1000),
        ),
    );

    const styles = {
        card: {
            border: "1px solid #000",
            width: "850px",
        },
        moduleTag: {
            backgroundColor: "#86FC2F",
        },
    };

    return (
        <SimpleGrid columns={2} px={5} py={5} __css={styles.card}>
            <Flex>
                <Box bg="lightgrey" w="25%" h="157px" />
                <Box px={10} w="75%">
                    <Flex justify="space-between">
                        <Heading fontSize={20} fontWeight="500">
                            {title}
                            {"  "}
                            {published && <StarIcon boxSize="0.75em" />}
                        </Heading>
                        <Flex justify="space-around" w="60%">
                            {!published && (
                                <Button variant="outline" borderColor="black">
                                    {module ? "Unlink" : "Link Module"}
                                </Button>
                            )}
                            {!published && !module ? (
                                <Tooltip
                                    label="Link a module to publish your tool!"
                                    hasArrow
                                    placement="top"
                                >
                                    <Button colorScheme="blackAlpha">
                                        Publish Tool
                                    </Button>
                                </Tooltip>
                            ) : (
                                <Button colorScheme="blackAlpha">
                                    {published
                                        ? "Unpublish Tool"
                                        : "Publish Tool"}
                                </Button>
                            )}
                            {!published && (
                                <IconButton
                                    aria-label="Delete tool"
                                    variant="ghost"
                                    icon={<DeleteIcon />}
                                />
                            )}
                        </Flex>
                    </Flex>
                    <br />
                    <Text fontSize={16}>Created By: {creatorsText}</Text>
                    {module && (
                        <Tag borderRadius="full" __css={styles.moduleTag}>
                            <TagLeftIcon boxSize="12px" as={CheckIcon} />
                            <TagLabel>
                                {published
                                    ? "Module Connected"
                                    : "Module Linked"}
                            </TagLabel>
                        </Tag>
                    )}
                    <Text fontSize={16} align="right">
                        Last Updated{" "}
                        {lastUpdated === 0
                            ? "Today"
                            : lastUpdated === 1
                            ? "Yesterday"
                            : lastUpdated + " days ago"}
                    </Text>
                </Box>
            </Flex>
        </SimpleGrid>
    );
};
