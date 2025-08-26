"use client";
import React from "react";

import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical, PencilLine, Trash2, BookOpen } from "lucide-react";
import {
	AlertDialog,
	AlertDialogTrigger,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from "@/components/ui/dialog";

import ApplicationDetails from "./ApplicationDetails";

const ApplicationDropdown = ({ application }) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="hover:cursor-pointer">
				<EllipsisVertical />
			</DropdownMenuTrigger>

			<DropdownMenuContent className="mr-6">
				<DropdownMenuLabel>Application Action</DropdownMenuLabel>
				<DropdownMenuSeparator />

				{/* Edit */}
				<DropdownMenuItem className="hover:cursor-pointer">
					<PencilLine className="mr-2 h-4 w-4" />
					Edit
				</DropdownMenuItem>

				{/* Delete with AlertDialog */}
				<AlertDialog>
					<AlertDialogTrigger asChild>
						<DropdownMenuItem
							onSelect={(e) => e.preventDefault()}
							className="text-red-600 hover:bg-red-100 focus:bg-red-100 cursor-pointer"
						>
							<Trash2 className="mr-2 h-4 w-4 text-red-600" />
							Delete
						</DropdownMenuItem>
					</AlertDialogTrigger>

					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
							<AlertDialogDescription>
								This action cannot be undone. This will permanently delete this
								application.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel className="hover:cursor-pointer">
								Cancel
							</AlertDialogCancel>
							<AlertDialogAction className="hover:cursor-pointer">
								Continue
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>

				{/* View Details with Dialog */}
				<Dialog>
					<DialogTrigger asChild>
						<DropdownMenuItem
							onSelect={(e) => e.preventDefault()}
							className="hover:cursor-pointer"
						>
							<BookOpen className="mr-2 h-4 w-4" />
							View Details
						</DropdownMenuItem>
					</DialogTrigger>

					<DialogContent className="max-w-lg">
						<DialogHeader>
							<DialogTitle className="text-2xl font-bold">Application Details</DialogTitle>
							<DialogDescription>
								Detailed information about this application
							</DialogDescription>
						</DialogHeader>

						{/* ApplicationDetails component */}
						<ApplicationDetails application={application} />
					</DialogContent>
				</Dialog>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ApplicationDropdown;
