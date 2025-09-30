"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import DataTable from "@/components/dashboard/DataTable";
import TableFooter from "@/components/dashboard/TableFooter";
import TableHeader from "@/components/dashboard/TableHeader";
import ActionDropdown from "@/components/dashboard/ActionDropdown";

import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { useGetWorks, useDeleteWork, useUpdateWork } from "@/queries/works";
import { formatDate } from "@/utils/formatDate";
import { getStatusBadgeClasses } from "@/utils/statusBadge";

export default function WorksPage() {
    const limit = 9;
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");

    const { data, isLoading: isWorksLoading } = useGetWorks(
        page,
        limit,
        search,
        sort
    );

    const { mutate: updateStatus, isPending: updateIsPending } =
        useUpdateWork();
    const { mutate: deleteWork, isPending: deleteIsPending } = useDeleteWork();

    const columns = [
        { header: "Title", accessor: "title" },
        {
            header: "Thumbnail",
            accessor: "images",
            align: "center",
            cell: (row) => (
                <div className="h-12 flex items-center justify-center overflow-hidden">
                    <Image
                        src={row.images?.url || "/images/default.png"}
                        alt={row.title}
                        width={80}
                        height={48}
                        className="object-contain"
                        quality={80}
                        priority={false}
                        loading="lazy"
                    />
                </div>
            ),
        },
        { header: "Category", accessor: "category", align: "center" },

        {
            header: "Posted At",
            accessor: "createdAt",
            align: "center",
            cell: (row) => formatDate(row.createdAt),
        },
        { header: "Views", accessor: "views", align: "center" },
        {
            header: "Featured",
            accessor: "isFeatured",
            align: "center",
            cell: (row) =>
                row.isFeatured && (
                    <Badge className="px-3 py-1 text-center font-semibold rounded-full bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/30">
                        ⭐️ Featured
                    </Badge>
                ),
        },
        {
            header: "Status",
            accessor: "status",
            align: "center",
            cell: (row) => (
                <Badge
                    className={`px-3 py-1 font-semibold rounded-full ${getStatusBadgeClasses(row.status)}`}
                >
                    {row.status}
                </Badge>
            ),
        },
        {
            header: "Actions",
            accessor: "_id",
            align: "center",
            cell: (row) => (
                <div className="flex justify-center">
                    <ActionDropdown
                        viewDetailsPath={`/admin/works/${row._id}`}
                        editAction={{
                            id: row._id,
                            path: `/admin/works/${row._id}/edit`,
                            triggerLabel: "Edit Work",
                        }}
                        statusAction={{
                            id: row._id,
                            entityName: "Work Status",
                            currentStatus: row.status,
                            statuses: ["Public", "Private", "Draft"],
                            callback: updateStatus,
                            isUpdating: updateIsPending,
                            triggerLabel: "Edit Status",
                        }}
                        deleteAction={{
                            id: row._id,
                            entityName: "Work",
                            callback: deleteWork,
                            isDeleting: deleteIsPending,
                            triggerLabel: "Delete Work",
                        }}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="flex flex-col h-full">
            <TableHeader
                title="Projects"
                subtitle="Manage all project postings"
                onSearch={(val) => {
                    setSearch(val);
                    setPage(1);
                }}
                onSort={(val) => {
                    setSort(val);
                    setPage(1);
                }}
                sortOptions={[
                    { label: "Newest", value: "newest" },
                    { label: "Oldest", value: "oldest" },
                ]}
            >
                <Link
                    href="/admin/works/post"
                    className="flex justify-center items-center gap-1 px-3 py-[5px] font-bold text-black bg-[#CDD2DA] rounded transition hover:bg-[#b0b6c0]"
                >
                    <Plus size={18} /> Post
                </Link>
            </TableHeader>

            <DataTable
                isLoading={isWorksLoading}
                columns={columns}
                data={data?.data}
            />

            {data?.pagination.total > 0 && (
                <TableFooter
                    isLoading={isWorksLoading}
                    pagination={data?.pagination}
                    onPageChange={setPage}
                />
            )}
        </div>
    );
}
