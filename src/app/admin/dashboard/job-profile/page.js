"use client";
import React, { useState } from "react";
import Link from "next/link";

import TableHeader from "@/components/dashboard/TableHeader";
import DataTable from "@/components/dashboard/DataTable";
import TableFooter from "@/components/dashboard/TableFooter";

import { useGetJobProfile } from "@/queries/jobs";
import { usePagination, useSearchAndSort } from "@/app/hooks";

import { Plus } from "lucide-react";

const Page = () => {
    const { data: jobProfiles, isLoading, isError, error } = useGetJobProfile();
    const [searchTerm, setSearchTerm] = useState("");

    // ✅ Search + Sort
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
                    <div key={idx} className="mb-1">
                        {role.code}
                    </div>
                )),
        },
    ];

    return (
        <div className="">
            <TableHeader
                title="Job Profile Table"
                subtitle="Manage all Job Profiles"
                onSearch={setSearchTerm}
            >
                <Link
                    href="/admin/dashboard/job-profile/create-job-profile"
                    className="flex justify-center items-center gap-2 px-4 py-[5px] bg-[#CDD2DA] text-black font-bold rounded-md shadow hover:bg-[#b1b5bd] transition"
                >
                    <Plus size={18}/> Create
                </Link>
            </TableHeader>

            <DataTable
                isLoading={isLoading}
                columns={jobRolesColumns}
                data={jobProfiles}
                emptyMessage="No job profiles found"
            />

            <TableFooter isLoading={isLoading} pagination={pagination} />
        </div>
    );
};

export default Page;
