"use client";
import React from "react";
import { Briefcase, FileText, CheckCircle } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import { useGetStats } from "@/queries/stats";

const Dashboard = () => {
    const { data: stats, isLoading } = useGetStats();

    // ✅ Extract directly from stats (flat numbers, not arrays)
    const totalJobs = stats?.totalJobs || 0;
    const activeJobs = stats?.totalOpenJobs || 0;
    const closedJobs = stats?.totalClosedJobs || 0;

    const totalApplications = stats?.totalApplications || 0;

    // ✅ Find application statuses (stored as lowercase in backend)
    const pending =
        stats?.applicationsByStatus?.find((s) => s.status === "pending")
            ?.count || 0;
    const shortlisted =
        stats?.applicationsByStatus?.find((s) => s.status === "shortlisted")
            ?.count || 0;

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6 p-6 overflow-y-scroll">
            <StatsCard
                title="Total Jobs Posted"
                isLoading={isLoading}
                value={totalJobs}
                badgeText={`Closed: ${closedJobs}`}
                icon={Briefcase}
                iconColor="text-purple-400"
                glowColor="from-purple-500/30 to-purple-500/10"
            />

            <StatsCard
                title="Active Jobs"
                isLoading={isLoading}
                value={activeJobs}
                badgeText={`Total: ${totalJobs}`}
                icon={Briefcase}
                iconColor="text-green-400"
                glowColor="from-green-500/30 to-green-500/10"
            />

            <StatsCard
                title="Total Applications"
                isLoading={isLoading}
                value={totalApplications}
                badgeText={`Pending: ${pending}`}
                icon={FileText}
                iconColor="text-blue-400"
                glowColor="from-blue-500/30 to-blue-500/10"
            />

            <StatsCard
                title="Shortlisted"
                isLoading={isLoading}
                value={shortlisted}
                badgeText={`Total Apps: ${totalApplications}`}
                icon={CheckCircle}
                iconColor="text-yellow-400"
                glowColor="from-yellow-500/30 to-yellow-500/10"
            />
        </div>
    );
};

export default Dashboard;
