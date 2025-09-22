"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CircleArrowLeft } from "lucide-react";
import JobPostForm from "@/components/forms/JobPostForm";

const Page = () => {
    const router = useRouter();
    return (
        <div className="p-2 space-y-6">
            {/* Back Button */}
            <div className="w-24">
                <Button
                    // variant="outline"
                    onClick={() => router.back()}
                    className="flex items-center gap-2 bg-slate-950 text-white
                             hover:bg-slate-800 hover:text-white border border-slate-700"
                >
                    <CircleArrowLeft className="h-4 w-4" /> Back
                </Button>
            </div>

            {/* Form Container */}
            <div
                className="overflow-y-auto h-[calc(100vh-180px)] border border-slate-700
                          rounded-xl bg-slate-950 shadow-md p-6"
            >
                <h1 className="text-2xl font-semibold text-white mb-6">
                    Post A New Job
                </h1>
                <JobPostForm />
            </div>
        </div>
    );
};

export default Page;
