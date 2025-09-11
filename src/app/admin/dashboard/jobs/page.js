"use client";
import React, { useState } from "react";
import Link from "next/link";

import TableHeader from "@/components/dashboard/TableHeader";
import DataTable from "@/components/dashboard/DataTable";
import TableFooter from "@/components/dashboard/TableFooter";
import ActionDropdown from "@/components/dashboard/ActionDropdown";

import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/formatDate";

import { Plus } from "lucide-react";

import { useGetJobs, useUpdateJobStatus, useDeleteJob } from "@/queries/jobs";

// ✅ Status Badge for Jobs
const getJobStatusBadge = (status) => {
    switch (status) {
        case "Open":
            return "bg-green-500 text-white";
        case "Closed":
            return "bg-red-500 text-white";
        case "Draft":
            return "bg-yellow-500 text-white";
        default:
            return "bg-slate-400 text-white";
    }
};

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
            cell: (row) => (
                <Badge
                    className={`px-6 py-1 font-semibold rounded-full ${getJobStatusBadge(row.status)}`}
                >
                    {row.status}
                </Badge>
            ),
        },
        {
            header: "Actions",
            accessor: "_id",
            align: "center",
            cell: (row) => (
                <div className="flex justify-center">
                    <ActionDropdown
                        viewDetailsPath="/admin/dashboard/jobs/"
                        editAction={{
                            jobId: row.jobId,
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
                    className="flex justify-center items-center gap-2 px-3 py-1 text-white font-medium bg-green-600 rounded transition"
                >
                    <Plus /> Create Job
                </Link>
            </TableHeader>

            <DataTable
                isLoading={isLoading}
                columns={columns}
                data={jobs?.data}
            />

            <TableFooter
                isLoading={isLoading}
                pagination={jobs?.pagination}
                onPageChange={setPage}
            />
        </div>
    );
}
