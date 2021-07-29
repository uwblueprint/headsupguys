import { Modal, ModalProps } from "@components/modal";
import React from "react";

const DeleteModal: React.FC<ModalProps> = (props) => {
    const { ...rest } = props;

    return (
        <Modal confirmButtonColorScheme="red" size="xl" {...rest}>
            {props.children}
        </Modal>
    );
};

export default DeleteModal;
