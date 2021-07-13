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
        },
        moduleTag: {
            backgroundColor: "#86FC2F",
        },
    };

    return (
        <SimpleGrid columns={2} px={5} py={5} __css={styles.card}>
            <Box px={5}>
                <Flex justify="space-between">
                    <Heading fontSize={20} fontWeight="500">
                        {title}
                        {"  "}
                        {published && <StarIcon boxSize="0.75em" />}
                    </Heading>
                    <Flex>
                        <Button>Link Module</Button>
                        <Button>Publish Tool</Button>
                        <IconButton
                            aria-label="Delete tool"
                            icon={<DeleteIcon />}
                        />
                    </Flex>
                </Flex>

                <Text fontSize={16}>Created By: {creatorsText}</Text>
                {module && (
                    <Tag borderRadius="full" __css={styles.moduleTag}>
                        <TagLeftIcon boxSize="12px" as={CheckIcon} />
                        <TagLabel>
                            {published ? "Module Connected" : "Module Linked"}
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
        </SimpleGrid>
    );
};
