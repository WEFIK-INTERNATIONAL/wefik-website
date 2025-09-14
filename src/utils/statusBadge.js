// utils/statusBadge.js
export const getStatusBadgeClasses = (status) => {
    switch (status) {
        case "Accepted":
            return "bg-green-500/20 text-green-700 dark:text-green-300 backdrop-blur-md border border-green-500/30 shadow-lg";
        case "Pending":
            return "bg-yellow-500/20 text-yellow-700 dark:text-yellow-300 backdrop-blur-md border border-yellow-500/30 shadow-lg";
        case "Reviewed":
            return "bg-blue-500/20 text-blue-700 dark:text-blue-300 backdrop-blur-md border border-blue-500/30 shadow-lg";
        case "Shortlisted":
            return "bg-purple-500/20 text-purple-700 dark:text-purple-300 backdrop-blur-md border border-purple-500/30 shadow-lg";
        case "Rejected":
            return "bg-red-500/20 text-red-700 dark:text-red-300 backdrop-blur-md border border-red-500/30 shadow-lg";
        case "Draft":
            return "bg-gray-500/20 text-gray-700 dark:text-gray-300 backdrop-blur-md border border-gray-500/30 shadow-lg";
        case "Open":
            return "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 backdrop-blur-md border border-emerald-500/30 shadow-lg";
        case "Closed":
            return "bg-red-500/20 text-red-700 dark:text-red-300 backdrop-blur-md border border-red-500/30 shadow-lg";
        default:
            return "bg-neutral-500/20 text-neutral-700 dark:text-neutral-300 backdrop-blur-md border border-neutral-500/30 shadow-lg";
    }
};
