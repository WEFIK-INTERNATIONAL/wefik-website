"use client";
import React, { useRef } from "react";
import { usePathname } from "next/navigation";
import NavBar from "./navbar/NavBar";
import LenisProvider from "./LenisProvider";
import BackgroundNoise from "@/components/common/BackgroundNoise";

export default function AppLayoutClient({ children }) {
    const contentRef = useRef(null);
    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin");

    if (isAdmin) {
        return <div className="min-h-screen">{children}</div>;
    }
    return (
        <div className="min-h-screen bg-black text-white relative">
            <BackgroundNoise />
            <LenisProvider>
                <NavBar contentRef={contentRef} />
                <div ref={contentRef} data-scroll-container>
                    {children}
                </div>
            </LenisProvider>
        </div>
    );
}
