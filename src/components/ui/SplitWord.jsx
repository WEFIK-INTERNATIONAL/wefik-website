"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SplitWord({ paraOne, paraTwo, keywords }) {
    const aboutRef = useRef(null);
    const stRef = useRef(null);
    const wordHighLightBgColor = "60, 60, 60";

    useEffect(() => {
        if (!aboutRef.current) return;
        const paragraphs = Array.from(aboutRef.current.querySelectorAll("p"));
        paragraphs.forEach((paragraph) => {
            const text = paragraph.textContent || "";
            const words = text.split(/\s+/);
            paragraph.innerHTML = "";
            words.forEach((rawWord, i) => {
                if (!rawWord.trim()) return;
                const normalized = rawWord
                    .toLowerCase()
                    .replace(/[.,!?;:*]/g, "");
                const wordContainer = document.createElement("div");
                wordContainer.className =
                    "inline-block relative mr-1 mb-1 px-1 rounded-full";

                if (keywords.includes(normalized)) {
                    const bg = document.createElement("span");
                    bg.textContent =
                        rawWord + (i < words.length - 1 ? " " : "");
                    bg.className =
                        "absolute top-0 left-0 w-full h-full rounded-full";
                    if (
                        ["presence", "campaigns", "interactive"].includes(
                            normalized
                        )
                    ) {
                        bg.classList.add("bg-green-600");
                    } else if (
                        ["growth", "solutions", "expression"].includes(
                            normalized
                        )
                    ) {
                        bg.classList.add("bg-orange-400");
                    } else {
                        bg.classList.add("bg-indigo-400");
                    }
                    wordContainer.appendChild(bg);
                }

                const wordText = document.createElement("span");
                wordText.textContent =
                    rawWord + (i < words.length - 1 ? " " : "");
                wordText.className = "relative inline-block opacity-0";
                wordContainer.appendChild(wordText);

                paragraph.appendChild(wordContainer);
            });
        });

        const wordElems = aboutRef.current.querySelectorAll("div.inline-block");
        const spanElems = aboutRef.current.querySelectorAll(
            "div.inline-block > span"
        );
        gsap.set(wordElems, { opacity: 0 });
        gsap.set(spanElems, { opacity: 0 });
        ScrollTrigger.refresh();

        stRef.current = ScrollTrigger.create({
            trigger: aboutRef.current,
            pin: aboutRef.current,
            pinReparent: true,
            start: "top top",
            end: `+=${window.innerHeight * 4}`,
            pinSpacing: true,
            onUpdate: (self) => {
                const progress = self.progress;
                const words = Array.from(
                    aboutRef.current?.querySelectorAll("div.inline-block")
                );
                const totalWords = words.length || 1;

                words.forEach((word, index) => {
                    const wordText = word.querySelector("span");
                    if (!wordText) return;

                    if (progress <= 0.7) {
                        const revealProgress = Math.min(1, progress / 0.7);
                        const overlapWords = 15;
                        const totalAnimationLength =
                            1 + overlapWords / totalWords;

                        const wordStart = index / totalWords;
                        const wordEnd = wordStart + overlapWords / totalWords;

                        const timelineScale =
                            1 /
                            Math.min(
                                totalAnimationLength,
                                1 +
                                    (totalWords - 1) / totalWords +
                                    overlapWords / totalWords
                            );
                        const adjustedStart = wordStart * timelineScale;
                        const adjustedEnd = wordEnd * timelineScale;
                        const duration = adjustedEnd - adjustedStart;

                        const wordProgress =
                            revealProgress <= adjustedStart
                                ? 0
                                : revealProgress >= adjustedEnd
                                  ? 1
                                  : (revealProgress - adjustedStart) / duration;

                        word.style.opacity = wordProgress;
                        const backgroundFadeStart =
                            wordProgress >= 0.9
                                ? (wordProgress - 0.9) / 0.1
                                : 0;
                        const backgroundOpacity = Math.max(
                            0,
                            1 - backgroundFadeStart
                        );
                        word.style.backgroundColor = `rgba(${wordHighLightBgColor}, ${backgroundOpacity})`;

                        const textRevealThreshold = 0.9;
                        const textRevealProgress =
                            wordProgress >= textRevealThreshold
                                ? (wordProgress - textRevealThreshold) /
                                  (1 - textRevealThreshold)
                                : 0;
                        wordText.style.opacity = Math.pow(
                            textRevealProgress,
                            0.5
                        );
                    } else {
                        const reverseProgress = (progress - 0.7) / 0.3;
                        const reverseOverlapWords = 5;
                        const reverseWordStart = index / totalWords;
                        const reverseWordEnd =
                            reverseWordStart + reverseOverlapWords / totalWords;
                        const reverseTimelineScale =
                            1 /
                            Math.max(
                                1,
                                (totalWords - 1) / totalWords +
                                    reverseOverlapWords / totalWords
                            );
                        const reverseAdjustStart =
                            reverseWordStart * reverseTimelineScale;
                        const reverseAdjustEnd =
                            reverseWordEnd * reverseTimelineScale;
                        const reverseDuration = Math.max(
                            0.0001,
                            reverseAdjustEnd - reverseAdjustStart
                        );

                        let reverseWordProgress = 0;
                        if (reverseProgress <= reverseAdjustStart)
                            reverseWordProgress = 0;
                        else if (reverseProgress >= reverseAdjustEnd)
                            reverseWordProgress = 1;
                        else
                            reverseWordProgress =
                                (reverseProgress - reverseAdjustStart) /
                                reverseDuration;

                        if (reverseWordProgress > 0) {
                            wordText.style.opacity = String(
                                1 - reverseWordProgress
                            );
                            word.style.backgroundColor = `rgba(60,60,60,${reverseWordProgress})`;
                        } else {
                            wordText.style.opacity = "1";
                            word.style.backgroundColor = `rgba(60,60,60,0)`;
                        }
                    }
                });
            },
        });
        return () => {
            if (stRef.current) {
                stRef.current.kill();
                stRef.current = null;
            }
        };
    }, []);

    return (
        <main className="text-white w-full overflow-hidden">
            <section
                ref={aboutRef}
                className="w-full flex items-center justify-center p-8 min-h-screen relative z-[1000]"
            >
                <div className="max-w-6xl text-center">
                    <p className="mb-6 text-xl md:text-3xl lg:text-4xl font-bold leading-tight">
                        {paraOne}
                    </p>
                    <p className="mb-6 text-xl md:text-3xl lg:text-4xl font-bold leading-tight">
                        {paraTwo}
                    </p>
                </div>
            </section>
        </main>
    );
}
