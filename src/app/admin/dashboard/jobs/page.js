"use client";
import React, { useState } from "react";
import Link from "next/link";

import TableHeader from "@/components/dashboard/TableHeader";
import DataTable from "@/components/dashboard/DataTable";
import TableFooter from "@/components/dashboard/TableFooter";
import ActionDropdown from "@/components/dashboard/ActionDropdown";

import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/formatDate";
import { useDashboardContext } from "@/contexts";
import { usePagination, useSearchAndSort } from "@/app/hooks";
import JobStatus from "@/components/dashboard/JobStatus";

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
  const { isLoading, jobs, deleteJob } = useDashboardContext();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  // 🔍 Search + Sort
  const filteredJobs = useSearchAndSort({
    data: jobs,
    searchTerm,
    sortOrder,
    searchFields: ["id", "jobProfile", "employmentType", "location", "status"],
    sortField: "applicationDeadline",
  });

  // 📄 Pagination
  const pagination = usePagination({
    data: filteredJobs,
    itemsPerPage: 10,
  });

  // 📝 Columns for Jobs Table
  const columns = [
    { header: "Job ID", accessor: "jobId" },
    { header: "Job Title", accessor: "jobProfile" },
    { header: "Employment Type", accessor: "type" },
    { header: "Location", accessor: "location" },
    {
      header: "Last Date",
      accessor: "applicationDeadline",
      cell: (row) => formatDate(row.applicationDeadline),
    },
    {
      header: "Status",
      accessor: "status",
      cell: (row) => (
        <Badge
          className={`px-2 py-1 rounded-full ${getJobStatusBadge(row.status)}`}
        >
          {row.status}
        </Badge>
      ),
    },
    {
      header: "Actions",
      accessor: "_id",
      cell: (row) => (
        <div className="text-center sticky right-0 bg-white shadow-md lg:static lg:shadow-none lg:bg-transparent lg:text-right">
          <ActionDropdown
            id={row._id}
            label="Job Actions"
            viewDetailsPath="/admin/dashboard/jobs/"
            onEdit={(id) =>(<JobStatus id={id} currentStatus ={row.status}/>)}
            onDelete={deleteJob}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      <TableHeader
        title="Jobs Table"
        subtitle="Manage all job postings"
        onSearch={setSearchTerm}
        onSort={setSortOrder}
        sortOptions={[
          { label: "Newest", value: "newest" },
          { label: "Oldest", value: "oldest" },
        ]}>
        <Link
          href="/admin/dashboard/jobs/create-job"
          className="px-4 py-2 bg-[#9AE600]/80 text-white rounded hover:bg-[#9AE600]/70 transition"
        >
          Create Job
        </Link>
      </TableHeader>

      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={pagination.currentItems}
      />

      <TableFooter isLoading={isLoading} pagination={pagination} />
    </div>
  );
}
