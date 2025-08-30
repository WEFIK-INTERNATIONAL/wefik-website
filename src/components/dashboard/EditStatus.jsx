"use client";
import React, { useState } from "react";
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

import applicationService from "@/services/ApplicationServices";
import { useDashboardContext } from "@/contexts";

const EditStatus = ({ id }) => {
    const { updateItem } = useDashboardContext();
    const [selectedStatus, setSelectedStatus] = useState("Pending");

    const getStatusBadge = (status) => {
        switch (status) {
            case "Pending":
                return "bg-yellow-500 text-white";
            case "Reviewed":
                return "bg-blue-500 text-white";
            case "Shortlisted":
                return "bg-slate-900 dark:bg-slate-500 text-white";
            case "Accepted":
                return "bg-green-500 text-white";
            case "Rejected":
                return "bg-red-500 text-white";
            default:
                return "bg-gray-500 text-white";
        }
    };
    const statuses = [
        "Pending",
        "Reviewed",
        "Shortlisted",
        "Accepted",
        "Rejected",
    ];

    const updateStatus = () => {
        updateItem(id, { status: selectedStatus }, () =>
            applicationService.updateApplication(id, { status: selectedStatus })
        );
    };

    return (
        <Dialog>
            <DialogTrigger>Edit Status</DialogTrigger>

            <DialogContent>
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
                            />
                            <Badge
                                className={`px-4 rounded-full ${getStatusBadge(status)}`}
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
                    <Button
                        type="button"
                        onClick={() => {
                            updateStatus();
                        }}
                    >
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditStatus;
