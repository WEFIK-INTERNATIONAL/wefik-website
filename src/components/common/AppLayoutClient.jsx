"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import LenisProvider from "@/components/common/LenisProvider";
import BackgroundNoise from "@/components/common/BackgroundNoise";
import Footer from "./Footer";
import Navbar from "./navbar/Navbar";

export default function AppLayoutClient({ children }) {
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin");

    if (isAdmin) {
        return <div className="min-h-screen">{children}</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white relative">
            <BackgroundNoise />
            <LenisProvider>
                <Navbar />
                <div>{children}</div>
                <Footer />
            </LenisProvider>
        </div>
    );
}
