import { Modal } from "@components/modal";
import React from "react";

export interface EditModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const EditModal: React.FC<EditModalProps> = (props) => {
    const { isOpen, onCancel, onConfirm, ...rest } = props;

    return (
        <Modal
            header="Edit User"
            isOpen={isOpen}
            onConfirm={onConfirm}
            onCancel={onCancel}
            size="xl"
        >
            {props.children}
        </Modal>
    );
};

export default EditModal;
