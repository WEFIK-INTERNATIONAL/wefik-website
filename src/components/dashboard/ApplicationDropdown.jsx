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
import EditStatus from "./EditStatus";

const ApplicationDropdown = ({ id }) => {
    const handleOnDelete = (id) => {
        // Implement delete logic here
        console.log("Delete application:", id);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="hover:cursor-pointer">
                <EllipsisVertical />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mr-6">
                <DropdownMenuLabel>Application Action</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Edit */}
                <DropdownMenuItem
                    className="hover:cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                >
                    <PencilLine className="mr-2 h-4 w-4" />
                    <EditStatus id={id}/>
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
                                permanently delete this application.
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

                <DropdownMenuItem className="hover:cursor-pointer">
                    <Link
                        href={`/admin/dashboard/applications/${id}`}
                        className="flex items-center"
                    >
                        <BookOpen className="mr-2 h-4 w-4" />
                        View Details
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ApplicationDropdown;
