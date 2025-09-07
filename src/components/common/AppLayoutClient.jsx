"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import LenisProvider from "@/components/common/LenisProvider";
import BackgroundNoise from "@/components/common/BackgroundNoise";
import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/navbar/NavBar";

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
                <main>{children}</main>
                <Footer />
            </LenisProvider>
        </div>
    );
}
