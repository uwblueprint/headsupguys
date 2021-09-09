import { Modal, ModalProps } from "@components/modal";
import React from "react";

export interface DeleteModalProps extends ModalProps {
    name: string;
}

const DeleteModal: React.FC<DeleteModalProps> = (props) => {
    const { name } = props;

    return (
        <Modal
            size="xl"
            header={`Delete ${name}`}
            bodyText={`Are you sure you want to delete ${name}? This action cannot be undone.`}
            confirmButtonColorScheme="red"
            {...props}
        />
    );
};

export default DeleteModal;
