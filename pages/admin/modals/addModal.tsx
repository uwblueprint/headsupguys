import { Modal, ModalProps } from "@components/modal";
import React from "react";
import { TextInput } from "@components/textInput";
import { RoleType } from "../settings";

export interface AddModalProps extends ModalProps {
    setEmail: (value: string) => void;
    setRole: (value: RoleType) => void;
}

const AddModal: React.FC<AddModalProps> = (props) => {
    const { setEmail, setRole } = props;
    return (
        <Modal size="xl" header="Add Admin" {...props}>
            <TextInput
                name="email"
                label="Email"
                errorMessage="This email already has an admin account"
                onChange={(e) => setEmail(e.target.value)}
                isRequired={true}
            ></TextInput>
            <TextInput
                name="role"
                label="Role"
                errorMessage="INSERT ERROR MESSAGE HERE"
                onChange={(e) => setRole(e.target.value as RoleType)}
                isRequired={true}
            ></TextInput>
        </Modal>
    );
};

export default AddModal;
