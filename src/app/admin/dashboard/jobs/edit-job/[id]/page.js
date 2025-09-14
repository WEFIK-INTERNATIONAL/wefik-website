"use client";
import React from "react";
import { use } from "react";
import Link from "next/link";

import { CircleArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import JobPostForm from "@/components/forms/JobPostForm";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import { useGetJobById } from "@/queries/jobs";

const EditJobPage = ({ params }) => {
    const { id } = use(params);
    const { data: job, isLoading } = useGetJobById(id);
    
    return (
        <div>
            <div className="w-20 mb-2">
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
            <Card className="w-full max-w-6xl max-h-[80vh] mx-auto mt-2 dark:text-white overflow-y-scroll">
                <CardHeader>
                    <CardTitle className="text-2xl">Edit Job</CardTitle>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <p className="text-2xl text-center font-bold">
                            Loading...
                        </p>
                    ) : (
                        <JobPostForm job={job} />
                    )}
                </CardContent>
            </Card>
        </div>
    );
};

export default EditJobPage;
