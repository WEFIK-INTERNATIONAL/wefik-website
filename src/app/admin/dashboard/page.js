"use client";
import React from "react";
import { Briefcase, FileText, CheckCircle } from "lucide-react";
import StatsCard from "@/components/dashboard/StatsCard";
import { useGetStats } from "@/queries/stats";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
    const { data: stats, isLoading } = useGetStats();

    // ✅ Extract data
    const totalJobs = stats?.totalJobs || 0;
    const activeJobs = stats?.totalOpenJobs || 0;
    const closedJobs = stats?.totalClosedJobs || 0;
    const totalApplications = stats?.totalApplications || 0;

    const pending =
        stats?.applicationsByStatus?.find((s) => s.status === "pending")
            ?.count || 0;
    const shortlisted =
        stats?.applicationsByStatus?.find((s) => s.status === "shortlisted")
            ?.count || 0;
    const rejected =
        stats?.applicationsByStatus?.find((s) => s.status === "rejected")
            ?.count || 0;
    const accepted =
        stats?.applicationsByStatus?.find((s) => s.status === "accepted")
            ?.count || 0;

    // ✅ Chart data
    const jobData = [
        { name: "Active", value: activeJobs },
        { name: "Closed", value: closedJobs },
    ];

    const applicationData = [
        { name: "Pending", value: pending },
        { name: "Shortlisted", value: shortlisted },
        { name: "Rejected", value: rejected },
        { name: "Accepted", value: accepted },
    ];

    const COLORS = ["#34d399", "#f87171", "#60a5fa", "#fbbf24"];

    return (
        <div className="p-6 space-y-8 overflow-y-scroll">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-6">
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

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Pie chart for Applications */}
                <div className="bg-white/10 dark:bg-gray-900/40 rounded-xl p-4 shadow-lg backdrop-blur-md border border-white/20">
                    <h2 className="text-lg font-semibold mb-4">
                        Applications by Status
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={applicationData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                label
                            >
                                {applicationData.map((_, index) => (
                                    <Cell
                                        key={index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Bar chart for Jobs */}
                <div className="bg-white/10 dark:bg-gray-900/40 rounded-xl p-4 shadow-lg backdrop-blur-md border border-white/20">
                    <h2 className="text-lg font-semibold mb-4">
                        Jobs Overview
                    </h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={jobData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar
                                dataKey="value"
                                fill="#6366f1"
                                radius={[8, 8, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
