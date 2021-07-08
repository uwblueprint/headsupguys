import React from "react";
import {
    SimpleGrid,
    Flex,
    Box,
    Heading,
    Text,
    Input,
    Menu,
    Button,
    Icon,
    Select,
} from "@chakra-ui/react";

import { ArrowDownIcon } from "@chakra-ui/icons";

import data from "@public/meta.json";
import selfCheckData from "@public/selfCheckQuestions.json";

export const Cards: React.FC = () => {
    return (
        <SimpleGrid columns={4} spacing={10} px={20} py={10}>
            {(data?.plugins ?? []).map((plugin) => (
                <Box key={plugin.name}>
                    <Heading fontSize={16} fontWeight="500" py={5}>
                        {plugin.name}
                    </Heading>
                    <Text fontSize={14}>{plugin.description}</Text>
                </Box>
            ))}
        </SimpleGrid>
    );
};

export const SelfCheckQuestionCards: React.FC = () => {
    return (
        <SimpleGrid columns={1} spacing={10} px={10} py={10}>
            {(selfCheckData?.plugins ?? []).map((plugin) => (
                <Box key={plugin.name} boxShadow={"2xl"} rounded={"md"} p={6}>
                    <Flex alignContent="center">
                        <Menu>
                            <Heading
                                fontSize={16}
                                fontWeight="500"
                                alignSelf="center"
                                mr={6}
                            >
                                {plugin.name}
                            </Heading>
                            <Input placeholder="Title" width={"full"} mr={6} />
                            <Select fitContent width={200} mr={6}>
                                <option value="option1">Multi Select</option>
                                <option value="option2">Short Answer</option>
                                <option value="option3">Long Answer</option>
                                <option value="option4">Slider</option>
                            </Select>
                        </Menu>
                        <Button>
                            <Icon as={ArrowDownIcon} />
                        </Button>
                    </Flex>
                    <Text fontSize={14}>{plugin.description}</Text>
                </Box>
            ))}
        </SimpleGrid>
    );
};
