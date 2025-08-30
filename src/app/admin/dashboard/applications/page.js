"use client";
import React, { useState, useMemo } from "react";

import ApplicationTable from "@/components/dashboard/ApplicationTable";
import ApplicationTableHeader from "@/components/dashboard/ApplicationTableHeader";
import ApllicationTableFooter from "@/components/dashboard/ApllicationTableFooter";

import { useDashboardContext } from "@/contexts";

export default function ApplicationsPage() {
	const { isLoading, applications } = useDashboardContext();

	const [searchTerm, setSearchTerm] = useState("");
	const [sortOrder, setSortOrder] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 10;

	// ✅ Filtering + Sorting Logic
	const filteredApps = useMemo(() => {
		let result = [...applications];

		// 🔍 Filtering
		if (searchTerm.trim() !== "") {
			const term = searchTerm.toLowerCase();

			result = result.filter(
				(app) =>
					app.jobId.toString().includes(term) ||
					app.jobTitle.toLowerCase().includes(term) ||
					app.candidateInfo.fullName.toLowerCase().includes(term) ||
					app.candidateInfo.email.toLowerCase().includes(term)
			);
		}

		// ⏱️ Sorting
		if (sortOrder === "newest") {
			result.sort((a, b) => new Date(b.appliedAt) - new Date(a.appliedAt));
		} else if (sortOrder === "oldest") {
			result.sort((a, b) => new Date(a.appliedAt) - new Date(b.appliedAt));
		}

		return result;
	}, [applications, searchTerm, sortOrder]);

	// ✅ Pagination
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
				indexOfLast={Math.min(indexOfLast, totalItems)}
			/>
		</div>
	);
}
