"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
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

import warningGif from "@/assets/gif/warning-gif.gif";
import { EllipsisVertical, PencilLine, Trash2, BookOpen } from "lucide-react";

/**
 * Generic Action Dropdown for Applications, Jobs, etc.
 *
 * @param {string} id - Unique identifier of the item
 * @param {string} label - Dropdown label (e.g. "Application Actions")
 * @param {string} viewDetailsPath - Path to details page (e.g. `/admin/dashboard/applications/`)
 * @param {function} onEdit - Function to render/edit component (optional)
 * @param {function} onDelete - Function to delete the entity
 */

const ActionDropdown = ({ id, label, viewDetailsPath, onEdit, onDelete }) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="hover:cursor-pointer">
                <EllipsisVertical />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mr-6 px-4 py-2">
                <DropdownMenuLabel>{label}</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {/* Edit (if provided) */}
                {onEdit && (
                    <DropdownMenuItem
                        className="hover:cursor-pointer"
                        onSelect={(e) => e.preventDefault()}
                    >
                        <PencilLine className="mr-2 h-4 w-4" />
                        {onEdit(id)}
                    </DropdownMenuItem>
                )}

                {/* Delete with AlertDialog */}
                {onDelete && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <DropdownMenuItem
                                onSelect={(e) => e.preventDefault()}
                                className="text-red-600 cursor-pointer focus:text-red-600"
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
                                <AlertDialogDescription className="text-red-500">
                                    This action cannot be undone. This will
                                    permanently delete this item.
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <Image
                                src={warningGif}
                                width={500}
                                height={500}
                                alt="Warning Gif"
                            />
                            <AlertDialogFooter>
                                <AlertDialogCancel className="hover:cursor-pointer">
                                    Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                    onClick={() => onDelete(id)}
                                    className="hover:cursor-pointer"
                                >
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}

                {/* View Details */}
                {viewDetailsPath && (
                    <DropdownMenuItem className="hover:cursor-pointer">
                        <Link
                            href={`${viewDetailsPath}${id}`}
                            className="flex items-center"
                        >
                            <BookOpen className="mr-2 h-4 w-4" />
                            View Details
                        </Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionDropdown;
