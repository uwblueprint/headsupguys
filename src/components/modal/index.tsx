import React from "react";
import {
    Modal as ChakraModal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Text,
    Spacer,
} from "@chakra-ui/react";

export interface ModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
    header: string;
    bodyText?: string;
    cancelText?: string;
    confirmText?: string;
    alignButtonsRight?: boolean;
    confirmButtonColor?: string;
}

// to control modals:
// const { isOpen, onOpen, onClose } = useDisclosure();

export const Modal: React.FC<ModalProps> = (props) => {
    const {
        isOpen,
        onCancel,
        onConfirm,
        header,
        bodyText,
        cancelText = "Cancel",
        confirmText = "Confirm",
        alignButtonsRight = true,
        confirmButtonColor = "black",
    } = props;

    return (
        <>
            <ChakraModal onClose={onCancel} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{header}</ModalHeader>
                    <ModalBody>
                        {bodyText && <Text fontSize="lg">{bodyText}</Text>}
                        {props.children}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            mr="8"
                            color="black"
                            variant="outline"
                            borderColor="black"
                            onClick={onCancel}
                        >
                            {cancelText}
                        </Button>
                        {!alignButtonsRight && <Spacer />}
                        <Button
                            color="white"
                            bg={confirmButtonColor}
                            onClick={onConfirm}
                        >
                            {confirmText}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </ChakraModal>
        </>
    );
};
