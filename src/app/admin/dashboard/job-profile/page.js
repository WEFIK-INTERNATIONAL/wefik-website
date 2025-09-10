"use client";
import React, { useState } from "react";
import Link from "next/link";

import TableHeader from "@/components/dashboard/TableHeader";
import DataTable from "@/components/dashboard/DataTable";
import TableFooter from "@/components/dashboard/TableFooter";
import ActionDropdown from "@/components/dashboard/ActionDropdown";

import { useGetJobProfile } from "@/queries/jobs";
import { usePagination, useSearchAndSort } from "@/app/hooks";

const page = () => {
    const { data: jobProfiles, isLoading, error, isError } = useGetJobProfile();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredJobProfile = useSearchAndSort({
        data: jobProfiles,
        searchTerm,
        searchFields: ["code", "department", "roles.name", "roles.code"],
    });

    const pagination = usePagination({
        data: filteredJobProfile,
        itemsPerPage: 10,
    });

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
                    <div key={idx} className="mb-1 text-gray-600">
                        {role.code}
                    </div>
                )),
        },
    ];

    return (
        <div>
            <TableHeader
                title="Job Profile Table"
                subtitle="Manage all Job Profiles"
                onSearch={setSearchTerm}
            >
                <Link
                    href="/admin/dashboard/job-profile/create-job-profile"
                    className="px-4 py-1 bg-[#9AE600]/80 text-white rounded-md hover:bg-[#9AE600]/70 transition"
                >
                    Create Job Profile
                </Link>
            </TableHeader>

            <DataTable
                isLoading={isLoading}
                columns={jobRolesColumns}
                data={jobProfiles}
            />

            <TableFooter isLoading={isLoading} pagination={pagination} />
        </div>
    );
};

export default page;
