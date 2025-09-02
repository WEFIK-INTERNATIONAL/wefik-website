"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export const NavLogo = ({ isMenuOpen }) => {
    const pathname = usePathname();
    const [drawKey, setDrawKey] = useState(0);

    useEffect(() => {
        setDrawKey((k) => k + 1);
    }, [pathname]);

    const pathVariants = (fillColor) => ({
        hidden: { pathLength: 0, fill: "rgba(0,0,0,0)" },
        visible: {
            pathLength: 1,
            fill: fillColor,
            transition: {
                pathLength: { duration: 1.2, ease: "easeOut" },
                fill: { delay: 1.2, duration: 0.6 },
            },
        },
    });

    const textVariants = {
        hidden: { opacity: 0, x: -20 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
        exit: {
            opacity: 0,
            x: -20,
            transition: { duration: 0.4, ease: "easeIn" },
        },
    };

    return (
        <div className="menu-logo flex h-auto w-fit cursor-pointer items-center justify-center pointer-events-auto">
            <Link href="/" className="flex items-center gap-3 text-white">
                <motion.svg
                    key={drawKey}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 155.41 89.43"
                    className="h-12 w-12"
                    initial="hidden"
                    animate="visible"
                    whileHover={{ scale: 1.1 }}
                >
                    <defs>
                        <filter
                            id="glow"
                            x="-50%"
                            y="-50%"
                            width="200%"
                            height="200%"
                        >
                            <feFlood floodColor="limegreen" result="flood" />
                            <feComposite
                                in="flood"
                                in2="SourceAlpha"
                                operator="in"
                                result="mask"
                            />
                            <feGaussianBlur
                                in="mask"
                                stdDeviation="4"
                                result="blurred"
                            />
                            <feMerge>
                                <feMergeNode in="blurred" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    <motion.path
                        d="M116.72,89.43l-1.61-0.92L75.3,65.68L37.2,86.14c-1.91,1.02-4.28,0.16-5.08-1.85L9.34,27.6L0.28,5.05
C-1.11,1.59,3-1.46,5.91,0.86L60.8,44.65L82.4,61.87l32.83,26.37L116.72,89.43z"
                        stroke="#A3E635"
                        strokeWidth="2"
                        variants={pathVariants("#A3E635")}
                        style={{ filter: "url(#glow)" }}
                    />
                    <motion.path
                        d="M149.72,0.47c3.21-1.73,6.81,1.56,5.37,4.92l-13.3,31l-19.48,47.96c-0.99,2.44-4.08,3.19-6.08,1.48
L91.49,64.67l-23.72-20.2L149.72,0.47z"
                        stroke="#51731A"
                        strokeWidth="2"
                        variants={pathVariants("#51731A")}
                        style={{ filter: "url(#glow)" }}
                    />
                </motion.svg>

                <AnimatePresence mode="wait">
                    {isMenuOpen && (
                        <motion.p
                            key="logo-text"
                            className="font-neue font-medium text-2xl text-white"
                            variants={textVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            Wefik
                        </motion.p>
                    )}
                </AnimatePresence>
            </Link>
        </div>
    );
};
