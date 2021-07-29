import { Modal, ModalProps } from "@components/modal";
import React from "react";

const AddModal: React.FC<ModalProps> = (props) => {
    const { isOpen, onCancel, onConfirm, ...rest } = props;

    return (
        <Modal
            header="Add Admin"
            isOpen={isOpen}
            onConfirm={onConfirm}
            onCancel={onCancel}
            size="xl"
            {...rest}
        >
            {props.children}
        </Modal>
    );
};

export default AddModal;
