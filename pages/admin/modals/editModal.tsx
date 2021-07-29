import { Modal, ModalProps } from "@components/modal";
import React from "react";

const EditModal: React.FC<ModalProps> = (props) => {
    const modalProps = { size: "xl", ...props };

    return (
        <Modal header="Edit User" size="xl" {...modalProps}>
            {props.children}
        </Modal>
    );
};

export default EditModal;
