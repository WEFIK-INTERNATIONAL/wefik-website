import React from "react";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const TableFooter = ({ isLoading, pagination }) => {
    return (
        <div className="flex justify-between items-center py-6">
            {/* Left side - info text */}
            <div>
                {isLoading ? (
                    <p className="text-gray-500 text-sm">Loading...</p>
                ) : (
                    <p className="text-gray-500 text-sm">
                        Showing {pagination.indexOfFirst + 1} to{" "}
                        {pagination.indexOfLast} of {pagination.totalItems}{" "}
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
                                onClick={pagination.goToPrevPage}
                                className={`cursor-pointer ${
                                    pagination.currentPage === 1
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                }`}
                            />
                        </PaginationItem>

                        {/* Page numbers */}
                        {Array.from({ length: pagination.totalPages }).map(
                            (_, i) => (
                                <PaginationItem key={i}>
                                    <PaginationLink
                                        isActive={
                                            pagination.currentPage === i + 1
                                        }
                                        onClick={() =>
                                            pagination.goToPage(i + 1)
                                        }
                                        className="cursor-pointer"
                                    >
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            )
                        )}

                        {/* Next button */}
                        <PaginationItem>
                            <PaginationNext
                                onClick={pagination.goToNextPage}
                                className={`cursor-pointer ${
                                    pagination.currentPage ===
                                    pagination.totalPages
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
