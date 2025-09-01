"use client";
import React, { useState, useMemo } from "react";
import JobsTableHeader from "@/components/dashboard/JobsTableHeader";
import JobsTable from "@/components/dashboard/JobsTable";
import JobsTableFooter from "@/components/dashboard/JobsTableFooter";

import { useDashboardContext } from "@/contexts";

export default function JobsPage() {
  const { isLoading, jobs } = useDashboardContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // 🔍 Filtering + Sorting
  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.id.toString().includes(searchTerm.toString()) ||
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.employmentType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOrder === "newest") {
      result = [...result].sort(
        (a, b) => new Date(b.postedDate) - new Date(a.postedDate)
      );
    } else if (sortOrder === "oldest") {
      result = [...result].sort(
        (a, b) => new Date(a.postedDate) - new Date(b.postedDate)
      );
    }

    return result;
  }, [jobs, searchTerm, sortOrder]);

  // 📄 Pagination
  const totalItems = filteredJobs.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = filteredJobs.slice(indexOfFirst, indexOfLast);

  return (
    <div className="">
      <JobsTableHeader onSearch={setSearchTerm} onSort={setSortOrder} />
      <JobsTable isLoading={isLoading} currentItems={currentItems} />
      <JobsTableFooter
        isLoading={isLoading}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalItems={totalItems}
        indexOfFirst={indexOfFirst}
        indexOfLast={indexOfLast}
      />
    </div>
  );
}
