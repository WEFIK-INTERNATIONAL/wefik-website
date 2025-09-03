"use client";

import { motion, useAnimation } from "framer-motion";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import { useState } from "react";

export default function RoundedButton({
    children,
    className,
    backgroundColor,
    href = "#",
    ...attributes
}) {
    const controls = useAnimation();
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = async () => {
        setIsHovered(true);
        await controls.start("enter");
        await controls.start("exit");
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        controls.start("reset");
    };

    const circleVariants = {
        reset: { top: "100%", width: "100%" },
        enter: {
            top: "-25%",
            width: "150%",
            transition: { duration: 0.4, ease: "easeInOut" },
        },
        exit: {
            top: "-150%",
            width: "125%",
            transition: { duration: 0.25, ease: "easeInOut" },
        },
    };

    return (
        <div
            className={twMerge(
                "relative flex w-fit cursor-pointer items-center justify-center overflow-hidden",
                className
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            {...attributes}
        >
            <Link
                href={href}
                className="relative z-10 transition-colors duration-300 ease-linear hover:text-white"
            >
                {children}
            </Link>

            <motion.div
                className="absolute h-[150%] w-full rounded-full"
                style={{ backgroundColor }}
                variants={circleVariants}
                initial="reset"
                animate={controls}
            />
        </div>
    );
}
