import React from "react";
import { Image } from "@chakra-ui/react";
import { useTable } from "react-table";
import { DeleteIcon } from "@chakra-ui/icons";

interface SettingsTableProps {
    data: unknown[];
    onEditClick: (index: number) => void;
    onDeleteClick: (index: number) => void;
}

const SettingsTable: React.FC<SettingsTableProps> = (props) => {
    const { data, onEditClick, onDeleteClick } = props;

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

    return (
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
};

export default SettingsTable;
