"use client";
import React from "react";
import { useState } from "react";
import CallToActionCom from "@/components/ui/CallToActionCom";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

const allLinks = [
    {
        title: "Contact",
        linksTo: [
            { name: "WEFIK", url: "/" },
            { name: "Kestopur Salt Lake kolkata 700114", url: "#" },
            { name: "info@wefik.in", url: "mailto:info@wefik.in" },
            { name: "+91 9609653522", url: "tel:9609653522" },
        ],
    },
    {
        title: "Pages",
        linksTo: [
            { name: "Home", url: "/" },
            { name: "Agency", url: "/agency" },
            { name: "Expertise", url: "/expertise" },
            { name: "Work", url: "/work" },
            { name: "Contact", url: "/contact" },
            { name: "Blog", url: "/blog" },
            { name: "Career", url: "/career" },
        ],
    },
    {
        title: "Expertise",
        linksTo: [
            { name: "Web Development", url: "/expertise/web-development" },
            {
                name: "Wordpress & Shopify Development",
                url: "/expertise/wordpress-shopify-development",
            },
            { name: "Web Design", url: "/expertise/mobile-app-development" },
            {
                name: "UI/UX & Prototyping",
                url: "/expertise/e-commerce-solutions",
            },
            { name: "Brand Identity", url: "/expertise/brand-identity" },
            {
                name: "Creative Content & Campaigns",
                url: "/expertise/e-commerce-solutions",
            },
        ],
    },
    {
        title: "Socials",
        linksTo: [
            {
                name: "Facebook",
                url: "https://www.facebook.com/wefikinternational/",
            },
            { name: "Twitter", url: "https://x.com/wefikindia" },
            {
                name: "LinkedIn",
                url: "https://www.linkedin.com/company/wefik/",
            },
            { name: "Instagram", url: "https://www.instagram.com/wefik.in/" },
            { name: "Behance", url: "https://www.behance.net/wefik" },
            { name: "Medium", url: "https://wefikindia.medium.com/" },
        ],
    },
];

// Dropdown component for mobile view
const DropDownLinks = (props) => {
    const [selectedIndex, setSelectedIndex] = useState(null);

    const handleClick = (index) => {
        setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
    };

    return (
        <div className="flex flex-col gap-6 max-w-6xl md:hidden">
            {props.allLinks.map((link, index) => (
                <div key={index} className="flex-1">
                    <div
                        onClick={() => handleClick(index)}
                        className="cursor-pointer flex items-center justify-between"
                    >
                        <h3 className="bg-gradient-to-r from-lime-400 to-lime-200 bg-clip-text text-transparent font-semibold">
                            {link.title}
                        </h3>
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
                            className={`feather feather-chevron-down text-white/50 transition-transform duration-300 ${
                                selectedIndex === index ? "rotate-180" : ""
                            }`}
                        >
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </div>
                    <AnimatePresence>
                        {selectedIndex === index && (
                            <motion.div
                                initial={{ height: 0, marginTop: 0 }}
                                animate={{ height: "auto", marginTop: 16 }}
                                exit={{ height: 0, marginTop: 0 }}
                                className="overflow-hidden"
                            >
                                <ul className="flex flex-col gap-2">
                                    {link.linksTo.map((sublink, subIndex) => (
                                        <li key={subIndex}>
                                            <a
                                                href={sublink.url}
                                                className="text-white/50"
                                            >
                                                {sublink.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <hr
                        className={`${
                            index === 3
                                ? "hidden"
                                : "border-t-2 border-white/5 mt-5"
                        }`}
                    />
                </div>
            ))}
        </div>
    );
};

function Footer() {
    return (
        <section className="pt-24 relative overflow-x-clip bg-gradient-to-b from-transparent via-gray-900 to-blue-950 font-neue">
            <div>
                <div className="mx-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-12">
                        <div className="flex flex-col gap-2">
                            <Link
                                href="/"
                                className="flex-shrink-0 md:hidden lg:flex"
                            >
                                <p className="text-2xl md:text-4xl font-medium">
                                    WEFIK
                                </p>
                            </Link>
                            <p className="text-white/50 max-w-lg">
                                From websites and apps to design, branding, and
                                digital campaigns, we turn your ideas into
                                reality.
                            </p>
                        </div>
                        <div className="flex-1">
                            <DropDownLinks allLinks={allLinks} />
                            <div className="hidden md:flex md:justify-center lg:justify-end gap-20 w-full">
                                {allLinks.map((link, index) => (
                                    <div key={index} className="flex flex-col">
                                        <h3 className="bg-gradient-to-r from-lime-400 to-lime-100 bg-clip-text text-transparent font-semibold">
                                            {link.title}
                                        </h3>
                                        <ul className="mt-4 flex flex-col gap-2">
                                            {link.linksTo.map(
                                                (sublink, subIndex) => (
                                                    <li key={subIndex}>
                                                        <Link
                                                            className="cursor-pointer text-white/50 hover:text-lime-400 hover:drop-shadow-[0_0_6px_rgba(132,255,132,0.6)] transition-all leading-5"
                                                            href={sublink.url}
                                                        >
                                                            {sublink.name}
                                                        </Link>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="mt-20 flex flex-col md:flex-row md:justify-between mb-5">
                        <p className="text-white/40">
                            All rights reserved 2025 ©{" "}
                            <span className="text-lime-400">WEFIK</span>
                        </p>
                        <div className="flex gap-5">
                            <Link
                                href="/legal/data-protection"
                                className="text-white/50 hover:text-white transition"
                            >
                                Data Protection
                            </Link>
                            <Link
                                href="/legal/imprint"
                                className="text-white/50 hover:text-white transition"
                            >
                                Imprint
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-5">
                <CallToActionCom />
            </div>
        </section>
    );
}

export default Footer;
