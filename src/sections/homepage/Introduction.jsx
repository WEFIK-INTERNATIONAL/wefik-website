"use client";
import React, { useEffect, useRef, useState } from "react";
import { useScroll, useTransform } from "framer-motion";
import { twMerge } from "tailwind-merge";
import Tag from "@/components/ui/Tag";

const text = `Our digital agency creates impact for brands. In the disciplines Websites, social media, content marketing, campaigning and branding. Between timeless and zeitgeist. When we communicate: Effectively. Quick witted. Ambitious`;

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
        <section className="text-white relative bg-black w-full overflow-x-clip">
            <div className="absolute inset-0 bg-gradient-to-bl from-gray-900 via-black to-transparent overflow-x-hidden"></div>
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-pink-500/10 rounded-full filter blur-3xl animate-pulse overflow-x-hidden"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-lime-400/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000 overflow-x-hidden"></div>
            <div className="container pt-24">
                <div className="sticky top-28 md:top-28 lg:top-40">
                    <div className="flex justify-center">
                        <Tag>This is Wefik</Tag>
                    </div>
                    <div className="text-center text-3xl lg:text-6xl mt-10 max-w-7xl mx-auto">
                        <span>Culture-driven, creative and competitive.</span>{" "}
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
                            This is Wefik for you.
                        </span>
                    </div>
                </div>
                <div className="h-[150vh]" ref={scrollTarget}></div>
            </div>
        </section>
    );
}

export default Introduction;
