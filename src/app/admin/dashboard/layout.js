"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { LogOut, Menu, X } from "lucide-react";
import wefikLogo from "@/assets/icons/wefikLogo.svg";

import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/ThemeToggle";
import DashboardLinks from "@/components/dashboard/DashboardLinks";

import API from "@/lib/axiosConfig";

const Layout = ({ children }) => {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleOnLogout = async () => {
        try {
            await API.post("/logout");
            toast.success("Logged out successfully");
            router.push("/");
        } catch (error) {
            toast.error("Logout failed, please try again");
            console.error("Logout Error:", error);
        }
    };

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <div className="grid h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] overflow-y-hidden">
                    <aside className="hidden border-r md:block">
                        <div className="flex flex-col max-h-screen h-full gap-2">
                            <div className="h-18 flex items-center border-b px-4">
                                <Link
                                    href="/"
                                    className="text-2xl font-extrabold flex justify-center items-center gap-4"
                                >
                                    <Image
                                        src={wefikLogo}
                                        width={500}
                                        height={500}
                                        alt="Wefik Logo"
                                        className="w-10 h-10"
                                    />
                                    WEFIK
                                </Link>
                            </div>
                            <DashboardLinks />
                        </div>
                    </aside>

                    <div
                        className={`fixed inset-0 z-40 bg-black/40 transition-opacity ${
                            sidebarOpen
                                ? "opacity-100"
                                : "opacity-0 pointer-events-none"
                        } md:hidden`}
                        onClick={() => setSidebarOpen(false)}
                    />
                    <aside
                        className={`fixed inset-y-0 left-0 z-50 w-screen bg-gray-100 dark:bg-slate-950 shadow-lg transform transition-transform md:hidden ${
                            sidebarOpen ? "translate-x-0" : "-translate-x-full"
                        }`}
                    >
                        <div className="flex items-center justify-between px-4 h-16 border-b">
                            <Link
                                href="/"
                                className="text-xl font-bold flex items-center gap-2"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <Image
                                    src={wefikLogo}
                                    width={32}
                                    height={32}
                                    alt="Wefik Logo"
                                    className="w-8 h-8"
                                />
                                WEFIK
                            </Link>
                            <button
                                className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
                                onClick={() => setSidebarOpen(false)}
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-4">
                            <DashboardLinks
                                onClick={() => setSidebarOpen(false)}
                            />
                        </div>
                    </aside>

                    <div className="flex flex-col w-screen md:w-full">
                        <header className="h-18 mb-2 px-4 flex items-center justify-between border-b">
                            <div className="flex items-center justify-center gap-4">
                                <Menu
                                    className="md:hidden"
                                    onClick={() => setSidebarOpen(true)}
                                />
                                <div className="flex items-center justify-center gap-3">
                                    <Image
                                        src="/icons/groundhog.png"
                                        alt="Wefik Logo"
                                        width={50}
                                        height={50}
                                        className="object-contain h-10 w-10"
                                    />
                                    <h1 className="text-xl md:text-2xl font-semibold">
                                        Admin
                                    </h1>
                                </div>
                            </div>
                            <div className="flex items-center justify-center gap-3">
                                <ThemeToggle />
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                        handleOnLogout();
                                    }}
                                    className="text-white bg-red-500/80 hover:text-white hover:bg-red-500/90 dark:text-red-500 hover:cursor-pointer"
                                >
                                    Logout
                                    <LogOut className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </header>
                        <div className="px-4 py-2 md:px-4 md:py-2">
                            {children}
                        </div>
                    </div>
                </div>
        </ThemeProvider>
    );
};

export default Layout;
