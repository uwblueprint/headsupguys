import { Modal, ModalProps } from "@components/modal";
import React from "react";

const DeleteModal: React.FC<ModalProps> = (props) => {
    const modalProps = { size: "xl", ...props };

    return (
        <Modal confirmButtonColorScheme="red" {...modalProps}>
            {props.children}
        </Modal>
    );
};

export default DeleteModal;
