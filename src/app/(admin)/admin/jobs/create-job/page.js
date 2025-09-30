"use client";
import React from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { CircleArrowLeft } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

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

            <Card className="w-full max-w-6xl max-h-[80vh] mx-auto mt-2 dark:text-white overflow-y-scroll">
                <CardHeader>
                    <CardTitle className="text-2xl">Post New Job</CardTitle>
                </CardHeader>
                <CardContent>
                    <JobPostForm />
                </CardContent>
            </Card>
        </div>
    );
};

export default Page;
