import React from "react";
import { Badge } from "./ui/badge";

const getStatusBadgeClasses = (status) => {
    const baseClasses = "backdrop-blur-md border shadow-lg";

    const normalized = status?.toLowerCase();

    switch (normalized) {
        case "pending":
            return `${baseClasses} bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 border-yellow-500/30`;

        case "reviewed":
            return `${baseClasses} bg-blue-500/20 text-blue-700 dark:text-blue-300 border-blue-500/30`;

        case "shortlisted":
            return `${baseClasses} bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30`;

        case "closed":
        case "rejected":
        case "private":
            return `${baseClasses} bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30`;

        case "draft":
            return `${baseClasses} bg-gray-500/20 text-gray-700 dark:text-gray-300 border-gray-500/30`;

        case "open":
        case "public":
        case "accepted":
        case "published":
            return `${baseClasses} bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30`;

        default:
            return `${baseClasses} bg-neutral-500/20 text-neutral-700 dark:text-neutral-300 border-neutral-500/30`;
    }
};

const capitalizeFirstLetter = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

const StatusBadge = ({ status }) => {
    return (
        <Badge
            variant="outline"
            className={`px-5 py-1 font-semibold rounded-full ${getStatusBadgeClasses(status)}`}
        >
            {capitalizeFirstLetter(status)}
        </Badge>
    );
};

export default StatusBadge;
