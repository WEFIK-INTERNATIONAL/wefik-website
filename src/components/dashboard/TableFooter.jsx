import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const TableFooter = ({ isLoading, pagination, onPageChange }) => {
    if (!pagination) return null;

    const { page, pages, total, limit } = pagination;

    // Calculate range
    const indexOfFirst = (page - 1) * limit + 1;
    const indexOfLast = Math.min(page * limit, total);

    return (
        <div className="flex justify-between items-center py-6">
            {/* Left side - info text */}
            <div>
                {isLoading ? (
                    <p className="text-gray-500 text-sm">Loading...</p>
                ) : (
                    <p className="text-gray-500 text-sm">
                        Showing {indexOfFirst} to {indexOfLast} of {total}{" "}
                        entries
                    </p>
                )}
            </div>

            {/* Right side - pagination */}
            <div>
                <Pagination>
                    <PaginationContent>
                        {/* Prev button */}
                        <PaginationItem>
                            <PaginationPrevious
                                onClick={() => onPageChange(page - 1)}
                                className={`cursor-pointer ${
                                    page === 1
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                }`}
                            />
                        </PaginationItem>

                        {/* Page numbers */}
                        {Array.from({ length: pages }).map((_, i) => (
                            <PaginationItem key={i}>
                                <PaginationLink
                                    isActive={page === i + 1}
                                    onClick={() => onPageChange(i + 1)}
                                    className="cursor-pointer"
                                >
                                    {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        {/* Next button */}
                        <PaginationItem>
                            <PaginationNext
                                onClick={() => onPageChange(page + 1)}
                                className={`cursor-pointer ${
                                    page === pages
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                }`}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
};

export default TableFooter;
