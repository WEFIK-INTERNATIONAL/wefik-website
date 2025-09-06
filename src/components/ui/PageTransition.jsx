"use client";
import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import LogoContainer from "./LogoContainer";
import { TransitionProvider } from "@/contexts/TransitionContext";

function PageTransition({ children }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [phase, setPhase] = useState("idle");
    const [nextUrl, setNextUrl] = useState(null);
    const [blockCount, setBlockCount] = useState(20);

    useEffect(() => {
        const updateBlockCount = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setBlockCount(6);
            } else if (width < 1024) {
                setBlockCount(12);
            } else {
                setBlockCount(20);
            }
        };

        updateBlockCount();
        window.addEventListener("resize", updateBlockCount);
        return () => window.removeEventListener("resize", updateBlockCount);
    }, []);

    useEffect(() => {
        const handleClick = (e) => {
            const href = e.currentTarget.getAttribute("href");
            if (href && href.startsWith("/") && href !== pathname) {
                e.preventDefault();
                setNextUrl(href);
                setIsTransitioning(true);
                setPhase("cover");
            }
        };

        const links = document.querySelectorAll('a[href^="/"]');
        links.forEach((link) => link.addEventListener("click", handleClick));
        return () =>
            links.forEach((link) =>
                link.removeEventListener("click", handleClick)
            );
    }, [pathname]);

    useEffect(() => {
        if (!isTransitioning) return;

        if (phase === "cover") {
            const t = setTimeout(() => setPhase("logo"), 800);
            return () => clearTimeout(t);
        }

        if (phase === "logo") {
            if (nextUrl) router.push(nextUrl);
            const t = setTimeout(() => setPhase("reveal"), 2500);
            return () => clearTimeout(t);
        }

        if (phase === "reveal") {
            const t = setTimeout(() => {
                setIsTransitioning(false);
                setPhase("idle");
            }, 1200);
            return () => clearTimeout(t);
        }
    }, [phase, isTransitioning, nextUrl, router]);

    const blockVariants = {
        cover: (i) => ({
            scaleX: 1,
            transformOrigin: "left",
            transition: { duration: 0.4, delay: i * 0.02 },
        }),
        reveal: (i) => ({
            scaleX: 0,
            transformOrigin: "right",
            transition: { duration: 0.4, delay: i * 0.02 },
        }),
        initial: { scaleX: 0 },
    };

    return (
        <>
            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        key="overlay"
                        className="fixed inset-0 z-50 flex bg-black"
                    >
                        {[...Array(blockCount)].map((_, i) => (
                            <motion.div
                                key={i}
                                custom={i}
                                initial="initial"
                                animate={
                                    phase === "cover"
                                        ? "cover"
                                        : phase === "reveal"
                                          ? "reveal"
                                          : "cover"
                                }
                                variants={blockVariants}
                                className="flex-1 h-full bg-neutral-900"
                            />
                        ))}

                        {phase === "logo" && (
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <div className="w-40 h-40">
                                    <LogoContainer animate={true} />
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
            <motion.div key={pathname}>
                <TransitionProvider
                    Value={{ transitionDone: !isTransitioning }}
                >
                    {children}
                </TransitionProvider>
            </motion.div>
        </>
    );
}

export default PageTransition;
