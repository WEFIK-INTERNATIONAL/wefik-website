"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
    Home,
    Briefcase,
    Users,
    Settings,
} from "lucide-react";

const DashboardLinks = () => {
    const pathname = usePathname();

    const navItems = [
        { id: 0, name: "Dashboard", href: "/admin/dashboard", icon: Home },
        { id: 1, name: "Jobs", href: "/admin/dashboard/jobs", icon: Briefcase },
        {
            id: 2,
            name: "Application",
            href: "/admin/dashboard/applications",
            icon: Users,
        },
        { id: 3, name: "Settings", href: "/admin/settings", icon: Settings },
    ];

    return (
        <div>
            <nav className="space-y-2 mt-6 px-2">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-3 px-4 py-2 rounded-sm transition-colors ${
                                isActive
                                    ? "bg-blue-200 text-blue-600 font-bold"
                                    : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            }`}
                        >
                            <Icon
                                className={`h-5 w-5 ${isActive ? "text-blue-600" : ""}`}
                            />
                            {item.name}
                        </Link>
                    );
                })}
            </nav>
        </div>
    );
};

export default DashboardLinks;
