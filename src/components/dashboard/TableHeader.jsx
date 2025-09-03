"use client";
import React, { useState, useEffect } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useDebounce } from "@/app/hooks";

/**
 * Reusable TableHeader
 *
 * @param {string} title - Main heading
 * @param {string} subtitle - Sub heading/description
 * @param {function} onSearch - Callback for search input
 * @param {function} onSort - Callback for sort dropdown
 * @param {Array<{label: string, value: string}>} sortOptions - Sort options
 * @param {ReactNode} children - Extra actions (buttons, links, etc.)
 */

const TableHeader = ({
    title,
    subtitle,
    onSearch,
    onSort,
    sortOptions = [],
    children,
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearch = useDebounce(searchTerm, 500);

    useEffect(() => {
        onSearch?.(debouncedSearch);
    }, [debouncedSearch]);

    return (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
            {/* Title + Subtitle */}
            <div>
                <h1 className="text-xl md:text-2xl font-extrabold">{title}</h1>
                {subtitle && (
                    <p className="text-[#F7A5A5] text-sm md:text-base">
                        {subtitle}
                    </p>
                )}
            </div>

            {/* Search + Sort + Extra Actions */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 w-full md:w-auto items-center">
                {/* 🔍 Search Input */}
                {onSearch && (
                    <div className="relative flex items-center w-full sm:w-72">
                        <input
                            className="bg-gray-200/30 w-full py-2 pl-4 pr-10 rounded-md text-sm md:text-sm"
                            type="text"
                            placeholder="Search..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute bg-black/70 p-1.5 rounded-md right-1 hover:cursor-pointer"
                        >
                            <Search size={18} className="text-white" />
                        </button>
                    </div>
                )}

                {/* ⏱️ Sort Dropdown */}
                {onSort && sortOptions.length > 0 && (
                    <Select onValueChange={(value) => onSort(value)}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>
                        <SelectContent>
                            {sortOptions.map((option) => (
                                <SelectItem
                                    key={option.value}
                                    value={option.value}
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                {/* ➕ Extra Buttons / Links */}
                {children && <div className="flex gap-2">{children}</div>}
            </div>
        </div>
    );
};

export default TableHeader;
