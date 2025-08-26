"use client";
import React, { useState, useEffect } from "react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

import { useDebounce } from "@/app/hooks/useDebounce";

const ApplicationTableHeader = ({ onSearch, onSort }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const debouncedSearch = useDebounce(searchTerm, 1000);

	useEffect(() => {
		if (debouncedSearch) {
			onSearch(debouncedSearch);
		}
	}, [debouncedSearch]);

	return (
		<div className="flex flex-col md:flex-row md:justify-between md:items-center pr-4 md:pr-10 py-6 gap-4">
			<div>
				<h1 className="text-xl md:text-2xl font-extrabold">
					Application Table
				</h1>
				<p className="text-gray-500 text-sm md:text-base">
					Manage all the applications
				</p>
			</div>

			<div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full md:w-auto">
				<div className="relative flex items-center w-full sm:w-72">
					<input
						className="bg-gray-200/30 w-full py-2 pl-4 pr-10 rounded-md text-sm md:text-sm"
						type="text"
						placeholder="Search by job id or email..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
					<button className="absolute bg-black/70 p-1.5 rounded-md right-1 hover:cursor-pointer">
						<Search size={18} className="text-white" />
					</button>
				</div>

				<Select onValueChange={(value) => onSort(value)}>
					<SelectTrigger className="w-full sm:w-[180px]">
						<SelectValue placeholder="Sort By" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="newest">Newest</SelectItem>
						<SelectItem value="oldest">Oldest</SelectItem>
					</SelectContent>
				</Select>
			</div>
		</div>
	);
};

export default ApplicationTableHeader;
