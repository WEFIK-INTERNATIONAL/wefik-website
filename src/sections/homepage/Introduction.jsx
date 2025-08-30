"use client";
import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { twMerge } from "tailwind-merge";
import Tag from "@/components/ui/Tag";

const text = `At WEFIK, we help ambitious businesses scale with bold, minimal, and modern digital solutions — from strategy and UX to high-performing websites, apps, and campaigns . Your ideas deserve more than presence; they deserve to lead and grow.`;

const words = text.split(" ");

function Introduction() {
    const scrollTarget = useRef(null);
    const { scrollYProgress } = useScroll({
        target: scrollTarget,
        offset: ["start end", "end end"],
    });

    const [currentWord, setCurrentWord] = useState(0);
    const wordIndex = useTransform(scrollYProgress, [0, 1], [0, words.length]);

    useEffect(() => {
        wordIndex.on("change", (latest) => {
            setCurrentWord(latest);
        });
    }, [wordIndex]);
    return (
        <section className="text-white relative">
            <div className="absolute inset-0 bg-gradient-to-bl from-gray-900 via-black to-transparent"></div>
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-pink-500/10 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-lime-400/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                    backgroundSize: "50px 50px",
                }}
            ></div>
            <div className="container pt-24">
                <div className="sticky top-20 md:top-28 lg:top-40">
                    <div className="flex justify-center">
                        <Tag>Introducing Wefik</Tag>
                    </div>
                    <div className="text-4xl md:text-6xl lg:text-7xl text-center font-medium mt-10">
                        <span>Your digital presence deserves better.</span>{" "}
                        <span>
                            {words.map((word, wordIndex) => (
                                <span
                                    key={wordIndex}
                                    className={twMerge(
                                        "transition duration-500 text-white/15",
                                        wordIndex < currentWord && "text-white"
                                    )}
                                >{`${word} `}</span>
                            ))}
                        </span>
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-lime-400 to-pink-500 block">
                            That&apos;s why we built WEFIK.
                        </span>
                    </div>
                </div>
                <div className="h-[150vh]" ref={scrollTarget}></div>
            </div>
        </section>
    );
}

export default Introduction;
