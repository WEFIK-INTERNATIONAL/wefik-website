"use client";
import React from "react";
import Image from "next/image";

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

/**
 * Reusable Delete Confirmation Dialog
 * @param {string} entityName - Name of the entity to delete (e.g. "Job", "Application")
 * @param {function} onDelete - Callback to execute on delete
 * @param {boolean} isPending - Loading state when deleting
 * @param {ReactNode} trigger - Element that opens the dialog (like a button or menu item)
 * @param {string} warningGif - Optional gif url
 */
const DeleteConfirmDialog = ({
    id,
    entityName = "Item",
    onDelete,
    isPending = false,
    trigger,
}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

            <AlertDialogContent className="max-w-md p-6">
                <AlertDialogHeader className="text-center">
                    <AlertDialogTitle className="text-lg font-semibold">
                        Are you sure you want to delete this {entityName}?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="mt-2 text-sm text-red-500">
                        This action cannot be undone. This will permanently
                        delete this {entityName.toLowerCase()}.
                    </AlertDialogDescription>
                </AlertDialogHeader>

                {warningGif && (
                    <div className="flex justify-center my-4">
                        <Image
                            src={warningGif}
                            width={200}
                            height={200}
                            alt="Warning"
                            className="w-full"
                        />
                    </div>
                )}

                <AlertDialogFooter className="flex justify-end gap-3 mt-4">
                    <AlertDialogCancel className="hover:cursor-pointer px-4 py-2 border border-gray-300 rounded-md">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={() => onDelete(id)}
                        className="hover:cursor-pointer px-4 py-2 bg-red-500/80 hover:bg-red-500/90 text-white rounded-md"
                        disabled={isPending}
                    >
                        {isPending ? "Deleting..." : "Delete"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteConfirmDialog;
