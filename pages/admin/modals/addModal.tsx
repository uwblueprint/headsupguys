import { Modal, ModalProps } from "@components/modal";
import React from "react";
import { TextInput } from "@components/textInput";
import { RoleType } from "../settings";
import { Box, Flex } from "@chakra-ui/react";
import { DropDown } from "@components/dropDown";

export interface AddModalProps extends ModalProps {
    setEmail: (value: string) => void;
    setRole: (value: RoleType) => void;
    emailError: string;
}

const AddModal: React.FC<AddModalProps> = (props) => {
    const { setEmail, setRole, emailError } = props;

    return (
        <Modal header="Add Admin" size="xl" {...props}>
            <Flex>
                <TextInput
                    name="email"
                    label="Email"
                    isInvalid={emailError != ""}
                    errorMessage={emailError}
                    onChange={(e) => setEmail(e.target.value)}
                    isRequired={true}
                ></TextInput>
                <Box width={8} />
                <DropDown
                    name="role"
                    label="Role"
                    onChange={(e) => setRole(e.target.value as RoleType)}
                    isRequired={true}
                >
                    <option value={RoleType.ADMIN}>Admin</option>
                    <option value={RoleType.SUPER_ADMIN}>Super Admin</option>
                </DropDown>
            </Flex>
        </Modal>
    );
};

export default AddModal;
