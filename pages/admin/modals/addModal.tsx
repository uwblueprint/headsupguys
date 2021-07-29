import { Modal, ModalProps } from "@components/modal";
import React from "react";

const AddModal: React.FC<ModalProps> = (props) => {
    const modalProps = { size: "xl", ...props };

    return (
        <Modal header="Add Admin" {...modalProps}>
            {props.children}
        </Modal>
    );
};

export default AddModal;
