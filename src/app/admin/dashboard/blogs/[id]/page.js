"use client";

import React from "react";
import JobDescription from "@/components/JobDescription";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleArrowLeft } from "lucide-react";
import BlogDetails from "@/components/dashboard/BlogsDetails";

import { useGetBlogById } from "@/queries/blog";

const Page = ({ params }) => {
    const resolvedParams = React.use(params);
    const id = resolvedParams.id;
    const { data: blog, isLoading } = useGetBlogById(id);
    console.log(blog);

    return (
        <div className="max-w-6xl mx-auto space-y-3 p-2">
            {/* Back Button */}
            <div className="w-20">
                <Button
                    asChild
                    variant="outline"
                    className="flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 hover:text-white"
                >
                    <Link href="/admin/dashboard/blogs">
                        <CircleArrowLeft className="h-4 w-4" />
                        Back
                    </Link>
                </Button>
            </div>
            <BlogDetails blog={blog} />
        </div>
    );
};

export default Page;