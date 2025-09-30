"use client";

import React from "react";
import Link from "next/link";

import { CircleArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import JobsDetails from "@/components/dashboard/JobsDetails";

import { useGetJobById } from "@/queries/jobs";

const Page = ({ params }) => {
    const resolvedParams = React.use(params);
    const id = resolvedParams.id;

    const { data: job, isLoading } = useGetJobById(id);

    return (
        <div className="max-w-6xl mx-auto space-y-3 p-2">
            {/* Back Button */}
            <div className="w-20">
                <Button
                    asChild
                    variant="outline"
                    className="flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 hover:text-white"
                >
                    <Link href="/admin/dashboard/jobs">
                        <CircleArrowLeft className="h-4 w-4" />
                        Back
                    </Link>
                </Button>
            </div>

            {/* JobsDetails Details */}
            <JobsDetails job={job} />
        </div>
    );
};

export default Page;
