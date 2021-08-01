import { Flex, Box } from "@chakra-ui/react";
import { DropDown } from "@components/dropDown";
import { Modal, ModalProps } from "@components/modal";
import { TextInput } from "@components/textInput";
import React from "react";
import { RoleType } from "../settings";

export interface EditModalProps extends ModalProps {
    setEmail: (value: string) => void;
    setRole: (value: RoleType) => void;
    currentEmail: string;
    currentRole: RoleType;
    emailError: string;
    roleError: string;
}

const EditModal: React.FC<EditModalProps> = (props) => {
    const {
        setEmail,
        setRole,
        currentEmail,
        currentRole,
        emailError,
        roleError,
    } = props;

    console.log(currentRole);

    return (
        <Modal size="xl" header="Edit User" {...props}>
            <Flex>
                <TextInput
                    name="email"
                    label="Email"
                    defaultValue={currentEmail}
                    isInvalid={emailError != ""}
                    errorMessage={emailError}
                    onChange={(e) => setEmail(e.target.value)}
                    isRequired={true}
                ></TextInput>
                <Box width={8} />
                <DropDown
                    name="role"
                    label="Role"
                    placeholder={
                        currentRole == RoleType.ADMIN ? "Admin" : "Super Admin"
                    }
                    isInvalid={roleError != ""}
                    errorMessage={roleError}
                    onChange={(e) => setRole(e.target.value as RoleType)}
                    isRequired={true}
                >
                    {/* placeholder is automatically an option, prevent duplicating the same option*/}
                    {currentRole != RoleType.ADMIN && (
                        <option value={RoleType.ADMIN}>Admin</option>
                    )}
                    {currentRole != RoleType.SUPER_ADMIN && (
                        <option value={RoleType.SUPER_ADMIN}>
                            Super Admin
                        </option>
                    )}
                </DropDown>
            </Flex>
        </Modal>
    );
};

export default EditModal;
