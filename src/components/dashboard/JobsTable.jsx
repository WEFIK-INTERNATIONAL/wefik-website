import React from "react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import JobsDropdown from "./JobsDropdown";
import { Badge } from "@/components/ui/badge";
import { EllipsisVertical, PencilLine, Trash2 } from "lucide-react";

const JobsTable = ({ isLoading, currentItems }) => {
  return (
    <div className="overflow-x-auto relative">
      <Table className="min-w-full">
        {/* Table Header */}
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-500">Job ID</TableHead>
            <TableHead className="text-gray-500">Job Title</TableHead>
            <TableHead className="text-gray-500">Employment type</TableHead>
            <TableHead className="text-gray-500">Location</TableHead>
            <TableHead className="text-gray-500">Posted Date</TableHead>
            <TableHead className="text-gray-500">Status</TableHead>
            {/* Sticky Action Column */}
            <TableHead className="text-right text-gray-500 sticky right-0 bg-white shadow-md lg:bg-transparent">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* Table Body */}
        {isLoading ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10">
                Loading...
              </TableCell>
            </TableRow>
          </TableBody>
        ) : !currentItems || currentItems?.length === 0 ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10">
                No jobs found.
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {currentItems.map((job, index) => (
              <TableRow key={index}>
                <TableCell>{job.id}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.employmentType}</TableCell>
                <TableCell>{job.location}</TableCell>
                <TableCell>{job.postedDate}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      job.status === "Open"
                        ? "bg-green-500 text-white"
                        : job.status === "Closed"
                          ? "bg-red-500 text-white"
                          : "bg-gray-500 text-white"
                    }
                  >
                    {job.status}
                  </Badge>
                </TableCell>

                {/* Sticky Action Column */}
                <TableCell className="text-center sticky right-0 bg-white shadow-md lg:static lg:shadow-none lg:bg-transparent lg:text-right">
                 <JobsDropdown id={job._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default JobsTable;
