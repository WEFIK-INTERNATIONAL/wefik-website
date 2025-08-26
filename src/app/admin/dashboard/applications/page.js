"use client";
import React, { useState,useEffect, useMemo } from "react";

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
	{
		id: 4,
		title: "UI Designer",
		candidateName: "Charlie",
		candidateEmail: "charlie@mail.com",
		appliedDate: "2025-08-20",
		status: "Interview-Scheduled",
		resume: "resume3.pdf",
	},
	{
		id: 5,
		title: "UI Designer",
		candidateName: "Charlie",
		candidateEmail: "charlie@mail.com",
		appliedDate: "2025-08-20",
		status: "Accepted",
		resume: "resume3.pdf",
	},
	{
		id: 6,
		title: "UI Designer",
		candidateName: "Charlie",
		candidateEmail: "charlie@mail.com",
		appliedDate: "2025-08-20",
		status: "Accepted",
		resume: "resume3.pdf",
	},
	{
		id: 7,
		title: "UI Designer",
		candidateName: "Charlie",
		candidateEmail: "charlie@mail.com",
		appliedDate: "2025-08-20",
		status: "Accepted",
		resume: "resume3.pdf",
	},
	{
		id: 8,
		title: "UI Designer",
		candidateName: "Charlie",
		candidateEmail: "charlie@mail.com",
		appliedDate: "2025-08-20",
		status: "Accepted",
		resume: "resume3.pdf",
	},
	{
		id: 9,
		title: "UI Designer",
		candidateName: "Charlie",
		candidateEmail: "charlie@mail.com",
		appliedDate: "2025-08-20",
		status: "Interview-Scheduled",
		resume: "resume3.pdf",
	},
	{
		id: 10,
		title: "UI Designer",
		candidateName: "Charlie",
		candidateEmail: "charlie@mail.com",
		appliedDate: "2025-08-20",
		status: "Accepted",
		resume: "resume3.pdf",
	},
];

export default function ApplicationsPage() {
	const [searchTerm, setSearchTerm] = useState("");
	const [sortOrder, setSortOrder] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [isLoading, setIsLoading] = useState(false);
	const itemsPerPage = 10;

	// Filtering + Sorting Logic
	const filteredApps = useMemo(() => {
		let result = allApplications;		

		if (searchTerm.trim() !== "") {
			result = result.filter(
				(app) =>
					app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					app.candidateEmail.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

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
