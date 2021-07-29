import { Modal, ModalProps } from "@components/modal";
import React from "react";

const EditModal: React.FC<ModalProps> = (props) => {
    const { ...rest } = props;

    return (
        <Modal header="Edit User" size="xl" {...rest}>
            {props.children}
        </Modal>
    );
};

export default EditModal;
