"use client";
import React, { useState } from "react";
import Link from "next/link";

import TableHeader from "@/components/dashboard/TableHeader";
import DataTable from "@/components/dashboard/DataTable";
import TableFooter from "@/components/dashboard/TableFooter";

import { useGetJobProfile } from "@/queries/jobs";
import { usePagination, useSearchAndSort } from "@/app/hooks";

const Page = () => {
    const { data: jobProfiles, isLoading, isError, error } = useGetJobProfile();
    const [searchTerm, setSearchTerm] = useState("");

    // ✅ Search + Sort
    const filteredJobProfile = useSearchAndSort({
        data: jobProfiles,
        searchTerm,
        searchFields: ["code", "department", "roles.name", "roles.code"],
    });

    // ✅ Pagination
    const pagination = usePagination({
        data: filteredJobProfile,
        itemsPerPage: 10,
    });

    // ✅ Table Columns
    const jobRolesColumns = [
        {
            header: "Department",
            accessor: "department",
        },
        {
            header: "Dept. Code",
            accessor: "code",
        },
        {
            header: "Role Name",
            accessor: "roles",
            cell: (row) =>
                row.roles?.map((role, idx) => (
                    <div key={idx} className="mb-1">
                        {role.name}
                    </div>
                )),
        },
        {
            header: "Role Code",
            accessor: "roles",
            cell: (row) =>
                row.roles?.map((role, idx) => (
                    <div key={idx} className="mb-1">
                        {role.code}
                    </div>
                )),
        },
    ];

    return (
        <div className="p-6 space-y-4">
            {/* ✅ Header with Search + CTA */}
            <TableHeader
                title="Job Profile Table"
                subtitle="Manage all Job Profiles"
                onSearch={setSearchTerm}
            >
                <Link
                    href="/admin/dashboard/job-profile/create-job-profile"
                    className="px-4 py-2 bg-[#9AE600] text-white font-medium rounded-md shadow hover:bg-[#87cc00] transition"
                >
                    + Create Job Profile
                </Link>
            </TableHeader>

            {/* ✅ Table */}
            <DataTable
                isLoading={isLoading}
                columns={jobRolesColumns}
                data={jobProfiles}
                emptyMessage="No job profiles found"
            />

            {/* ✅ Pagination */}
            <TableFooter isLoading={isLoading} pagination={pagination} />
        </div>
    );
};

export default Page;
