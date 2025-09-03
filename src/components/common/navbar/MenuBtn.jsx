"use client";

import { motion, useAnimation } from "framer-motion";

export default function MenuBtn({ isMenuOpen, onToggle }) {
    const circleControls = useAnimation();

    const handleToggle = () => {
        onToggle?.();

        circleControls
            .start({
                x: -8,
                scaleX: 2,
                borderRadius: "6px",
                transition: { duration: 0.18, ease: "easeOut" },
            })
            .then(() =>
                circleControls.start({
                    x: 0,
                    scaleX: 1,
                    borderRadius: "9999px",
                    transition: { duration: 0.18, ease: "easeIn" },
                })
            );
    };

    const menuVariants = {
        closed: { y: 0, transition: { duration: 0.35, ease: "easeInOut" } },
        open: { y: -20, transition: { duration: 0.35, ease: "easeInOut" } },
    };

    const closeVariants = {
        closed: { y: 20, transition: { duration: 0.35, ease: "easeInOut" } },
        open: { y: 0, transition: { duration: 0.35, ease: "easeInOut" } },
    };

    return (
        <button
            type="button"
            aria-pressed={isMenuOpen}
            onClick={handleToggle}
            className="flex items-center gap-2 focus:outline-none cursor-pointer"
        >
            <motion.div
                className="h-2.5 w-2.5 rounded-full bg-[#A3E635] shadow-[0_0_8px_#A3E635]"
                style={{ transformOrigin: "left center" }}
                initial={{ x: 0, scaleX: 1, borderRadius: "9999px" }}
                animate={circleControls}
            />

            <div className="relative h-[20px] w-[60px] overflow-hidden">
                <motion.span
                    className="absolute flex h-full w-full items-center justify-start text-white text-base font-medium tracking-wide hover:text-[#A3E635] transition-colors duration-300"
                    variants={menuVariants}
                    initial="closed"
                    animate={isMenuOpen ? "open" : "closed"}
                >
                    MENU
                </motion.span>
                <motion.span
                    className="absolute flex h-full w-full items-center justify-start text-white text-base font-medium tracking-wide hover:text-[#A3E635] transition-colors duration-300"
                    variants={closeVariants}
                    initial="closed"
                    animate={isMenuOpen ? "open" : "closed"}
                >
                    CLOSE
                </motion.span>
            </div>
        </button>
    );
}
