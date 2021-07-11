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
    header: string;
    bodyText?: string;
    cancelText?: string;
    confirmText?: string;
    alignButtonsRight?: boolean;
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
} // TODO pass in style overrides

// to control modals:
// const { isOpen, onOpen, onClose } = useDisclosure();

export const Modal: React.FC<ModalProps> = (props) => {
    const {
        header,
        bodyText,
        cancelText = "Cancel",
        confirmText = "Confirm",
        alignButtonsRight = true,
        isOpen,
        onCancel,
        onConfirm,
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
                        <Button mr="8" onClick={onCancel}>
                            {cancelText}
                        </Button>
                        {!alignButtonsRight && <Spacer />}
                        <Button onClick={onConfirm}>{confirmText}</Button>
                    </ModalFooter>
                </ModalContent>
            </ChakraModal>
        </>
    );
};
