"use client";
import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import CardBackGround from "../CardBackGround";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { twMerge } from "tailwind-merge";

function ExpertiseCard({ item, className, style }) {
    const border = useRef(null);
    const offsetX = useMotionValue(-100);
    const offsetY = useMotionValue(-100);
    const maskImage = useMotionTemplate`radial-gradient(100px 100px at ${offsetX}px ${offsetY}px, black, transparent)`;

    const updateMousePosition = (e) => {
        if (!border.current) return;
        const borderRect = border.current?.getBoundingClientRect();
        offsetX.set(e.x - borderRect?.x);
        offsetY.set(e.y - borderRect?.y);
    };

    useEffect(() => {
        window.addEventListener("mousemove", updateMousePosition);
        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    });

    return (
        <CardBackGround
            className={twMerge("relative h-full p-6 rounded-lg", className)}
            style={style}
        >
            <div className="flex flex-col h-full">
                <motion.div
                    className="absolute pointer-events-none inset-0 border-2 border-lime-300 rounded-lg"
                    style={{
                        WebkitMaskImage: maskImage,
                        maskImage: maskImage,
                    }}
                    ref={border}
                ></motion.div>

                {/* Content that can grow */}
                <div className="flex-grow">
                    <div className="inline-flex items-center gap-2">
                        <Image
                            src={item.iconImage}
                            alt={item.title}
                            className="size-10"
                        />
                    </div>
                    <h3 className="text-3xl font-medium mt-2">{item.title}</h3>
                    <p className="text-sm lg:text-base text-white/60 mt-2">
                        {item.description}
                    </p>
                    <ul className="mt-4 flex flex-col gap-3">
                        {item.result.map((res) => (
                            <li
                                key={res}
                                className="flex gap-2 items-center text-sm md:text-base text-white"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-5 md:size-6 text-white/50"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                                <span>{res}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="mt-8">
                    <Link
                        href={item.linkTo}
                        className="bg-white text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 cursor-pointer hover:bg-transparent hover:border-2 hover:text-white transition"
                    >
                        <button className="cursor-pointer flex gap-2 items-center">
                            <span>View {item.btnName}</span>
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
                                className="feather feather-arrow-up-right size-4"
                            >
                                <line x1="7" y1="17" x2="17" y2="7"></line>
                                <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
        </CardBackGround>
    );
}

export default ExpertiseCard;
