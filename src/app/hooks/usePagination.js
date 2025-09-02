"use client";
import { useState, useMemo } from "react";

export function usePagination({ data = [], itemsPerPage = 10 }) {
    const [currentPage, setCurrentPage] = useState(1);

    // ✅ Calculate indexes
    const totalItems = data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;

    // ✅ Slice data
    const currentItems = useMemo(
        () => data.slice(indexOfFirst, indexOfLast),
        [data, indexOfFirst, indexOfLast]
    );

    // ✅ Utility functions
    const goToNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const goToPrevPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    const pagination = {
        currentPage,
        setCurrentPage,
        totalPages,
        totalItems,
        indexOfFirst,
        indexOfLast: Math.min(indexOfLast, totalItems),
        currentItems,
        goToNextPage,
        goToPrevPage,
        goToPage,
    };

    return pagination;
}
