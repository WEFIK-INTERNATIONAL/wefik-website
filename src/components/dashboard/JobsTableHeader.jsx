"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useDebounce } from "@/app/hooks/useDebounce";

const JobsTableHeader = ({ onSearch, onSort }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (debouncedSearch) {
      // If parent provides onSearch, call it, otherwise just log
      if (onSearch) {
        onSearch(debouncedSearch);
      } else {
        console.log("Searching Jobs for:", debouncedSearch);
      }
    }
  }, [debouncedSearch]);

  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center py-6 gap-4">
      {/* Left Section */}
      <div>
        <h1 className="text-xl md:text-2xl font-extrabold">Jobs Table</h1>
        <p className="text-gray-500 text-sm md:text-base">
          Manage all job postings
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full md:w-auto">
        {/* Search Input */}
        <div className="relative flex items-center w-full sm:w-72">
          <input
            className="bg-gray-200/30 w-full py-2 pl-4 pr-10 rounded-md text-sm md:text-base"
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="absolute bg-black/70 p-1.5 rounded-md right-1 hover:cursor-pointer">
            <Search size={18} className="text-white" />
          </button>
        </div>

        {/* Sort Dropdown */}
        <Select
          onValueChange={(value) =>
            onSort ? onSort(value) : console.log("Sort Jobs by:", value)
          }
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectContent>
        </Select>
        <div className="flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-white px-5 h-10 rounded-md text-sm md:text-base font-medium transition-colors">
          <Link href="/admin/dashboard/jobs/create-job">Create a job</Link>
        </div>
      </div>
    </div>
  );
};

export default JobsTableHeader;
