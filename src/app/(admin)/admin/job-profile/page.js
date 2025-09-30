"use client";
import React, { useState } from "react";
import Link from "next/link";

import TableHeader from "@/components/dashboard/TableHeader";
import DataTable from "@/components/dashboard/DataTable";
import TableFooter from "@/components/dashboard/TableFooter";

import { useGetJobProfile } from "@/queries/jobs";

import { Plus } from "lucide-react";

const Page = () => {
    const limit = 9;
    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");

    const { data: jobProfiles, isLoading } = useGetJobProfile(
        page,
        limit,
        searchTerm
    );

    const jobRolesColumns = [
        {
            header: "Job Profile Code",
            accessor: "jobProfileCode",
        },
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
                    <Plus size={18} /> Create
                </Link>
            </TableHeader>

            <DataTable
                isLoading={isLoading}
                columns={jobRolesColumns}
                data={jobProfiles?.data}
                emptyMessage="No job profiles found"
            />

            {jobProfiles?.pagination.total > 0 && (
                <TableFooter
                    onPageChange={setPage}
                    isLoading={isLoading}
                    pagination={jobProfiles?.pagination}
                />
            )}
        </div>
    );
};

export default Page;
