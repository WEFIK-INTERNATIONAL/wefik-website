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
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { getStatusBadgeClasses } from "@/utils/statusBadge";

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
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) {
            setSelectedStatus(currentStatus);
        }
    }, [open, currentStatus]);

    const handleUpdate = async () => {
        await onUpdate({ id, status: selectedStatus });
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{trigger}</DialogTrigger>

            <DialogContent className="sm:max-w-md bg-gray-900">
                <DialogHeader>
                    <DialogTitle>Edit {entityName} Status</DialogTitle>
                </DialogHeader>

                <RadioGroup
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                    className="space-y-3 grid grid-cols-2 mt-5"
                >
                    {statuses.map((status, idx) => {
                        const isDisabled = status === currentStatus;
                        return (
                            <label
                                key={idx}
                                htmlFor={`status-${idx}`}
                                className={`flex items-center gap-3 ${
                                    isDisabled
                                        ? "opacity-50 cursor-not-allowed"
                                        : "cursor-pointer"
                                }`}
                            >
                                <RadioGroupItem
                                    value={status}
                                    id={`status-${idx}`}
                                    disabled={isDisabled}
                                />
                                <Badge
                                    className={`px-4 rounded-full ${getStatusBadgeClasses(
                                        status
                                    )}`}
                                >
                                    {status}
                                </Badge>
                            </label>
                        );
                    })}
                </RadioGroup>

                <DialogFooter className="mt-4 flex justify-end gap-2">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        disabled={
                            isUpdating || selectedStatus === currentStatus
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
