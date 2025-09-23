"use client";
import React, { useState } from "react";
import Link from "next/link";

import TableHeader from "@/components/dashboard/TableHeader";
import DataTable from "@/components/dashboard/DataTable";
import TableFooter from "@/components/dashboard/TableFooter";
import ActionDropdown from "@/components/dashboard/ActionDropdown";

import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/formatDate";

import { Plus } from "lucide-react";

import { useDeleteBlog,useCreateBlog,useUpdateBlog, useGetBlogs } from "@/queries/blog";
import { getStatusBadgeClasses } from "@/utils/statusBadge";

export default function BlogsPage() {
  const limit = 9;
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const { data: blogs, isLoading } = useGetBlogs(page, limit, search, sort);
  const { mutate: updateStatus, isPending: updateIsPending } = useUpdateBlog();
  const { mutate: deleteBlog, isPending: deleteIsPending } = useDeleteBlog();

  // 📝 Columns for Blogs Table
  const columns = [
    { header: "Blog ID", accessor: "blogId" },
    { header: "Title", accessor: "title" },
    { header: "Author", accessor: "author", align: "center" },
    {
      header: "Published On",
      accessor: "publishedAt",
      cell: (row) => formatDate(row.publishedAt),
    },
    {
      header: "Status",
      accessor: "status",
      align: "center",
      cell: (row) => (
        <Badge
          className={`px-6 py-1 font-semibold rounded-full ${getStatusBadgeClasses(row.status)}`}
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
            viewDetailsPath={`/admin/dashboard/blogs/${row.blogId}`}
            editAction={{
              blogId: row.blogId,
              triggerLabel: "Edit Blog",
            }}
            statusAction={{
              id: row._id,
              entityName: "Blog",
              currentStatus: row.status,
              statuses: ["Published", "Draft", "Archived"],
              callback: updateStatus,
              isUpdating: updateIsPending,
              triggerLabel: "Edit Status",
            }}
            deleteAction={{
              id: row._id,
              entityName: "Blog",
              callback: deleteBlog,
              isDeleting: deleteIsPending,
              triggerLabel: "Delete Blog",
            }}
          />
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col">
      <TableHeader
        title="Blogs Table"
        subtitle="Manage all blog posts"
        onSearch={setSearch}
        onSort={setSort}
        sortOptions={[
          { label: "Newest", value: "newest" },
          { label: "Oldest", value: "oldest" },
        ]}
      >
        <Link
          href="/admin/dashboard/blogs/create-blog"
          className="flex justify-center items-center gap-1 px-3 py-[5px] font-bold text-black bg-[#CDD2DA] rounded transition"
        >
          <Plus size={18} /> Create Blog
        </Link>
      </TableHeader>

      <DataTable
        isLoading={isLoading}
        columns={columns}
        data={blogs?.data}
      />

      <TableFooter
        isLoading={isLoading}
        pagination={blogs?.pagination}
        onPageChange={setPage}
      />
    </div>
  );
}
