"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimate } from "framer-motion";
import Link from "next/link";

export default function CallToActionCom() {
    const [isHovered, setIsHovered] = useState(false);
    const animation = useRef(null);
    const [scope, animate] = useAnimate();

    useEffect(() => {
        animation.current = animate(
            scope.current,
            { x: "-50%" },
            { duration: 30, ease: "linear", repeat: Infinity }
        );
    }, []);

    useEffect(() => {
        if (animation.current) {
            if (isHovered) animation.current.speed = 0.5;
            else animation.current.speed = 1;
        }
    }, [isHovered]);
    return (
        <section className="-translate-y-5">
            <Link href="/contact" className="overflow-x-clip p-4 flex">
                <motion.div
                    ref={scope}
                    className="flex flex-none pr-16 gap-16 text-8xl md:text-[14rem] font-medium group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="flex gap-16 items-center">
                            <span className="text-lime-400 text-7xl">
                                &#10038;
                            </span>
                            <span className="transition-all duration-300 text-white group-hover:text-lime-400">
                                Get in Contact
                            </span>
                        </div>
                    ))}
                </motion.div>
            </Link>
        </section>
    );
}
