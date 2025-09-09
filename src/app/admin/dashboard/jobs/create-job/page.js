import React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { CircleArrowLeft } from "lucide-react";
import JobPostForm from "@/components/forms/JobPostForm"

const page = () => {
    return (
        <div className="">
            <div className="w-20 mb-4">
                <Button
                    asChild
                    variant="outline"
                    className="flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 hover:text-white"
                >
                    <Link href="/admin/dashboard/jobs">
                        <CircleArrowLeft className="h-4 w-4" /> Back
                    </Link>
                </Button>
            </div>
            <JobPostForm/>
        </div>
    );
};

export default page;
