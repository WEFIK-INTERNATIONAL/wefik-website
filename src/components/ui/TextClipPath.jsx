"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTransition } from "@/contexts/TransitionContext";

function TextClipPathAnimation({
    text = "Animated Text",
    className = "",
    delay = 0,
    duration = 1.2,
    triggerOnMount = true,
}) {
    const [isVisible, setIsVisible] = useState(!triggerOnMount);
    const { transitionDone } = useTransition();

    useEffect(() => {
        if (triggerOnMount) {
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, delay * 1000);
            return () => clearTimeout(timer);
        }
    }, [triggerOnMount, delay]);

    const shouldAnimate = isVisible && transitionDone;

    return (
        <div className="overflow-hidden">
            <motion.h3
                className={`${className}`}
                initial={{
                    clipPath: "inset(100% 0% 0% 0%)",
                    y: 50,
                }}
                animate={
                    shouldAnimate
                        ? {
                              clipPath: "inset(0% 0% 0% 0%)",
                              y: 0,
                          }
                        : {
                              clipPath: "inset(100% 0% 0% 0%)",
                              y: 50,
                          }
                }
                transition={{
                    duration,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: triggerOnMount ? 0 : delay,
                }}
            >
                {text}
            </motion.h3>
        </div>
    );
}

export default TextClipPathAnimation;
