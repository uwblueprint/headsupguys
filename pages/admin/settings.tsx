import React, { useState, useEffect } from "react";
import { Flex, Text, Button, useDisclosure, Spacer } from "@chakra-ui/react";

import { Modal } from "@components";
import adminUsers from "data/adminUsers";

const SettingsPage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [toolsArray, setToolsArray] = useState([]);

    return (
        <Flex direction="column" padding="16">
            <Text fontWeight="bold" fontSize="4xl" color="brand.green">
                Settings
            </Text>
            <Flex>
                <Text>User Management</Text>
                <Spacer />

                <Button minWidth="140">Add User</Button>
            </Flex>
        </Flex>
    );
};

export default SettingsPage;
