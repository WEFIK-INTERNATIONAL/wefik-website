"use client";

import React, {
    useLayoutEffect,
    useRef,
    createContext,
    useContext,
} from "react";
import Lenis from "lenis";

const LenisContext = createContext(null);

export function useLenis() {
    return useContext(LenisContext);
}

export default function LenisProvider({ children }) {
    const lenisRef = useRef(null);
    const rafRef = useRef(null);

    useLayoutEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });
        lenisRef.current = lenis;

        const onRaf = (time) => {
            lenis.raf(time);
            rafRef.current = requestAnimationFrame(onRaf);
        };
        rafRef.current = requestAnimationFrame(onRaf);

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            lenis.destroy();
            lenisRef.current = null;
            rafRef.current = null;
        };
    }, []);

    return (
        <LenisContext.Provider value={lenisRef.current}>
            {children}
        </LenisContext.Provider>
    );
}
