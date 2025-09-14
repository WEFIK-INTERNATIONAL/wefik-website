import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const DataTable = ({ isLoading, columns, data }) => {
    return (
        <div className="w-full overflow-x-auto rounded-xl border border-gray-300 shadow-sm">
            <Table>
                {/* Table Header */}
                <TableHeader>
                    <TableRow>
                        {columns.map((col, index) => (
                            <TableHead
                                key={index}
                                className={`px-4 py-3 text-left text-sm font-semibold text-gray-400 ${
                                    col.align === "center"
                                        ? "text-center"
                                        : col.align === "right"
                                          ? "text-right"
                                          : "text-left"
                                }`}
                            >
                                {col.header}
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="px-4 py-6 text-center text-gray-500"
                            >
                                Loading...
                            </TableCell>
                        </TableRow>
                    ) : data?.length > 0 ? (
                        data.map((row, rowIndex) => (
                            <TableRow
                                key={rowIndex}
                                className="hover:bg-gray-50 transition-colors hover:text-black"
                            >
                                {columns.map((col) => (
                                    <TableCell
                                        key={col.accessor}
                                        className={`px-4 py-3 text-sm ${
                                            col.align === "center"
                                                ? "text-center"
                                                : col.align === "right"
                                                  ? "text-right"
                                                  : "text-left"
                                        }`}
                                    >
                                        {col.cell
                                            ? col.cell(row)
                                            : row[col.accessor]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="px-4 py-6 text-center text-gray-500"
                            >
                                No data available
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default DataTable;
