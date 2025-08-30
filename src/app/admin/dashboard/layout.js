"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { DashboardProvider } from "@/contexts/DashboardContext";
import DashboardLinks from "@/components/dashboard/DashboardLinks";

import { LogOut } from "lucide-react";

import { ThemeProvider } from "next-themes";
import ThemeToggle from "@/components/ThemeToggle";

const Layout = ({ children }) => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <DashboardProvider>
                <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                    <aside className="hidden md:block border-r">
                        <div className="flex flex-col max-h-screen h-full gap-2">
                            <div className="h-18 flex items-center border-b px-4">
                                <h1 className="text-2xl font-extrabold">WEFIK</h1>
                            </div>
                            <DashboardLinks />
                        </div>
                    </aside>

                    <div className="flex flex-col">
                        <header className="h-18 mb-2 px-4 flex items-center justify-between border-b">
                            <div className="flex items-center justify-center gap-3">
                                <Image
                                    src="/icons/groundhog.png"
                                    alt="Wefik Logo"
                                    width={50}
                                    height={50}
                                    className="object-contain h-10 w-10"
                                />
                                <h1 className="text-2xl font-semibold">
                                    Admin
                                </h1>
                            </div>
                            <div className="flex items-center justify-center gap-3">
                                <ThemeToggle />
                                <Button
                                    variant="outline"
                                    className="text-white bg-red-500/80 hover:text-white hover:bg-red-500/90 dark:text-red-500 hover:cursor-pointer"
                                >
                                    Logout
                                    <LogOut className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </header>
                        <div className="px-6 py-4">{children}</div>
                    </div>
                </div>
            </DashboardProvider>
        </ThemeProvider>
    );
};

export default Layout;
