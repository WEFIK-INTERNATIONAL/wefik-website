"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundNoise from "./BackgroundNoise";

const WebsiteLoader = ({ onFinish }) => {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState("waiting");
    const [isVisible, setIsVisible] = useState(false);

    const onFinishRef = useRef(onFinish);
    const targetProgressRef = useRef(0);
    const exitStartedRef = useRef(false);

    useEffect(() => {
        onFinishRef.current = onFinish;
    }, [onFinish]);

    useEffect(() => {
        const hasVisited = sessionStorage.getItem("hasVisited");
        if (hasVisited) {
            setPhase("finished");
            if (onFinishRef.current) onFinishRef.current();
            return;
        }

        setIsVisible(true);
        setPhase("loading");
        sessionStorage.setItem("hasVisited", "true");

        const startTime = Date.now();
        const updateTargetProgress = (amount) => {
            targetProgressRef.current = Math.max(
                targetProgressRef.current,
                amount
            );
        };

        const progressInterval = setInterval(() => {
            setProgress((prev) => {
                const target = targetProgressRef.current;
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                const distance = target - prev;
                const increment =
                    distance > 0 ? Math.max(0.5, distance * 0.1) : 0;
                return Math.min(prev + increment, target);
            });
        }, 30);

        updateTargetProgress(15);

        const onDOMContentLoaded = () => updateTargetProgress(45);
        const onWindowLoad = () => {
            const elapsedTime = Date.now() - startTime;
            const minDuration = 3000;
            const remainingTime = Math.max(0, minDuration - elapsedTime);

            // Animate towards 99% during the wait time to feel smoother
            updateTargetProgress(99);

            setTimeout(() => updateTargetProgress(100), remainingTime);
        };

        if (document.readyState === "complete") {
            onDOMContentLoaded();
            onWindowLoad();
        } else {
            document.addEventListener("DOMContentLoaded", onDOMContentLoaded);
            window.addEventListener("load", onWindowLoad);
        }

        return () => {
            clearInterval(progressInterval);
            document.removeEventListener(
                "DOMContentLoaded",
                onDOMContentLoaded
            );
            window.removeEventListener("load", onWindowLoad);
        };
    }, []);

    useEffect(() => {
        // This effect now only depends on progress and runs the exit sequence once.
        if (progress >= 100 && !exitStartedRef.current) {
            exitStartedRef.current = true; // Prevents this from running multiple times
            const timer1 = setTimeout(() => setPhase("complete"), 500);
            const timer2 = setTimeout(() => setPhase("reveal"), 1100);
            const timer3 = setTimeout(() => {
                setIsVisible(false);
                if (onFinishRef.current) onFinishRef.current();
            }, 2000);
            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
            };
        }
    }, [progress]);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="loader"
                    className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
                >
                    {/* Top Panel */}
                    <BackgroundNoise />
                    <motion.div
                        className="absolute w-full bg-lime-400 origin-bottom"
                        style={{ bottom: "50%" }}
                        initial={{ scaleX: 0, height: "1px" }}
                        animate={{
                            scaleX: Math.min(progress / 100, 1),
                            height:
                                phase === "complete" || phase === "reveal"
                                    ? "50vh"
                                    : "1px",
                            y: phase === "reveal" ? "-50vh" : "0vh",
                        }}
                        transition={{
                            scaleX: { duration: 0.2, ease: "linear" },
                            height: { duration: 0.6, ease: [0.87, 0, 0.13, 1] },
                            y: { duration: 0.8, ease: [0.87, 0, 0.13, 1] },
                        }}
                    />
                    {/* Bottom Panel */}
                    <motion.div
                        className="absolute w-full bg-lime-400 origin-top"
                        style={{ top: "50%" }}
                        initial={{ scaleX: 0, height: "1px" }}
                        animate={{
                            scaleX: Math.min(progress / 100, 1),
                            height:
                                phase === "complete" || phase === "reveal"
                                    ? "50vh"
                                    : "1px",
                            y: phase === "reveal" ? "50vh" : "0vh",
                        }}
                        transition={{
                            scaleX: { duration: 0.2, ease: "linear" },
                            height: { duration: 0.6, ease: [0.87, 0, 0.13, 1] },
                            y: { duration: 0.8, ease: [0.87, 0, 0.13, 1] },
                        }}
                    />
                    <AnimatePresence>
                        {phase === "loading" && (
                            <motion.div
                                className="absolute bottom-4 right-4 z-10"
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.5 },
                                }}
                            >
                                <p className="text-lime-400 text-8xl font-mono tracking-tighter select-none">
                                    {String(Math.floor(progress)).padStart(
                                        2,
                                        "0"
                                    )}
                                    %
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {phase === "loading" && (
                            <motion.div
                                className="absolute top-4 left-4 text-xs text-lime-400/60 font-mono"
                                exit={{ opacity: 0, duration: 0.5 }}
                            >
                                <p>Progress: {progress.toFixed(1)}%</p>
                                <p>Phase: {phase}</p>
                                <p>Document State: {document.readyState}</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WebsiteLoader;
