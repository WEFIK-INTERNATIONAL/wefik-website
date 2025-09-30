"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CircleArrowLeft } from "lucide-react";

import { useGetWorkById } from "@/queries/works";

import WorkDetails from "@/components/dashboard/WorkDetails";

const Page = ({ params }) => {
    const router = useRouter();

    const resolvedParams = React.use(params);
    const id = resolvedParams.id;

    const { data: work, isLoading } = useGetWorkById(id);

    const handleEdit = () => {
        // Implement edit functionality
    };

    const handleDelete = () => {
        // Implement delete functionality
    };

    const handleStatusToggle = () => {
        // Implement status toggle functionality
    };

    return (
        <div className="max-w-6xl mx-auto space-y-3 p-2">
            {/* Back Button */}
            <div className="w-20">
                <Button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 hover:text-white"
                >
                    <CircleArrowLeft className="h-4 w-4" />
                    Back
                </Button>
            </div>

            <div className="overflow-y-auto h-[calc(100vh-180px)] rounded-xl border border-slate-800 ">
                <WorkDetails
                    work={work?.data}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onStatusToggle={handleStatusToggle}
                />
            </div>
        </div>
    );
};

export default Page;
