"use client";
import React, { createContext, useContext, useRef, useEffect } from "react";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext(null);

export const useLenis = () => useContext(LenisContext);

export default function LenisProvider({ children }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        lenis.on("scroll", ScrollTrigger.update);
        ScrollTrigger.addEventListener("refresh", () => {
            requestAnimationFrame((t) => lenis.raf(t));
        });
        ScrollTrigger.refresh();

        return () => {
            lenis.destroy();
            ScrollTrigger.removeEventListener("refresh", () => {
                requestAnimationFrame((t) => lenis.raf(t));
            });
        };
    }, []);

    const contextValue = {
        stop: () => lenisRef.current?.stop(),
        start: () => lenisRef.current?.start(),
    };

    return (
        <LenisContext.Provider value={contextValue}>
            {children}
        </LenisContext.Provider>
    );
}
