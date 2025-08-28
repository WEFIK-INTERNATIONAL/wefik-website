import React from "react";
import Link from "next/link";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import ApplicationDropdown from "./ApplicationDropdown";

const ApplicationTable = ({ isLoading, currentItems }) => {
	
	const getStatusBadge = (status) => {
		switch (status) {
			case "Pending":
				return "bg-yellow-500 text-white";
			case "Reviewed":
				return "bg-blue-500 text-white";
			case "Shortlisted":
				return "bg-slate-900 text-white";
			case "Accepted":
				return "bg-green-500 text-white";
			case "Rejected":
				return "bg-red-500 text-white";
			default:
				return "bg-gray-500 text-white";
		}
	};

	return (
		<div className="overflow-x-auto relative">
			<Table className="min-w-full">
				<TableHeader>
					<TableRow>
						<TableHead className="text-gray-500">Job ID</TableHead>
						<TableHead className="text-gray-500">Job Title</TableHead>
						<TableHead className="text-gray-500">Candidate Name</TableHead>
						<TableHead className="text-gray-500">Candidate Email</TableHead>
						<TableHead className="text-gray-500">Resume</TableHead>
						<TableHead className="text-gray-500">Applied Date</TableHead>
						<TableHead className="text-gray-500">Status</TableHead>
						{/* Sticky Action Column */}
						<TableHead className="text-right text-gray-500 sticky right-0 bg-white shadow-md lg:bg-transparent">
							Action
						</TableHead>
					</TableRow>
				</TableHeader>

				{isLoading ? (
					<TableBody>
						<TableRow>
							<TableCell colSpan={8} className="text-center py-10">
								Loading...
							</TableCell>
						</TableRow>
					</TableBody>
				) : currentItems.length === 0 ? (
					<TableBody>
						<TableRow>
							<TableCell colSpan={8} className="text-center py-10">
								No applications found.
							</TableCell>
						</TableRow>
					</TableBody>
				) : (
					<TableBody>
						{currentItems.map((app, index) => (
							<TableRow key={index}>
								<TableCell>{app.jobId}</TableCell>
								<TableCell>{app.title}</TableCell>
								<TableCell>{app.candidateInfo.fullName}</TableCell>
								<TableCell>{app.candidateInfo.email}</TableCell>
								<TableCell>
									<Link href={`/${app.resume.url}`} className="text-blue-500">
										View Resume
									</Link>
								</TableCell>
								<TableCell>{app.appliedAt}</TableCell>
								<TableCell>
									<Badge
										className={`px-2 py-1 rounded-full ${getStatusBadge(
											app.status
										)}`}
									>
										{app.status}
									</Badge>
								</TableCell>

								<TableCell className="text-center sticky right-0 bg-white shadow-md lg:static lg:shadow-none lg:bg-transparent lg:text-right">
									<ApplicationDropdown applicationID={app.id} />
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				)}
			</Table>
		</div>
	);
};

export default ApplicationTable;
