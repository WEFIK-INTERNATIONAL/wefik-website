"use client";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";

const Particle = ({ size, initialX, initialY, duration }) => {
    return (
        <motion.div
            className="absolute rounded-full bg-white"
            style={{
                width: size,
                height: size,
                left: initialX,
                top: initialY,
            }}
            initial={{ opacity: 0 }}
            animate={{
                opacity: [0, 0.7, 0],
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
            }}
        />
    );
};

export default function NotFound() {
    const Link = (props) => <a {...props}>{props.children}</a>;

    const numParticles = 50;
    const particles = React.useMemo(
        () =>
            Array.from({ length: numParticles }).map((_, i) => ({
                id: i,
                size: Math.random() * 3 + 1,
                initialX: `${Math.random() * 100}%`,
                initialY: `${Math.random() * 100}%`,
                duration: Math.random() * 5 + 5,
            })),
        []
    );
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const handleMouseMove = (event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        x.set(event.clientX - rect.left - rect.width / 2);
        y.set(event.clientY - rect.top - rect.height / 2);
    };

    const rotateX = useTransform(y, [-200, 200], [10, -10]);
    const rotateY = useTransform(x, [-200, 200], [-10, 10]);

    return (
        <motion.main
            onMouseMove={handleMouseMove}
            className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center overflow-hidden bg-black"
            style={{ perspective: "1000px" }}
        >
            <div className="absolute inset-0 z-1 bg-gradient-to-t from-black via-transparent to-transparent" />
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0a0112] via-black to-[#0a0112]" />
            <div
                className="absolute top-0 left-0 w-full h-full z-0 opacity-40"
                style={{
                    backgroundImage:
                        "radial-gradient(circle at 20% 20%, #5a0d7a 0%, transparent 40%), radial-gradient(circle at 80% 70%, #1e8f8e 0%, transparent 40%)",
                }}
            />
            {particles.map((p) => (
                <Particle key={p.id} {...p} />
            ))}
            <motion.div
                className="absolute -z-10 w-[500px] h-[500px] rounded-full border border-pink-500/30"
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute -z-10 w-[700px] h-[700px] rounded-full border border-lime-400/20"
                animate={{ scale: [1, 1.03, 1], opacity: [0.1, 0.4, 0.1] }}
                transition={{
                    duration: 6,
                    delay: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute -z-10 w-[900px] h-[900px] rounded-full border border-purple-500/10"
                animate={{ scale: [1, 1.02, 1], opacity: [0.3, 0.1, 0.3] }}
                transition={{
                    duration: 7,
                    delay: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className="relative z-10"
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            >
                <motion.h1
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="text-7xl md:text-9xl font-extrabold tracking-tight bg-gradient-to-r from-lime-400 via-yellow-400 to-pink-500 bg-clip-text text-transparent drop-shadow-lg"
                >
                    404
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
                    className="mt-4 text-lg md:text-xl text-gray-300 max-w-md mx-auto"
                >
                    Oops! The page you're looking for has ventured into the
                    unknown.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
                    className="mt-10 flex flex-wrap gap-4 justify-center"
                >
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href="/"
                            className="block px-8 py-3 rounded-full bg-lime-400 text-black font-bold hover:bg-lime-300 transition-all shadow-lg shadow-lime-500/30 transform duration-300 ease-in-out"
                        >
                            Go Home
                        </Link>
                    </motion.div>
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href="/contact"
                            className="block px-8 py-3 rounded-full border-2 border-white/50 text-white font-semibold hover:bg-white/10 hover:border-white transition-all transform duration-300 ease-in-out"
                        >
                            Contact Us
                        </Link>
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.main>
    );
}
