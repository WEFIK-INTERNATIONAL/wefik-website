"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Home,
	Briefcase,
	Users,
	Settings,
	LogOut,
	Menu,
	X,
} from "lucide-react";

const navItems = [
	{ name: "Dashboard", href: "/admin/dashboard", icon: Home },
	{ name: "Jobs Management", href: "/admin/dashboard/jobs", icon: Briefcase },
	{
		name: "Application Management",
		href: "/admin/dashboard/applications",
		icon: Users,
	},
	{ name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }) {
	const pathname = usePathname();
	const [sidebarOpen, setSidebarOpen] = useState(false);
	return (
		<div className="flex min-h-screen bg-gray-100">
			<aside
				className={`fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-lg transition-transform duration-300 flex flex-col justify-between lg:static lg:translate-x-0 ${
					sidebarOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div>
					<div className="border-b p-4 flex justify-between items-center">
						<h1 className="text-2xl font-bold text-gray-800">Wefik</h1>
						{/* Close button on mobile */}
						<button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
							<X className="h-6 w-6 text-gray-700" />
						</button>
					</div>
					<nav className="space-y-2 mt-6 px-2">
						{navItems.map((item) => {
							const isActive = pathname === item.href;
							const Icon = item.icon;

							return (
								<Link
									key={item.name}
									href={item.href}
									className={`flex items-center font-bold gap-3 px-4 py-2 rounded-lg transition-colors ${
										isActive
											? "bg-blue-100 text-blue-600 font-bold"
											: "text-gray-700 hover:bg-gray-100"
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
				<div className="py-8 px-5 flex items-center justify-between">
					<div className="flex items-center space-x-3">
						<Avatar>
							<AvatarImage src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<div>
							<p className="font-medium">John Doe</p>
							<p className="text-sm text-gray-500">Admin</p>
						</div>
					</div>
				</div>
			</aside>

			{/* Overlay for mobile */}
			{sidebarOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 lg:hidden"
					onClick={() => setSidebarOpen(false)}
				/>
			)}

			<main className="flex-1 p-1 max-h-screen overflow-y-hidden">
				<header className="h-16 flex justify-between items-center bg-white p-4 shadow mb-1 rounded-md">
					<div className="flex items-center gap-3">
						{/* Hamburger button for mobile */}
						<button className="lg:hidden" onClick={() => setSidebarOpen(true)}>
							<Menu className="h-6 w-6 text-gray-700" />
						</button>
						<h2 className="text-xl font-extrabold">Admin Dashboard</h2>
					</div>
					<Button
						variant="outline"
						className="text-white bg-red-500/80 hover:text-white hover:bg-red-500/90"
					>
						Logout
						<LogOut className="ml-2 h-4 w-4" />
					</Button>
				</header>
				<div className="bg-white p-4 rounded-md shadow h-[calc(100vh-100px+22px)]">
					{children}
				</div>
			</main>
		</div>
	);
}
