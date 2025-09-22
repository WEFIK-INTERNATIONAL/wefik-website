"use client";
import React, { useState } from "react";
import Link from "next/link";

import TableHeader from "@/components/dashboard/TableHeader";
import DataTable from "@/components/dashboard/DataTable";
import TableFooter from "@/components/dashboard/TableFooter";
import ActionDropdown from "@/components/dashboard/ActionDropdown";

import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/formatDate";

import {
    useGetApplications,
    useUpdateApplicationStatus,
    useDeleteApplication,
} from "@/queries/applications";

import { getStatusBadgeClasses } from "@/utils/statusBadge";

export default function ApplicationsPage() {
    const limit = 9;
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");

    const { data: applications, isLoading } = useGetApplications(
        page,
        limit,
        search,
        sort
    );
    const { mutate: updateStatus, isPending: updateIsPending } =
        useUpdateApplicationStatus();
    const { mutate: deleteApplication, isPending: deleteIsPending } =
        useDeleteApplication();

    const columns = [
        { header: "Job ID", accessor: "jobId" },
        { header: "Job Title", accessor: "jobTitle" },
        {
            header: "Candidate Name",
            accessor: "candidateInfo.fullName",
            cell: (row) => row.candidateInfo?.fullName,
        },
        {
            header: "Candidate Email",
            accessor: "candidateInfo.email",
            cell: (row) => row.candidateInfo?.email,
        },
        {
            header: "Resume",
            accessor: "resume.url",
            cell: (row) => (
                <Link href={row.resume?.url} className="text-blue-500">
                    View Resume
                </Link>
            ),
        },
        {
            header: "Applied At",
            accessor: "appliedAt",
            cell: (row) => formatDate(row.appliedAt),
        },
        {
            header: "Status",
            accessor: "status",
            cell: (row) => (
                <Badge
                    className={`px-4 py-1 rounded-full ${getStatusBadgeClasses(row.status)}`}
                >
                    {row.status}
                </Badge>
            ),
        },
        {
            header: "Actions",
            accessor: "_id",
            cell: (row) => (
                <div className="flex justify-center">
                    <ActionDropdown
                        viewDetailsPath={`/admin/dashboard/applications/${row._id}`}
                        statusAction={{
                            id: row._id,
                            entityName: "Application",
                            currentStatus: row.status,
                            statuses: [
                                "Pending",
                                "Reviewed",
                                "Shortlisted",
                                "Accepted",
                                "Rejected",
                            ],
                            callback: updateStatus,
                            isUpdating: updateIsPending,
                            triggerLabel: "Edit Status",
                        }}
                        deleteAction={{
                            id: row._id,
                            entityName: "Application",
                            callback: deleteApplication,
                            isDeleting: deleteIsPending,
                            triggerLabel: "Delete Application",
                        }}
                    />
                </div>
            ),
        },
    ];

    return (
        <div>
            <TableHeader
                title="Application Table"
                subtitle="Manage all the applications"
                onSearch={setSearch}
                onSort={setSort}
                sortOptions={[
                    { label: "Newest", value: "newest" },
                    { label: "Oldest", value: "oldest" },
                ]}
            />
            <DataTable
                isLoading={isLoading}
                columns={columns}
                data={applications?.data}
            />
            <TableFooter
                isLoading={isLoading}
                pagination={applications?.pagination}
                onPageChange={setPage}
            />
        </div>
    );
}
