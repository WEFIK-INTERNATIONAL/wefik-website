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

    const { page, pages = 1, total, limit } = pagination;

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
                                disabled={page === 1}
                                onClick={() =>
                                    page > 1 && onPageChange(page - 1)
                                }
                                className={`cursor-pointer ${
                                    page === 1
                                        ? "opacity-50 pointer-events-none"
                                        : ""
                                }`}
                            />
                        </PaginationItem>

                        {/* Page numbers */}
                        {Array.from({ length: pages }, (_, i) => i + 1).map(
                            (p) => (
                                <PaginationItem key={p}>
                                    <PaginationLink
                                        isActive={page === p}
                                        onClick={() => onPageChange(p)}
                                        className={`cursor-pointer ${page === p ? "font-semibold" : ""}`}
                                    >
                                        {p}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        )}

                        {/* Next button */}
                        <PaginationItem>
                            <PaginationNext
                                disabled={page === pages}
                                onClick={() =>
                                    page < pages && onPageChange(page + 1)
                                }
                                className={`cursor-pointer ${
                                    page === pages
                                        ? "opacity-50 pointer-events-none"
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
