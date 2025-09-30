"use client";

import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import StatusBadge from "../StatusBadge";

/**
 * Reusable EditStatus Component
 * @param {string} entityName - Name of entity (Job, Application, etc.)
 * @param {string} currentStatus - Current status of the entity
 * @param {Array<string>} statuses - Array of possible statuses
 * @param {function} onUpdate - Callback to update status: ({ id, status }) => {}
 * @param {ReactNode} trigger - Element to open dialog (button, menu item, etc.)
 * @param {boolean} isUpdating - Loading state for update
 * @param {string} id - Entity unique ID
 */
const EditStatusDialog = ({
    id,
    entityName = "Item",
    currentStatus = "",
    statuses = [],
    onUpdate,
    trigger,
    isUpdating = false,
}) => {
    const [selectedStatus, setSelectedStatus] = useState(currentStatus ?? "");
    const [open, setOpen] = useState(false);

    // Reset status whenever dialog opens
    useEffect(() => {
        if (open) {
            setSelectedStatus(currentStatus ?? "");
        }
    }, [open, currentStatus]);

    const handleUpdate = async () => {
        if (!selectedStatus) return;
        const formData = new FormData();
        formData.append("status", selectedStatus);

        await onUpdate({ id, data: formData });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>

            <DialogContent className="sm:max-w-md dark:bg-gray-900">
                <DialogHeader>
                    <DialogTitle>Edit {entityName} Status</DialogTitle>
                </DialogHeader>

                <RadioGroup
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                    className="mt-5 grid grid-cols-2 gap-3"
                >
                    {statuses.map((status) => {
                        const isDisabled =
                            status.toLowerCase() ===
                            (currentStatus ?? "").toLowerCase();

                        return (
                            <label
                                key={status}
                                htmlFor={`status-${status}`}
                                className={`flex items-center gap-3 ${
                                    isDisabled
                                        ? "opacity-50 cursor-not-allowed"
                                        : "cursor-pointer"
                                }`}
                            >
                                <RadioGroupItem
                                    value={status}
                                    id={`status-${status}`}
                                    disabled={isDisabled}
                                />
                                <StatusBadge status={status} />
                            </label>
                        );
                    })}
                </RadioGroup>

                <DialogFooter className="mt-6 flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        disabled={
                            isUpdating ||
                            selectedStatus.toLowerCase() ===
                                (currentStatus ?? "").toLowerCase()
                        }
                        type="button"
                        onClick={handleUpdate}
                    >
                        {isUpdating ? "Updating..." : "Save changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditStatusDialog;
