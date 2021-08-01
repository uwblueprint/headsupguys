import React, { useState } from "react";
import {
    Flex,
    Text,
    Button,
    Spacer,
    Image,
    useDisclosure,
} from "@chakra-ui/react";
import { useTable } from "react-table";
import adminUsers from "data/adminUsers";
import { DeleteIcon } from "@chakra-ui/icons";
import { TextInput } from "@components/textInput";
import AddModal from "./modals/addModal";
import EditModal from "./modals/editModal";
import DeleteModal from "./modals/deleteModal";

enum ModalType {
    ADD = "add",
    EDIT = "edit",
    DELETE = "delete",
}

export enum RoleType {
    ADMIN = "admin",
    SUPER_ADMIN = "super",
}

const SettingsPage: React.FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [modalType, setModalType] = useState(ModalType.ADD);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [email, setEmail] = useState("");
    const [role, setRole] = useState(RoleType.ADMIN);

    const onAddClick = () => {
        setModalType(ModalType.ADD);
        setEmail("");
        setRole(RoleType.ADMIN);
        onOpen();
    };

    const onEditClick = (index: number) => {
        setModalType(ModalType.EDIT);
        setSelectedIndex(index);
        setEmail(data[index].email);
        setRole(data[index].role as RoleType);
        onOpen();
    };

    const onDeleteClick = (index: number) => {
        setModalType(ModalType.DELETE);
        setSelectedIndex(index);
        onOpen();
    };

    const data = React.useMemo(() => adminUsers, []);
    const columns = React.useMemo(
        () => [
            {
                Header: "EDIT",
                Cell: ({ row }) => (
                    <Image
                        src="/icons/edit.svg"
                        width="4"
                        height="4"
                        marginLeft="2"
                        onClick={() => onEditClick(row.index)}
                    />
                ),
            },
            {
                Header: "USER NAME",
                accessor: "name", // accessor is the "key" in the data
            },
            {
                Header: "USER EMAIL",
                accessor: "email",
            },
            {
                Header: "USER ROLE",
                accessor: "role",
            },
            {
                Header: "DELETE",
                Cell: ({ row }) => (
                    <DeleteIcon
                        width="4"
                        height="4"
                        marginLeft="4"
                        onClick={() => onDeleteClick(row.index)}
                    />
                ),
            },
        ],
        [],
    );
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    const table = (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th
                                {...column.getHeaderProps()}
                                style={{
                                    borderBottom: "solid 3px gainsboro",
                                    textAlign: "left",
                                    paddingBottom: "10px",
                                    fontFamily: "Geogrotesque Bold",
                                }}
                            >
                                {column.render("Header")}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody
                {...getTableBodyProps()}
                style={{
                    borderBottom: "solid 2px gainsboro",
                }}
            >
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        style={{
                                            padding: "10px 0px",
                                        }}
                                    >
                                        {cell.render("Cell")}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );

    const editModalContent = (
        <TextInput
            name="email"
            label="Email"
            errorMessage="This email already"
        ></TextInput>
    );

    return (
        <Flex direction="column" padding="16">
            {modalType == ModalType.ADD && (
                <AddModal
                    isOpen={isOpen}
                    onConfirm={() => {
                        console.log(
                            `add admin with email: ${email}, role: ${role}`,
                        );
                        onClose();
                    }}
                    onCancel={onClose}
                    setEmail={setEmail}
                    setRole={setRole}
                />
            )}
            {modalType == ModalType.EDIT && (
                <EditModal
                    isOpen={isOpen}
                    onConfirm={() => {
                        console.log(`edited index ${selectedIndex}`);
                        onClose();
                    }}
                    onCancel={onClose}
                >
                    {editModalContent}
                </EditModal>
            )}
            {modalType == ModalType.DELETE && (
                <DeleteModal
                    isOpen={isOpen}
                    onConfirm={() => {
                        console.log(`deleted index ${selectedIndex}`);
                        onClose();
                    }}
                    onCancel={onClose}
                    name={data[selectedIndex].name}
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
            {table}
        </Flex>
    );
};

export default SettingsPage;
