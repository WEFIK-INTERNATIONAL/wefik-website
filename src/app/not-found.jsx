"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

// Grid background pattern
const GridPattern = () => (
    <div className="absolute inset-0 opacity-20">
        <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
        >
            <defs>
                <pattern
                    id="grid"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M 10 0 L 0 0 0 10"
                        fill="none"
                        stroke="rgba(163, 230, 53, 0.3)"
                        strokeWidth="0.2"
                    />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
    </div>
);

const FloatingWireframe = ({ delay = 0, scale = 1, x = 0, y = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 0.15, y: 0, x, scale }}
        transition={{ delay, duration: 2, ease: "easeOut" }}
        className="absolute"
    >
        <motion.svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
            <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="rgba(163, 230, 53, 0.8)"
                strokeWidth="1"
                strokeDasharray="5,5"
            />
            <circle
                cx="100"
                cy="100"
                r="50"
                fill="none"
                stroke="rgba(163, 230, 53, 0.6)"
                strokeWidth="1"
            />
            <circle
                cx="100"
                cy="100"
                r="20"
                fill="none"
                stroke="rgba(163, 230, 53, 0.4)"
                strokeWidth="1"
            />
        </motion.svg>
    </motion.div>
);

// Glitch text effect
const GlitchText = ({ text, className }) => (
    <div className={`relative ${className}`}>
        <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
        >
            {text}
        </motion.span>

        <motion.span
            className="absolute top-0 left-0 text-lime-400 opacity-70"
            animate={{ x: [-2, 0, 2, 0], y: [-1, 1, -1, 0] }}
            transition={{
                duration: 0.3,
                repeat: Infinity,
                repeatType: "mirror",
            }}
        >
            {text}
        </motion.span>

        <motion.span
            className="absolute top-0 left-0 text-teal-400 opacity-50"
            animate={{ x: [1, -1, 1, 0], y: [1, -1, 1, 0] }}
            transition={{
                duration: 0.4,
                repeat: Infinity,
                repeatType: "mirror",
            }}
        >
            {text}
        </motion.span>
    </div>
);

export default function NotFound() {
    return (
        <main className="py-24 relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-transparent">
            <GridPattern />
            <FloatingWireframe delay={0} scale={0.8} x={-300} y={-200} />
            <FloatingWireframe delay={1} scale={1.2} x={400} y={100} />
            <FloatingWireframe delay={2} scale={0.6} x={0} y={-300} />
            <motion.div
                className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl"
                animate={{ scale: [1.2, 1, 1.2] }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-lime-400/50 to-transparent"
                    animate={{ opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div
                    className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-lime-400/50 to-transparent"
                    animate={{ opacity: [0.6, 0.2, 0.6] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-lime-400/30 to-transparent"
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 5, repeat: Infinity }}
                />
                <motion.div
                    className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-lime-400/30 to-transparent"
                    animate={{ opacity: [0.4, 0.1, 0.4] }}
                    transition={{ duration: 6, repeat: Infinity }}
                />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto">
                <div className="mb-8 flex justify-center">
                    <GlitchText
                        text="404"
                        className="text-8xl md:text-9xl font-black tracking-wider bg-gradient-to-r from-lime-400 via-green-400 to-teal-400 bg-clip-text text-transparent"
                    />
                </div>
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full border border-lime-400/30 bg-lime-400/5"
                >
                    <motion.div
                        className="w-2 h-2 bg-red-400 rounded-full"
                        animate={{ opacity: [1, 0.2, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                    />
                    <span className="text-sm text-gray-300 font-medium">
                        Page Not Found
                    </span>
                </motion.div>
                <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.6 }}
                    className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight"
                >
                    Lost in the{" "}
                    <span className="bg-gradient-to-r from-lime-400 to-teal-400 bg-clip-text text-transparent">
                        Digital Reality
                    </span>
                </motion.h1>
                <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
                >
                    The page you're looking for seems to have been disconnected
                    from our digital matrix. Let's get you back to reality.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                    <Link
                        href="/"
                        className="group py-4 bg-lime-400 text-black rounded-full font-semibold hover:bg-lime-300 transition-all duration-300 shadow-lg hover:shadow-lime-400/25 hover:scale-105 min-w-[160px]"
                    >
                        Return Home
                    </Link>
                    <Link
                        href="/contact"
                        className="group py-4 border border-white/30 text-white rounded-full font-medium hover:border-lime-400/50 hover:bg-lime-400/10 transition-all duration-300 hover:scale-105 min-w-[160px]"
                    >
                        <span className="flex items-center justify-center gap-2">
                            Need Help?
                            <motion.div
                                className="w-2 h-2 bg-lime-400 rounded-full"
                                animate={{ opacity: [1, 0.3, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            />
                        </span>
                    </Link>
                </motion.div>
            </div>
        </main>
    );
}
