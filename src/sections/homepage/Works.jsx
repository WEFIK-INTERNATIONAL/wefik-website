import React from "react";
import techverse2024Site from "@/assets/images/works/techverse.png";
import zoroXLangingPage from "@/assets/images/works/zoroX.png";
import aiStartupLandingPage from "@/assets/images/works/ai-startup-landing-page.png";
import metaverseMadness from "@/assets/images/works/metaverseMadness.png";
import brainDxPage from "@/assets/images/works/braindx.png";
import Tag from "@/components/ui/Tag";
import Link from "next/link";
import Image from "next/image";
import CardBackGround from "@/components/ui/CardBackGround";

const ourProjects = [
    {
        brand: "Techverse",
        title: "Techverse 2024 - GNIT",
        year: "2024",
        description:
            "A sleek and modern page for Techverse 2024, the annual tech fest of GNIT, showcasing event details and highlights.",
        image: techverse2024Site,
        link: "https://tech-verse-testing.vercel.app",
        results: [
            { title: "Enhanced User experience by 40%" },
            { title: "Improved Aesthetics and Engagement" },
            { title: "Modern UI and Aesthetics" },
        ],
    },
    {
        brand: "ZoroX",
        title: "Light SaaS Landing Page",
        year: "2023",
        description:
            "A clean and user-friendly landing page design for a SaaS gaming product, featuring light mode aesthetics.",
        image: zoroXLangingPage,
        link: "https://zorox.vercel.app/",
        results: [
            { title: "Boosted User Engagement by 30%" },
            { title: "Improved Visual Appeal" },
            { title: "Increased performance by 20%" },
        ],
    },
    {
        brand: "AI Innovations",
        title: "AI Startup Landing Page",
        year: "2023",
        description:
            "An innovative landing page design for an AI startup, showcasing cutting-edge technology and solutions.",
        image: aiStartupLandingPage,
        link: "https://dark-site-nu.vercel.app/",
        results: [
            { title: "Enhanced Brand Visibility" },
            { title: "Increased User Retention" },
            { title: "Boosted Lead Generation by 35%" },
        ],
    },
    {
        brand: "Metaverse Madness",
        title: "Metaverse Madness Landing Page",
        year: "2022",
        description:
            "A vibrant and engaging landing page design for Metaverse Madness, highlighting the event's features and attractions.",
        image: metaverseMadness,
        link: "https://metaverse-madness.vercel.app/",
        results: [
            { title: "Increased Event Registrations by 25%" },
            { title: "Improved User Interaction" },
            { title: "Enhanced Visual Storytelling" },
        ],
    },
    {
        brand: "BrainDx",
        title: "BrainDx Website",
        year: "2025",
        description:
            "A professional and informative page design for BrainDx, a healthcare technology company for brain tumor detection.",
        image: brainDxPage,
        link: "https://brain-dx.vercel.app/",
        results: [
            { title: "Boosted User Trust and Credibility" },
            { title: "Improved Information Accessibility" },
            { title: "Increased Conversion Rates by 20%" },
        ],
    },
];

function Works() {
    return (
        <section className="pb-16 lg:py-24">
            <div className="container">
                <div className="flex justify-center gap-4">
                    <Tag>Selected Work 2022-2025</Tag>
                </div>
                <h2 className="text-6xl font-medium text-center mt-6 max-w-6xl mx-auto">
                    Transforming Concepts into Digital{" "}
                    <span className="text-lime-400">Masterpieces</span>
                </h2>
                <p className="text-center text-xl text-white/50 mt-8 max-w-2xl mx-auto">
                    See how we transformed concepts into digital experiences
                </p>
                <div className="flex flex-col mt-10 gap-20 md:mt-20 lg:max-w-5xl mx-auto">
                    {ourProjects.map((project, projectIndex) => (
                        <CardBackGround
                            key={project.title}
                            className="px-8 pt-8 pb-0 md:pt-12 md:px-10 lg:pt-16 lg:px-20 sticky"
                            style={{
                                top: `calc(128px + ${projectIndex * 16}px)`,
                            }}
                        >
                            <div className="lg:grid lg:grid-cols-2 lg:gap-16">
                                <div className="lg:pb-16">
                                    <div className="bg-gradient-to-r from-lime-600 to-lime-300 inline-flex font-bold uppercase tracking-widest text-sm gap-2 text-transparent bg-clip-text">
                                        <span>{project.brand}</span>
                                        <span>&bull;</span>
                                        <span>{project.year}</span>
                                    </div>
                                    <h3 className="text-2xl mt-2 md:text-4xl md:mt-5">
                                        {project.title}
                                    </h3>
                                    <hr className="border-t-2 border-white/5 mt-4 md:mt-5" />
                                    <ul className="flex flex-col gap-4 mt-4 md:mt-5">
                                        {project.results.map(
                                            (result, index) => (
                                                <li
                                                    key={index}
                                                    className="flex gap-2 items-center text-sm md:text-base text-white/50"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="1.5"
                                                        stroke="currentColor"
                                                        className="size-5 md:size-6"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                                        />
                                                    </svg>
                                                    <span>{result.title}</span>
                                                </li>
                                            )
                                        )}
                                    </ul>
                                    <Link href={project.link}>
                                        <button className="bg-white text-gray-950 h-12 w-full md:w-auto px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-2 mt-8 cursor-pointer">
                                            <span>View Live</span>
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
                                                <line
                                                    x1="7"
                                                    y1="17"
                                                    x2="17"
                                                    y2="7"
                                                ></line>
                                                <polyline points="7 7 17 7 17 17"></polyline>
                                            </svg>
                                        </button>
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Image
                                        src={project.image}
                                        alt={project.title}
                                        className="mt-8 -mb-4 md:-mb-0 lg:mt-0 lg:absolute lg:h-full lg:w-auto lg:max-w-none"
                                    />
                                </div>
                            </div>
                        </CardBackGround>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Works;
