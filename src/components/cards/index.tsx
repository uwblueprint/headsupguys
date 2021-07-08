import React from "react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import {
    SimpleGrid,
    Box,
    Heading,
    Text,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";

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
                    <Menu>
                        {({ isOpen }) => (
                            <>
                                <MenuButton
                                    isActive={isOpen}
                                    as={Button}
                                    rightIcon={<ChevronDownIcon />}
                                >
                                    {isOpen ? "Close" : "Open"}
                                </MenuButton>
                                <MenuList>
                                    <MenuItem>Download</MenuItem>
                                    <MenuItem
                                        onClick={() => alert("Kagebunshin")}
                                    >
                                        Create a Copy
                                    </MenuItem>
                                </MenuList>
                            </>
                        )}
                    </Menu>
                </Box>
            ))}
        </SimpleGrid>
    );
};

export const SelfCheckQuestionCards: React.FC = () => {
    return (
        <SimpleGrid columns={1} spacing={10} px={10} py={10}>
            {(selfCheckData?.plugins ?? []).map((plugin) => (
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
