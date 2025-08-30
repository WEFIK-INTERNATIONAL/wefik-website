"use client";
import React, { useState, useMemo } from "react";
import JobsTableHeader from "@/components/dashboard/JobsTableHeader";
import JobsTable from "@/components/dashboard/JobsTable";
import JobsTableFooter from "@/components/dashboard/JobsTableFooter";


// ✅ Dummy Jobs Data
const allJobs = [
  { id: 1, title: "Frontend Developer", employmentType: "Remote", location: "Remote", postedDate: "2025-08-01", status: "Open", action: "Apply Now" },
  { id: 2, title: "Backend Developer", employmentType: "Full-Time", location: "Bangalore", postedDate: "2025-08-05", status: "Closed", action: "View" },
  { id: 3, title: "UI/UX Designer", employmentType: "Remote", location: "Remote", postedDate: "2025-08-10", status: "Open", action: "Apply Now" },
  { id: 4, title: "Data Analyst", employmentType: "Full-Time", location: "Hyderabad", postedDate: "2025-08-12", status: "Open", action: "Apply Now" },
  { id: 5, title: "DevOps Engineer", employmentType: "Remote", location: "Remote", postedDate: "2025-08-15", status: "Closed", action: "View" },
  { id: 6, title: "Product Manager", employmentType: "Full-Time", location: "Mumbai", postedDate: "2025-08-18", status: "Open", action: "Apply Now" },
  { id: 7, title: "QA Engineer", employmentType: "Remote", location: "Remote", postedDate: "2025-08-20", status: "Open", action: "Apply Now" },
  { id: 8, title: "Marketing Specialist", employmentType: "Full-Time", location: "Delhi", postedDate: "2025-08-22", status: "Closed", action: "View" },
  { id: 9, title: "Graphic Designer", employmentType: "Remote", location: "Remote", postedDate: "2025-08-23", status: "Open", action: "Apply Now" },
  { id: 10, title: "Machine Learning ", employmentType: "Full-Time", location: "Bangalore", postedDate: "2025-08-25", status: "Open", action: "Apply Now" },
  { id: 11, title: "Content Writer", employmentType: "Remote", location: "Remote", postedDate: "2025-08-26", status: "Open", action: "Apply Now" },
  { id: 12, title: "HR Manager", employmentType: "Full-Time", location: "Mumbai", postedDate: "2025-08-27", status: "Closed", action: "View" },
  { id: 13, title: "Full Stack Developer", employmentType: "Hybrid", location: "Hyderabad", postedDate: "2025-08-28", status: "Open", action: "Apply Now" },
  { id: 14, title: "Business Analyst", employmentType: "Remote", location: "Remote", postedDate: "2025-08-29", status: "Open", action: "Apply Now" },
  { id: 15, title: "Customer Support ", employmentType: "Hybrid", location: "Delhi", postedDate: "2025-08-30", status: "Open", action: "Apply Now" },
];



export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const itemsPerPage = 10;

  // 🔍 Filtering + Sorting
  const filteredJobs = useMemo(() => {
    let result = allJobs;

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
  }, [searchTerm, sortOrder]);

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
