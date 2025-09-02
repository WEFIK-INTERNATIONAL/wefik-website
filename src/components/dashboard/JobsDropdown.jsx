"use client";
import React from "react";
import Link from "next/link";

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
import JobStatus from "./JobStatus";

import { useDashboardContext } from "@/contexts";
import jobServices from "@/services/JobServices";
const JobsDropdown = ({ id }) => {
    const { deleteItem } = useDashboardContext();

    const handleOnDelete = async (id) => {
        await deleteItem(id, () => jobServices.deleteJob(id));
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="hover:cursor-pointer">
                <EllipsisVertical />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mr-6">
                <DropdownMenuLabel>Job Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Edit */}
                <DropdownMenuItem
                    className="hover:cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                >
                    <PencilLine className="mr-2 h-4 w-4" />
                    <JobStatus id={id} />
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
                            <AlertDialogTitle>
                                Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete this job.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel className="hover:cursor-pointer">
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => handleOnDelete(id)}
                                className="hover:cursor-pointer"
                            >
                                Continue
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>

                {/* View Details */}
                <DropdownMenuItem className="hover:cursor-pointer">
                    <Link
                        href={`/admin/dashboard/jobs/${id}`}
                        className="flex items-center"
                    >
                        <BookOpen className="mr-2 h-4 w-4" />
                        View Details
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={`/admin/dashboard/jobs/edit/${id}`} className="flex items-center">
                        <PencilLine className="mr-2 h-4 w-4" />
                        Edit
                    </Link>
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default JobsDropdown;
