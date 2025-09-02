"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";

export default function LenisProvider({ children }) {
    const lenisRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        // Init Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });
        lenisRef.current = lenis;

        // Start RAF loop
        const onRaf = (time) => {
            lenis.raf(time);
            rafRef.current = requestAnimationFrame(onRaf);
        };
        rafRef.current = requestAnimationFrame(onRaf);

        // Cleanup
        return () => {
            cancelAnimationFrame(rafRef.current);
            lenis.destroy();
            lenisRef.current = null;
            rafRef.current = null;
        };
    }, []);

    return <>{children}</>;
}
