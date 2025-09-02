"use client";
import React from "react";
import { motion } from "framer-motion";
import StartProjectButton from "@/components/ui/homePage/StartProjectBtn";
import Link from "next/link";
import LogoTicker from "./LogoTicker";
import SphereAnimation from "@/components/ui/homePage/SphereAnimation";

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.6,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function HeroSection() {
    return (
        <section className="relative pt-32 font-neue text-white w-full overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <div className="absolute top-0 left-1/2 w-[500px] h-[500px] -translate-x-1/2 bg-pink-500/20 rounded-full filter blur-3xl animate-blob"></div>
            <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-lime-400/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
            <SphereAnimation />
            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="flex justify-center"
                >
                    <div className="relative inline-flex gap-2 px-4 py-1 rounded-full bg-pink-600/20 text-pink-400 text-sm font-medium border-2 border-pink-600/10">
                        <span className="text-lime-500">●</span>
                        <span className="absolute text-lime-500 animate-ping">
                            ●
                        </span>
                        Available for work
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <h1 className="text-6xl md:text-7xl lg:text-8xl font-medium text-center mt-6">
                        Turning Your Ideas into <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-400 via-pink-500 to-purple-500">
                            Digital Reality
                        </span>
                    </h1>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <p className="text-center text-xl text-white/50 mt-8 max-w-2xl mx-auto">
                        From websites and apps to design, branding, and digital
                        campaigns, we turn your ideas into reality.
                    </p>
                </motion.div>

                <motion.div
                    className="flex justify-center items-center gap-6 mt-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="show"
                >
                    <motion.div variants={itemVariants}>
                        <StartProjectButton className="bg-lime-400 border-lime-800 text-black font-medium" />
                    </motion.div>
                    <motion.div variants={itemVariants}>
                        <Link
                            href="/work"
                            className="bg-white text-gray-950 h-12 w-full md:w-auto px-4 rounded-full inline-flex items-center justify-center gap-2 cursor-pointer border-2 border-transparent hover:bg-transparent hover:border-white hover:text-white transition duration-300 ease-in-out hover:scale-105 group"
                        >
                            View Works
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-arrow-up-right size-4 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform duration-300 ease-in-out"
                            >
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </Link>
                    </motion.div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="flex justify-center text-gray-400 text-sm animate-bounce mt-20 md:mt-28"
                >
                    ↓ Scroll to Explore
                </motion.div>

                <LogoTicker />
            </div>
        </section>
    );
}

export default HeroSection;
