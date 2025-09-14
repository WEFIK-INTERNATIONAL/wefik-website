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

import { useUpdateJobStatus } from "@/queries/jobs";

const JobStatus = ({ id, currentStatus = "Open" }) => {
    const { mutate: updateJobStatus, isPending } = useUpdateJobStatus();

    const [selectedStatus, setSelectedStatus] = useState(currentStatus);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) {
            setSelectedStatus(currentStatus);
        }
    }, [open, currentStatus]);

    const statuses = [
        { label: "Open", className: "bg-green-500 text-white" },
        { label: "Closed", className: "bg-red-500 text-white" },
        { label: "Draft", className: "bg-yellow-500 text-white" },
    ];

    const handleUpdateStatus = () => {
        updateJobStatus(
            { id, status: selectedStatus },
            {
                onSuccess: () => setOpen(false),
            }
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Status</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Edit Status</DialogTitle>
                </DialogHeader>

                <RadioGroup
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                    className="space-y-3 grid grid-cols-2 mt-5"
                >
                    {statuses.map((status, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                            <RadioGroupItem
                                value={status.label}
                                id={`status-${idx}`}
                                className="hover:cursor-pointer"
                            />
                            <Badge
                                className={`px-4 rounded-full cursor-pointer ${status.className}`}
                                onClick={() => setSelectedStatus(status.label)}
                            >
                                {status.label}
                            </Badge>
                        </div>
                    ))}
                </RadioGroup>

                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button
                        type="button"
                        onClick={handleUpdateStatus}
                        disabled={isPending}
                    >
                        {isPending ? "Saving..." : "Save changes"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default JobStatus;
