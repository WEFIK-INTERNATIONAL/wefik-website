"use client";
import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import TableHeader from "@/components/dashboard/TableHeader";
import { Plus } from "lucide-react";
import { useGetWorks } from "@/queries/works";
import WorkCard from "@/components/dashboard/WorkCard";

export default function WorksPage() {
    const limit = 6;
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [worksData, setWorksData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);

    const { data, isLoading: isWorksLoading } = useGetWorks({
        limit,
        page,
        search,
        sort,
    });

    useEffect(() => {
        if (data?.data) {
            if (page === 1) {
                setWorksData(data.data);
            } else {
                setWorksData((prev) => [...prev, ...data.data]);
            }

            // Determine if there’s a next page
            const totalPages = Math.ceil(
                data.pagination.total / data.pagination.limit
            );
            setHasNextPage(page < totalPages);
        }
        setIsLoading(isWorksLoading);
    }, [data, isWorksLoading, page]);

    const loaderRef = useCallback(
        (node) => {
            if (!node || !hasNextPage || isLoading) return;
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) setPage((prev) => prev + 1);
            });
            observer.observe(node);
            return () => observer.disconnect();
        },
        [hasNextPage, isLoading]
    );

    return (
        <div className="flex flex-col h-full">
            <TableHeader
                title="Projects"
                subtitle="Manage all project postings"
                onSearch={(val) => {
                    setSearch(val);
                    setPage(1); // reset page when searching
                }}
                onSort={(val) => {
                    setSort(val);
                    setPage(1); // reset page when sorting
                }}
                sortOptions={[
                    { label: "Newest", value: "newest" },
                    { label: "Oldest", value: "oldest" },
                ]}
            >
                <Link
                    href="/admin/dashboard/works/post"
                    className="flex justify-center items-center gap-1 px-3 py-[5px] font-bold text-black bg-[#CDD2DA] rounded transition hover:bg-[#b0b6c0]"
                >
                    <Plus size={18} /> Post
                </Link>
            </TableHeader>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 overflow-y-auto h-[calc(100vh-200px)] pt-4">
                {worksData.length === 0 && !isLoading && (
                    <p className="text-center col-span-full text-gray-500 mt-10">
                        No projects found.
                    </p>
                )}

                {worksData.map((work) => (
                    <WorkCard key={work._id} work={work} />
                ))}

                {isLoading && (
                    <p className="text-center col-span-full text-gray-400 py-4">
                        Loading...
                    </p>
                )}

                {hasNextPage && worksData.length !== 0 && !isLoading && (
                    <div
                        ref={loaderRef}
                        className="col-span-full flex justify-center py-4 text-gray-400"
                    >
                        Scroll to load more
                    </div>
                )}
            </div>
        </div>
    );
}
