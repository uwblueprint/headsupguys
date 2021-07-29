import { Modal, ModalProps } from "@components/modal";
import React from "react";

const EditModal: React.FC<ModalProps> = (props) => {
    const { isOpen, onCancel, onConfirm, ...rest } = props;

    return (
        <Modal
            header="Edit User"
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

export default EditModal;
