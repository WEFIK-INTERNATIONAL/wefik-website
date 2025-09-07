"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import LenisProvider from "@/components/common/LenisProvider";
import BackgroundNoise from "@/components/common/BackgroundNoise";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/navbar/NavBar";
import dynamic from "next/dynamic";
import PageTransition from "../ui/PageTransition";
import WebsiteLoader from "./WebsiteLoader";

const AIBot = dynamic(() => import("../chat/AIBot"), { ssr: false });

export default function AppLayoutClient({ children }) {
    const pathname = usePathname();
    const isAdmin = pathname === "/admin" || pathname.startsWith("/admin/");
    const [isLoading, setIsLoading] = useState(true);

    if (isAdmin) {
        return <div className="min-h-screen">{children}</div>;
    }

    if (isLoading) {
        return <WebsiteLoader onFinish={() => setIsLoading(false)} />;
    }

    return (
        <div className="min-h-screen relative bg-black text-white">
            <BackgroundNoise />
            <PageTransition>
                <LenisProvider>
                    <Navbar />
                    <main>{children}</main>
                    <Footer />
                </LenisProvider>
                <AIBot />
            </PageTransition>
        </div>
    );
}
