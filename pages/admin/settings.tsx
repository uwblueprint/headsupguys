import React, { useState } from "react";
import { Flex, Text, Button, Spacer, useDisclosure } from "@chakra-ui/react";
import adminUsers from "data/adminUsers";
import AddModal from "./modals/addModal";
import EditModal from "./modals/editModal";
import DeleteModal from "./modals/deleteModal";
import SettingsTable from "@components/tables/SettingsTable";
import isEmail from "validator/lib/isEmail";

enum ModalType {
    ADD = "add",
    EDIT = "edit",
    DELETE = "delete",
}

export enum RoleType { // ensure these values are the ones in the data
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER ADMIN",
}

const SettingsPage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure(); // controls all 3 modals
    const [modalType, setModalType] = useState(ModalType.ADD); // determines which modal is shown when isOpen is true
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState(RoleType.ADMIN);
    const [emailError, setEmailError] = useState("");
    const [roleError, setRoleError] = useState("");

    // many states are used by multiple modals and must be set before showing a modal
    const onAddClick = () => {
        setModalType(ModalType.ADD);
        setEmail("");
        setRole(RoleType.ADMIN);
        setEmailError("");
        setRoleError("");
        onOpen();
    };

    const onEditClick = (index: number) => {
        setModalType(ModalType.EDIT);
        setSelectedIndex(index);
        setEmail(adminUserData[index].email);
        setRole(adminUserData[index].role as RoleType);
        setEmailError("");
        setRoleError("");
        onOpen();
    };

    const onDeleteClick = (index: number) => {
        setModalType(ModalType.DELETE);
        setSelectedIndex(index);
        onOpen();
    };

    const checkEmailValidity = (email: string): boolean => {
        if (!email) {
            setEmailError("Please enter an email.");
            return false;
        } else if (!isEmail(email)) {
            setEmailError("Please enter a valid email.");
            return false;
        }
        return true;
    };

    // TODO fetch real data
    const adminUserData = React.useMemo(() => adminUsers, []);

    return (
        <Flex direction="column" padding="16">
            {modalType == ModalType.ADD && (
                <AddModal
                    isOpen={isOpen}
                    onConfirm={() => {
                        if (!checkEmailValidity(email)) return;
                        console.log(
                            `add admin with email: ${email}, role: ${role}`,
                        );
                        // TODO make request to back end
                        onClose();
                    }}
                    onCancel={onClose}
                    setEmail={setEmail}
                    setRole={setRole}
                    emailError={emailError}
                />
            )}
            {modalType == ModalType.EDIT && (
                <EditModal
                    isOpen={isOpen}
                    onConfirm={() => {
                        if (!checkEmailValidity(email)) return;
                        console.log(
                            `edit ${adminUserData[selectedIndex].name} with email: ${email}, role: ${role}`,
                        );
                        // TODO make request to back end
                        onClose();
                    }}
                    onCancel={onClose}
                    setEmail={setEmail}
                    setRole={setRole}
                    currentEmail={email}
                    currentRole={role}
                    emailError={emailError}
                    roleError={roleError}
                />
            )}
            {modalType == ModalType.DELETE && (
                <DeleteModal
                    isOpen={isOpen}
                    onConfirm={() => {
                        console.log(
                            `delete ${adminUserData[selectedIndex].name}`,
                        );
                        // TODO make request to back end
                        onClose();
                    }}
                    onCancel={onClose}
                    name={adminUserData[selectedIndex].name}
                />
            )}
            <Text fontWeight="bold" fontSize="4xl" color="brand.green">
                Settings
            </Text>
            <Flex marginBottom="8">
                <Text>User Management</Text>
                <Spacer />
                <Button minWidth="140" onClick={onAddClick}>
                    Add User
                </Button>
            </Flex>
            <SettingsTable
                data={adminUserData}
                onEditClick={onEditClick}
                onDeleteClick={onDeleteClick}
            />
        </Flex>
    );
};

export default SettingsPage;
