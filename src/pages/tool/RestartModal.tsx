import React from "react";
import {
    Button,
    Heading,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from "@chakra-ui/react";

const RestartModal = ({
    handleRestart,
    isOpen,
    onClose,
    variant,
}: {
    handleRestart: () => void;
    isOpen: boolean;
    onClose: () => void;
    variant: string;
}): React.ReactElement => {
    return (
        <Modal
            isCentered
            isOpen={isOpen}
            onClose={onClose}
            size={variant === "desktop" ? "lg" : "xs"}
        >
            <ModalOverlay />
            <ModalContent borderRadius="0px" padding="10px 0px">
                <ModalHeader>
                    <Heading size="md">
                        Are you sure you want to restart the module?
                    </Heading>
                </ModalHeader>
                <ModalBody fontSize="sm">
                    This will erase all of your previous answers.
                </ModalBody>
                <ModalFooter>
                    <Button
                        marginRight="10px"
                        onClick={onClose}
                        variant="outline"
                    >
                        No, cancel
                    </Button>
                    <Button
                        backgroundColor="brand.green"
                        color="black"
                        onClick={handleRestart}
                    >
                        Yes, restart
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default RestartModal;
