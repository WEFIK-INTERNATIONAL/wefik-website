"use client";

import React, { useRef } from "react";
import NavBar from "./navbar/NavBar";
import LenisProvider from "./LenisProvider";

export default function AppLayoutClient({ children }) {
    const contentRef = useRef(null);

    return (
        <>
            <LenisProvider>
                {/* <NavBar contentRef={contentRef} /> */}
                <div ref={contentRef} data-scroll-container>
                    {children}
                </div>
            </LenisProvider>
        </>
    );
}
