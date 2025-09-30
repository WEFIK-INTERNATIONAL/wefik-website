"use client";
import React, { useState } from "react";
import Link from "next/link";

import { Plus } from "lucide-react";
import { formatDate } from "@/utils/formatDate";
import StatusBadge from "@/components/StatusBadge";

import DataTable from "@/components/dashboard/DataTable";
import TableFooter from "@/components/dashboard/TableFooter";
import TableHeader from "@/components/dashboard/TableHeader";
import ActionDropdown from "@/components/dashboard/ActionDropdown";

import { useGetJobs, useUpdateJobStatus, useDeleteJob } from "@/queries/jobs";

export default function JobsPage() {
    const limit = 9;
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");

    const { data: jobs, isLoading } = useGetJobs(page, limit, search, sort);
    const { mutate: updateStatus, isPending: updateIsPending } =
        useUpdateJobStatus();
    const { mutate: deleteJob, isPending: deleteIsPending } = useDeleteJob();

    // 📝 Columns for Jobs Table
    const columns = [
        { header: "Job ID", accessor: "jobId" },
        { header: "Job Title", accessor: "jobProfile" },
        { header: "Employment Type", accessor: "type", align: "center" },
        { header: "Openings", accessor: "openings", align: "center" },
        { header: "Location", accessor: "location", align: "center" },
        {
            header: "Last Date",
            accessor: "applicationDeadline",
            cell: (row) => formatDate(row.applicationDeadline),
        },
        {
            header: "Status",
            accessor: "status",
            align: "center",
            cell: (row) => <StatusBadge status={row.status} />,
        },
        {
            header: "Actions",
            accessor: "_id",
            align: "center",
            cell: (row) => (
                <div className="flex justify-center">
                    <ActionDropdown
                        viewDetailsPath={`/admin/dashboard/jobs/${row.jobId}`}
                        editAction={{
                            path: `/admin/dashboard/jobs/${row.jobId}/edit`,
                            triggerLabel: "Edit Job",
                        }}
                        statusAction={{
                            id: row._id,
                            entityName: "Job",
                            currentStatus: row.status,
                            statuses: ["Open", "Closed", "Draft"],
                            callback: updateStatus,
                            isUpdating: updateIsPending,
                            triggerLabel: "Edit Status",
                        }}
                        deleteAction={{
                            id: row._id,
                            entityName: "Job",
                            callback: deleteJob,
                            isDeleting: deleteIsPending,
                            triggerLabel: "Delete Job",
                        }}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="flex flex-col">
            <TableHeader
                title="Jobs Table"
                subtitle="Manage all job postings"
                onSearch={setSearch}
                onSort={setSort}
                sortOptions={[
                    { label: "Newest", value: "newest" },
                    { label: "Oldest", value: "oldest" },
                ]}
            >
                <Link
                    href="/admin/dashboard/jobs/create-job"
                    className="flex justify-center items-center gap-1 px-3 py-[5px] font-bold text-black bg-[#CDD2DA] rounded transition"
                >
                    <Plus size={18} /> Create Job
                </Link>
            </TableHeader>

            <DataTable
                isLoading={isLoading}
                columns={columns}
                data={jobs?.data}
            />

            {jobs?.pagination.total > 0 && (
                <TableFooter
                    isLoading={isLoading}
                    pagination={jobs?.pagination}
                    onPageChange={setPage}
                />
            )}
        </div>
    );
}
