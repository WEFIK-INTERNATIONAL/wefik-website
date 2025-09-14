"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";


import EditStatusDialog from "./EditStatusDialog";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

import {
    EllipsisVertical,
    BookOpen,
    Trash2,
    SquarePen,
    CircleCheck,
} from "lucide-react";

/**
 * ActionDropdown
 * @param {string} viewDetailsPath - Path for details page
 * @param {object} editAction - { id, callback, triggerLabel, statuses, isUpdating, entityName, trigger }
 * @param {object} deleteAction - { id, callback, isDeleting, triggerLabel }
 */
const ActionDropdown = ({
    viewDetailsPath,
    editAction,
    statusAction,
    deleteAction,
}) => {
    const router = useRouter();

    const handleEditClick = () => {
        if (editAction?.jobId) {
            router.push(`/admin/dashboard/jobs/edit-job/${editAction.jobId}`);
        }
    };
    
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="hover:cursor-pointer">
                <EllipsisVertical />
            </DropdownMenuTrigger>

            <DropdownMenuContent className="mr-6 px-4 py-2">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />

                {editAction && (
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <button
                            onClick={handleEditClick}
                            className="flex justify-center items-center gap-2 text-green-500 md:text-[16px] font-bold hover:cursor-pointer"
                        >
                            <SquarePen className="text-green-500" />
                            {editAction.triggerLabel || "Edit Status"}
                        </button>
                    </DropdownMenuItem>
                )}

                {/* Edit Action */}
                {statusAction && (
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <EditStatusDialog
                            id={statusAction.id}
                            entityName={statusAction.entityName}
                            currentStatus={statusAction.currentStatus}
                            statuses={statusAction.statuses}
                            onUpdate={statusAction.callback}
                            trigger={
                                <button className="flex justify-center items-center gap-2 text-blue-500 md:text-[16px] font-bold hover:cursor-pointer">
                                    <CircleCheck className="text-blue-500" />
                                    {statusAction.triggerLabel || "Edit Status"}
                                </button>
                            }
                            isUpdating={statusAction.isUpdating}
                        />
                    </DropdownMenuItem>
                )}

                {/* Delete Action */}
                {deleteAction && (
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <DeleteConfirmDialog
                            id={deleteAction.id}
                            entityName={deleteAction.entityName}
                            onDelete={deleteAction.callback}
                            trigger={
                                <button className="flex justify-center items-center gap-2 text-red-500 md:text-[16px] font-bold hover:cursor-pointer">
                                    <Trash2 className="text-red-500" />
                                    {deleteAction.triggerLabel || "Delete Job"}
                                </button>
                            }
                            isPending={deleteAction.isDeleting}
                        />
                    </DropdownMenuItem>
                )}

                {/* View Details */}
                {viewDetailsPath && (
                    <DropdownMenuItem className="hover:cursor-pointer">
                        <Link
                            href={`${viewDetailsPath}`}
                            className="flex justify-center items-center gap-2 text-gray-600 md:text-[16px] font-bold hover:cursor-pointer"
                        >
                            <BookOpen className="" />
                            View Details
                        </Link>
                    </DropdownMenuItem>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ActionDropdown;
