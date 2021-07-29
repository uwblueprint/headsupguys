import { Modal, ModalProps } from "@components/modal";
import React from "react";

const DeleteModal: React.FC<ModalProps> = (props) => {
    const { isOpen, onCancel, onConfirm, ...rest } = props;

    return (
        <Modal
            isOpen={isOpen}
            onConfirm={onConfirm}
            onCancel={onCancel}
            confirmButtonColorScheme="red"
            size="xl"
            {...rest}
        >
            {props.children}
        </Modal>
    );
};

export default DeleteModal;
