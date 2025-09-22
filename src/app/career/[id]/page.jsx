"use client";
import { useParams } from "next/navigation";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useGetJobById } from "@/queries/jobs";

import { Calendar1, Pin, Clock3 } from "lucide-react";

import JobDescription from "@/components/JobDescription";
import Loader from "@/components/Loader";
import ApplicationForm from "@/components/forms/application-form/ApplicationForm";

export default function Page({ params }) {
    const { id } = useParams();
    const { data: job, isLoading: loading } = useGetJobById(id);

    const timeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;

        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        if (seconds < 60) return "just now";
        if (minutes < 60) return `${minutes} min${minutes > 1 ? "s" : ""} ago`;
        if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
        if (days < 7) return `${days} day${days > 1 ? "s" : ""} ago`;
        return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
    };

    if (loading) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <Loader size={200} />
            </div>
        );
    }

    if (!job) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <p className="text-center text-xl font-bold text-red-700">
                    Job not found !
                </p>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white mt-16 px-6 py-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left column - Job Info */}
            <section className="lg:col-span-1 space-y-6">
                <h1 className="text-4xl font-bold">{job.jobProfile}</h1>
                <h1 className="text-sm text-gray-400">{job.jobId}</h1>
                <div className="flex gap-3 flex-wrap">
                    <Badge className="bg-[#9AE300]/10 border border-[#9AE300]/40 text-[#9AE300]">
                        {job.type}
                    </Badge>
                    <Badge className="bg-zinc-800 border border-zinc-600 text-gray-200">
                        {job.location}
                    </Badge>
                    <Badge className="bg-zinc-800 border border-zinc-600 text-gray-200">
                        {job.experienceLevel}
                    </Badge>
                    <Badge className="bg-zinc-800 border border-zinc-600 text-gray-200">
                        {job.compensationType}
                    </Badge>
                </div>

                <div className="flex flex-col gap-2 md:flex-row md:gap-6 text-sm text-gray-400">
                    <p className="flex items-center gap-2">
                        <Clock3 className="w-4 h-4" />
                        Posted {timeAgo(job.createdAt)}
                    </p>
                    <p className="flex items-center gap-2">
                        <Clock3 className="w-4 h-4" />
                        Openings: {job.openings}
                    </p>
                    <p className="flex items-center gap-2">
                        <Pin className="w-4 h-4" />
                        {job.companyName}
                    </p>
                    <p className="flex items-center gap-2">
                        <Calendar1 className="w-4 h-4" />
                        Deadline:{" "}
                        {new Date(job.applicationDeadline).toLocaleDateString()}
                    </p>
                </div>

                {/* Description (render HTML safely) */}
                <JobDescription description={job.description} />

                {/* Salary Info */}
                {job.salary?.amount && (
                    <p className="text-gray-300">
                        💰 Salary: {job.salary.amount} {job.salary.currency}
                    </p>
                )}

                {/* Skills */}
                {job.skills?.length > 0 && (
                    <div>
                        <h2 className="text-xl font-semibold mb-2">
                            Skills Required
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {job.skills.map((skill, i) => (
                                <Badge
                                    key={i}
                                    className="bg-zinc-800 border border-zinc-600 text-gray-200"
                                >
                                    {skill.name}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            {/* Right column - Application Form */}
            <aside className="lg:col-span-1">
                <ApplicationForm
                    formTitle={"Apply Now"}
                    jobId={job.jobId}
                    jobTitle={job.jobProfile}
                />
            </aside>
        </main>
    );
}
