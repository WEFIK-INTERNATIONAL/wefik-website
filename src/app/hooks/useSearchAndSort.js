"use client";
import { useMemo } from "react";

/**
 * Generic search & sort hook
 *
 * @param {Array} data - The dataset
 * @param {string} searchTerm - Current search term
 * @param {string} sortOrder - "newest" | "oldest" | ""
 * @param {Array<string>} searchFields - List of fields to search
 * @param {string} sortField - Field to sort by (e.g., "appliedAt", "createdAt")
 */

export function useSearchAndSort({
    data,
    searchTerm,
    sortOrder,
    searchFields = [],
    sortField = null,
}) {
    return useMemo(() => {
        // let result = [...data];
        let result = [];

        // 🔍 Filtering
        if (searchTerm.trim() !== "") {
            const term = searchTerm.toLowerCase();

            result = result.filter((item) =>
                searchFields.some((field) => {
                    const value = getNestedValue(item, field);
                    return value?.toString().toLowerCase().includes(term);
                })
            );
        }

        // ⏱️ Sorting
        if (sortField) {
            result.sort((a, b) => {
                const aVal = new Date(getNestedValue(a, sortField));
                const bVal = new Date(getNestedValue(b, sortField));

                if (sortOrder === "newest") return bVal - aVal;
                if (sortOrder === "oldest") return aVal - bVal;
                return 0;
            });
        }

        return result;
    }, [searchTerm, sortOrder, searchFields, sortField]);
}

// ✅ Helper: support deep object paths like "candidateInfo.email"
function getNestedValue(obj, path) {
    return path.split(".").reduce((acc, key) => acc?.[key], obj);
}
