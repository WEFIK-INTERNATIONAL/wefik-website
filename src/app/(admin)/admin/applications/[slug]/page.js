"use client";

import React, { use } from "react"; // ✅ import use()
import ApplicationDetails from "@/components/dashboard/ApplicationDetails";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleArrowLeft } from "lucide-react";

import { useGetApplicationById } from "@/queries/applications";

const Page = ({ params }) => {
    // ✅ unwrap params with React.use()
    const { slug } = use(params);

    const { data: application, isLoading,isError } = useGetApplicationById(slug);

    return (
        <div className="max-w-6xl mx-auto space-y-3 md:p-2">
            {/* Back Button */}
            <div className="w-20">
                <Button
                    asChild
                    variant="outline"
                    className="flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 hover:text-white"
                >
                    <Link href="/admin/dashboard/applications">
                        <CircleArrowLeft className="h-4 w-4" />
                        Back
                    </Link>
                </Button>
            </div>

            {/* Application Details */}
            {isLoading ? (
                <p className="text-gray-500 text-center">
                    Loading application...
                </p>
            ) : isError ? (
                <p className="text-red-500 text-center">
                    {error?.message ?? "Failed to load application."}
                </p>
            ) : application ? (
                <ApplicationDetails application={application} />
            ) : (
                <p className="text-red-500 text-center">
                    Application not found.
                </p>
            )}
        </div>
    );
};

export default Page;
