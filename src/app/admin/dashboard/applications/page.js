"use client";
import React, { useState } from "react";
import Link from "next/link";

import TableHeader from "@/components/dashboard/TableHeader";
import DataTable from "@/components/dashboard/DataTable";
import TableFooter from "@/components/dashboard/TableFooter";
import ActionDropdown from "@/components/dashboard/ActionDropdown";
import EditStatusDialog from "@/components/dashboard/EditStatusDialog";

import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/formatDate";
import { usePagination, useSearchAndSort } from "@/app/hooks";

const getStatusBadge = (status) => {
    switch (status) {
        case "Pending":
            return "bg-yellow-500 text-white";
        case "Reviewed":
            return "bg-blue-500 text-white";
        case "Shortlisted":
            return "bg-slate-900 dark:bg-slate-500 text-white";
        case "Accepted":
            return "bg-green-500 text-white";
        case "Rejected":
            return "bg-red-500 text-white";
        default:
            return "bg-gray-500 text-white";
    }
};

export default function ApplicationsPage() {
    const { isLoading, applications, deleteApplication } = [];

    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState("");

    const filteredApplications = useSearchAndSort({
        data: applications,
        searchTerm,
        sortOrder,
        searchFields: [
            "jobId",
            "jobTitle",
            "candidateInfo.fullName",
            "candidateInfo.email",
        ],
        sortField: "appliedAt",
    });

    const pagination = usePagination({
        data: filteredApplications,
        itemsPerPage: 10,
    });

    const columns = [
        { header: "Job ID", accessor: "jobId" },
        { header: "Job Title", accessor: "jobTitle" },
        {
            header: "Candidate Name",
            accessor: "candidateInfo.fullName",
            cell: (row) => row.candidateInfo?.fullName,
        },
        {
            header: "Email",
            accessor: "candidateInfo.email",
            cell: (row) => row.candidateInfo?.email,
        },
        {
            header: "Resume",
            accessor: "resume.url",
            cell: (row) => (
                <Link href={`/${row.resume?.url}`} className="text-blue-500">
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
                    className={`px-2 py-1 rounded-full ${getStatusBadge(row.status)}`}
                >
                    {row.status}
                </Badge>
            ),
        },
        {
            header: "Actions",
            accessor: "_id",
            cell: (row) => (
                <div className="text-center sticky right-0 shadow-md lg:static lg:shadow-none lg:bg-transparent lg:text-right">
                    <ActionDropdown
                        id={row._id}
                        label="Application Actions"
                        viewDetailsPath="/admin/dashboard/applications/"
                        onEdit={(id) => (
                            <EditStatus id={id} currentStatus={row.status} />
                        )}
                        onDelete={deleteApplication}
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
                onSearch={setSearchTerm}
                onSort={setSortOrder}
                sortOptions={[
                    { label: "Newest", value: "newest" },
                    { label: "Oldest", value: "oldest" },
                ]}
            />
            <DataTable
                isLoading={isLoading}
                columns={columns}
                data={pagination.currentItems}
            />
            <TableFooter isLoading={isLoading} pagination={pagination} />
        </div>
    );
}
