"use client";
import React, { useState, useMemo } from "react";

import ApplicationTable from "@/components/dashboard/ApplicationTable";
import ApplicationTableHeader from "@/components/dashboard/ApplicationTableHeader";
import ApllicationTableFooter from "@/components/dashboard/ApllicationTableFooter";

// Dummy data
const allApplications = [
	{
		id: 1,
		title: "Frontend Dev",
		candidateName: "Alice",
		candidateEmail: "alice@mail.com",
		appliedDate: "2025-08-10",
		status: "Pending",
		resume: "resume1.pdf",
	},
	{
		id: 2,
		title: "Backend Dev",
		candidateName: "Bob",
		candidateEmail: "bob@mail.com",
		appliedDate: "2025-08-15",
		status: "Reviewed",
		resume: "resume2.pdf",
	},
	{
		id: 3,
		title: "UI Designer",
		candidateName: "Charlie",
		candidateEmail: "charlie@mail.com",
		appliedDate: "2025-08-20",
		status: "Accepted",
		resume: "resume3.pdf",
	},
	// ... more data
];

export default function ApplicationsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortOrder, setSortOrder] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const itemsPerPage = 5;

	// Filtering + Sorting Logic
	const filteredApps = useMemo(() => {
		let result = allApplications;

		// 🔍 Search
		if (searchTerm) {
			result = result.filter(
				(app) =>
					app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
					app.candidateEmail.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		// ↕️ Sort
		if (sortOrder === "newest") {
			result = [...result].sort(
				(a, b) => new Date(b.appliedDate) - new Date(a.appliedDate)
			);
		} else if (sortOrder === "oldest") {
			result = [...result].sort(
				(a, b) => new Date(a.appliedDate) - new Date(b.appliedDate)
			);
		}

		return result;
	}, [searchTerm, sortOrder]);

	// Pagination Logic
	const totalItems = filteredApps.length;
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const indexOfLast = currentPage * itemsPerPage;
	const indexOfFirst = indexOfLast - itemsPerPage;
	const currentItems = filteredApps.slice(indexOfFirst, indexOfLast);

	return (
		<div>
			<ApplicationTableHeader onSearch={setSearchTerm} onSort={setSortOrder} />
			<ApplicationTable isLoading={isLoading} currentItems={currentItems} />
			<ApllicationTableFooter
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
