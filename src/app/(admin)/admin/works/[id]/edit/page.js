"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CircleArrowLeft } from "lucide-react";

import { useGetWorkById } from "@/queries/works";

import WorkForm from "@/components/forms/workForm";

const Page = ({ params }) => {
    const router = useRouter();

    const resolvedParams = React.use(params);
    const id = resolvedParams.id;

    const { data: work, isLoading } = useGetWorkById(id);

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

            <div className="overflow-y-auto h-[calc(100vh-180px)] border border-slate-700 rounded-xl bg-slate-950 shadow-md p-6">
                <h1 className="text-2xl font-semibold text-white mb-6">
                    Add New Project
                </h1>
                <WorkForm work={work?.data} />
            </div>
        </div>
    );
};

export default Page;
