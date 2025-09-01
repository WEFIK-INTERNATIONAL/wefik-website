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

import { useDashboardContext } from "@/contexts";
import applicationService from "@/services/ApplicationServices";
import jobServices from "@/services/JobServices";

const JobStatus = ({ id, currentStatus = "Open" }) => {
    const { updateJob } = useDashboardContext();
    const [selectedStatus, setSelectedStatus] = useState(currentStatus);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) {
            setSelectedStatus(currentStatus);
        }
    }, [open, currentStatus]);

    // ✅ Only two statuses
    const statuses = ["Open", "Closed"];

    const getStatusBadge = (status) => {
        switch (status) {
            case "Open":
                return "bg-green-500 text-white";
            case "Closed":
                return "bg-red-500 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };

    const updateStatus = async () => {
        await updateJob(id, { status: selectedStatus }, () =>
            jobServices.updateJob(id, { status: selectedStatus })
        );
        setOpen(false);
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
                                value={status}
                                id={`status-${idx}`}
                                className="hover:cursor-pointer"
                            />
                            <Badge
                                className={`px-4 rounded-full cursor-pointer ${getStatusBadge(
                                    status
                                )}`}
                            >
                                {status}
                            </Badge>
                        </div>
                    ))}
                </RadioGroup>

                <DialogFooter className="mt-4">
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="button" onClick={updateStatus}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default JobStatus;
