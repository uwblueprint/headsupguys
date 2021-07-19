import React from "react";
import {
    Heading,
    Center,
    Text,
    VStack,
    Button,
    useDisclosure,
} from "@chakra-ui/react";

import { AdminLayout, Modal } from "@components";
import { ModuleCard } from "@components/ModuleCard";

const StylingTest = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Center>
            <VStack>
                <Heading>Styling Test Page</Heading>
                <Text>This a page for global styling</Text>
                <Button>Button 1</Button>
                <Button variant="brand" onClick={onOpen} size="lg">
                    Button 2 (Open a modal!)
                </Button>

                <Button variant="outline">Button 3</Button>
                <ModuleCard title="Module Title" />
                <Modal
                    header=""
                    isOpen={isOpen}
                    onConfirm={onClose}
                    onCancel={onClose}
                >
                    Test
                </Modal>
            </VStack>
        </Center>
    );
};
// Setting layouts example:
StylingTest.layout = AdminLayout;
export default StylingTest;
