import { Modal } from "@components/modal";
import React from "react";

export interface AddModalProps {
    isOpen: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const AddModal: React.FC<AddModalProps> = (props) => {
    const { isOpen, onCancel, onConfirm, ...rest } = props;

    return (
        <Modal
            header="Add Admin"
            isOpen={isOpen}
            onConfirm={onConfirm}
            onCancel={onCancel}
        >
            {props.children}
        </Modal>
    );
};

export default AddModal;
