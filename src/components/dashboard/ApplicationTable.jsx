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

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { EllipsisVertical, PencilLine, Trash2 } from "lucide-react";

const ApplicationTable = ({ isLoading, currentItems }) => {
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
								<TableCell>{app.id}</TableCell>
								<TableCell>{app.title}</TableCell>
								<TableCell>{app.candidateName}</TableCell>
								<TableCell>{app.candidateEmail}</TableCell>
								<TableCell>
									<Link href={`/${app.resume}`} className="text-blue-500">
										View Resume
									</Link>
								</TableCell>
								<TableCell>{app.appliedDate}</TableCell>
								<TableCell>
									<Badge
										className={
											app.status === "Pending"
												? "bg-yellow-500 text-white"
												: app.status === "Reviewed"
												? "bg-blue-500 text-white"
												: "bg-green-500 text-white"
										}
									>
										{app.status}
									</Badge>
								</TableCell>

								{/* Sticky Action Column (only mobile & tablet) */}
								<TableCell className="text-center sticky right-0 bg-white shadow-md lg:static lg:shadow-none lg:bg-transparent lg:text-right">
									<DropdownMenu>
										<DropdownMenuTrigger className="hover:cursor-pointer">
											<EllipsisVertical />
										</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuItem>
												<PencilLine />
												Edit
											</DropdownMenuItem>
											<DropdownMenuItem>Status</DropdownMenuItem>
											<DropdownMenuItem className="hover:bg-red-500 text-red-600">
												<Trash2 />
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
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
