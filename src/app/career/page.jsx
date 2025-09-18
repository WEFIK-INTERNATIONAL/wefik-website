"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

import { ArrowUpRight, Search, Clock3, Calendar1, Pin } from "lucide-react";

import { useSearchJob, useGetJobProfile } from "@/queries/jobs";

export default function CareersPage() {
    const [pageNo, setPageNo] = useState(1);
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("All");
    const [filterLocation, setFilterLocation] = useState("All");
    const [activeDepartment, setActiveDepartment] = useState("View all");

    const { data: jobProfile, isLoading: jobProfileLoading } =
        useGetJobProfile();

    const { data, isLoading: searchLoading } = useSearchJob({
        search,
        location: filterLocation !== "All" ? filterLocation : undefined,
        department:
            activeDepartment !== "View all" ? activeDepartment : undefined,
        type: filterType !== "All" ? filterType : undefined,
        page: pageNo,
        limit: 3,
    });

    const jobs = data?.jobs.data || [];
    const paginationData = data?.pagination || {};
    const { page = 1, pages = 1, total = 0, limit = 3 } = paginationData;

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

    const handlePageChange = (num) => setPageNo(num);

    return (
        <main className="min-h-screen bg-black text-white mt-16">
            {/* Header */}
            <header className="max-w-6xl mx-auto px-6 py-12 text-center">
                <span className="bg-[#9AE300] text-black text-sm font-medium px-3 py-1 rounded-full">
                    We’re hiring!
                </span>
                <h1 className="text-4xl md:text-6xl font-extrabold mt-4 bg-gradient-to-r from-[#9AE300] via-white to-[#9AE300] bg-clip-text text-transparent">
                    Be part of our mission
                </h1>
                <p className="text-gray-400 mt-4 max-w-2xl mx-auto leading-relaxed">
                    We’re looking for passionate people to join us on our
                    journey. We value flat hierarchies, clear communication, and
                    full ownership & responsibility.
                </p>
            </header>

            <div className="flex flex-wrap justify-center gap-3 px-6 mb-8">
                {/* View All button */}
                <Button
                    key="view-all"
                    variant={
                        activeDepartment === "View all" ? "default" : "outline"
                    }
                    onClick={() => setActiveDepartment("View all")}
                    className={`rounded-full transition hover:cursor-pointer ${
                        activeDepartment === "View all"
                            ? "bg-[#9AE300] text-black hover:bg-[#85c600]"
                            : "border-zinc-700 text-black"
                    }`}
                >
                    View All
                </Button>

                {/* Dynamic department buttons */}
                {jobProfile?.map((dept) => (
                    <Button
                        key={dept._id}
                        variant={
                            activeDepartment === dept.department
                                ? "default"
                                : "outline"
                        }
                        onClick={() => setActiveDepartment(dept.department)}
                        className={`rounded-full transition hover:cursor-pointer ${
                            activeDepartment === dept.department
                                ? "bg-[#9AE300] text-black hover:bg-[#85c600]"
                                : "border-zinc-700 text-black"
                        }`}
                    >
                        {dept.department}
                    </Button>
                ))}
            </div>

            {/* Search + Filters */}
            <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-4 items-center mb-12">
                {/* Search */}
                <div className="relative w-full md:flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                        type="text"
                        placeholder="Search by title or skills..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 bg-zinc-900 border-zinc-700 text-white placeholder-gray-500"
                    />
                </div>

                {/* Location Filter */}
                <Select
                    value={filterLocation}
                    onValueChange={setFilterLocation}
                >
                    <SelectTrigger className="w-full md:w-[200px] bg-zinc-900 border-zinc-700 text-white">
                        <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                        <SelectItem value="All">All Locations</SelectItem>
                        <SelectItem value="Onsite">Onsite</SelectItem>
                        <SelectItem value="Remote">Remote</SelectItem>
                        <SelectItem value="Hybrid">Hybrid</SelectItem>
                    </SelectContent>
                </Select>

                {/* Type Filter */}
                <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-full md:w-[200px] bg-zinc-900 border-zinc-700 text-white">
                        <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-zinc-900 border-zinc-700 text-white">
                        <SelectItem value="All">All Types</SelectItem>
                        <SelectItem value="Full-time">Full-time</SelectItem>
                        <SelectItem value="Part-time">Part-time</SelectItem>
                        <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                </Select>

                <Button
                    onClick={() => {
                        setSearch("");
                        setFilterType("All");
                        setFilterLocation("All");
                        setActiveDepartment("View all");
                    }}
                    className="bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800/80 transition shadow-lg hover:shadow-xl hover:cursor-pointer"
                >
                    Clear All
                </Button>
            </div>

            {/* Job Listings */}
            <section className="max-w-7xl mx-auto px-6 space-y-6 pb-20">
                {jobs?.length > 0 ? (
                    jobs?.map((job) => (
                        <Card
                            key={job.jobId}
                            className="bg-zinc-900/70 border border-zinc-700 rounded-2xl text-white hover:bg-zinc-800/80 transition shadow-lg hover:shadow-xl"
                        >
                            <CardContent className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 gap-6">
                                {/* Job Info */}
                                <div className="space-y-3 w-full">
                                    <h3 className="text-2xl font-bold">
                                        {job.jobProfile}
                                    </h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {job.description?.slice(0, 120)}...
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-2">
                                        <Badge className="bg-[#9AE300]/10 border border-[#9AE300]/40 text-[#9AE300]">
                                            {job.type}
                                        </Badge>
                                    </div>

                                    {/* Skills */}
                                    {job.skills?.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mt-3">
                                            {job.skills.map((skill, i) => (
                                                <Badge
                                                    key={i}
                                                    className="bg-zinc-800 border border-zinc-600 text-gray-200"
                                                >
                                                    {skill.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    )}

                                    {/* Salary & Openings */}
                                    <div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-3">
                                        <p className="flex justify-center items-center gap-1">
                                            <Clock3 className="w-4 h-4" />{" "}
                                            Posted {timeAgo(job.createdAt)}
                                        </p>
                                        <p className="flex justify-center items-center gap-1">
                                            <Pin className="w-4 h-4" />{" "}
                                            Openings: {job.openings}
                                        </p>
                                        <p className="flex justify-center items-center gap-1">
                                            <Calendar1 className="w-4 h-4" />{" "}
                                            Deadline:{" "}
                                            {new Date(
                                                job.applicationDeadline
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>

                                {/* Apply Button */}
                                <Link
                                    href={`/career/${job.title}`}
                                    className="shrink-0 text-xl font-semibold text-[#9AE300] hover:text-white bg-[#9AE300]/10 border border-[#9AE300]/30 px-5 py-2 rounded-xl flex items-center gap-2 hover:bg-[#9AE300]/20 transition"
                                >
                                    Apply <ArrowUpRight className="w-6 h-6" />
                                </Link>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p className="text-center text-gray-500">No jobs found.</p>
                )}
            </section>

            {/* Pagination */}
            <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-center">
                <Pagination>
                    <PaginationContent className="flex gap-2">
                        {/* Prev button */}
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() =>
                                    handlePageChange(Math.max(1, page - 1))
                                }
                                className={`px-4 py-2 rounded-xl flex items-center gap-1 text-[#9AE300] border border-[#9AE300]/30 bg-[#9AE300]/10 hover:bg-[#9AE300]/20 hover:text-[#9AE300] transition cursor-pointer ${
                                    page === 1
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                }`}
                            >
                                Prev
                            </PaginationPrevious>
                        </PaginationItem>

                        {/* Page numbers */}
                        {Array.from({ length: pages }).map((_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    isActive={page === i + 1}
                                    onClick={() => handlePageChange(i + 1)}
                                    className={`px-4 py-2 rounded-xl flex items-center justify-center gap-1 transition border ${
                                        page === i + 1
                                            ? "bg-[#9AE300]/10 text-white border-[#9AE300]/30 font-semibold hover:bg-[#9AE300]/20 hover:text-[#9AE300]"
                                            : "bg-transparent text-[#9AE300] border-[#9AE300]/30 hover:bg-[#9AE300]/20 hover:text-[#9AE300]"
                                    } cursor-pointer`}
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {/* Next button */}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() =>
                                    handlePageChange(Math.min(pages, page + 1))
                                }
                                className={`px-4 py-2 rounded-xl flex items-center gap-1 text-[#9AE300] border border-[#9AE300]/30 bg-[#9AE300]/10 hover:bg-[#9AE300]/20 hover:text-[#9AE300] transition cursor-pointer ${
                                    page === pages
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                }`}
                            >
                                Next
                            </PaginationNext>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </main>
    );
}
