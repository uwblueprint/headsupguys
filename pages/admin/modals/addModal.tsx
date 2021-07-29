import { Modal, ModalProps } from "@components/modal";
import React from "react";

const AddModal: React.FC<ModalProps> = (props) => {
    const { ...rest } = props;

    return (
        <Modal header="Add Admin" size="xl" {...rest}>
            {props.children}
        </Modal>
    );
};

export default AddModal;
