"use client";
import React, { useState } from "react";
import Link from "next/link";
import TableHeader from "@/components/dashboard/TableHeader";
const page = () => {
    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div>
            <TableHeader
                title="Job Profile Table"
                subtitle="Manage all Job Profiles"
                onSearch={setSearchTerm}
            >
                <Link
                    href="/admin/dashboard/job-profile/create-job-profile"
                    className="px-4 py-1 bg-[#9AE600]/80 text-white rounded-md hover:bg-[#9AE600]/70 transition"
                >
                    Create Job Profile
                </Link>
            </TableHeader>
        </div>
    );
};

export default page;
