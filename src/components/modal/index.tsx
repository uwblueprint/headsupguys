import React from "react";
import {
    Modal as ChakraModal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Text,
    Spacer,
} from "@chakra-ui/react";
import { Button } from "..";

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
        ...rest
    } = props;

    return (
        <>
            <ChakraModal
                isCentered
                onClose={onCancel}
                isOpen={isOpen}
                {...rest}
            >
                <ModalOverlay />
                <ModalContent p="8">
                    <ModalHeader fontSize="36" fontFamily="Geogrotesque Bold">
                        {header}
                    </ModalHeader>
                    <ModalBody>
                        {bodyText && <Text fontSize="lg">{bodyText}</Text>}
                        {props.children}
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            mr="8"
                            variant="outline"
                            borderColor="black"
                            onClick={onCancel}
                        >
                            {cancelText}
                        </Button>
                        {!alignButtonsRight && <Spacer />}
                        <Button bg={confirmButtonColor} onClick={onConfirm}>
                            {confirmText}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </ChakraModal>
        </>
    );
};
