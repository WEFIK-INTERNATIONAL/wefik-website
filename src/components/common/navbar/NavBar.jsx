"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { NavLogo } from "./NavLogo";
import MenuBtn from "./MenuBtn";
import Link from "next/link";
import { usePathname } from "next/navigation"; // 🔹 import hook

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname(); // 🔹 get current path

    const handleToggle = () => setIsMenuOpen((prev) => !prev);

    // Variants
    const menuPanelVariants = {
        closed: {
            x: "100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
        },
        open: {
            x: "0%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
        },
    };

    const overlayVariants = {
        closed: {
            opacity: 0,
            backdropFilter: "blur(0px)",
            transition: { duration: 0.5 },
        },
        open: {
            opacity: 1,
            backdropFilter: "blur(12px)",
            transition: { duration: 0.7 },
        },
    };

    const menuItemsContainer = {
        open: { transition: { delayChildren: 0.4, staggerChildren: 0.12 } },
        closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
    };

    const menuItem = {
        open: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
        },
        closed: {
            x: 60,
            opacity: 0,
            transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
        },
    };

    const menuItems = [
        { name: "Home", href: "/" },
        { name: "Agency", href: "/agency" },
        { name: "Expertise", href: "/expertise" },
        { name: "Works", href: "/work" },
        { name: "Blog", href: "/blog" },
        { name: "Career", href: "/career" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <div className="z-49 w-full relative overflow-x-hidden">
            <div className="fixed top-5 left-0 z-50">
                <div className="flex justify-between w-screen px-4 md:px-10">
                    <NavLogo isMenuOpen={isMenuOpen} />
                    <MenuBtn isMenuOpen={isMenuOpen} onToggle={handleToggle} />
                </div>
            </div>

            <motion.div
                className="fixed inset-0 bg-black/80 z-40"
                variants={overlayVariants}
                initial="closed"
                animate={isMenuOpen ? "open" : "closed"}
                onClick={handleToggle}
                style={{ pointerEvents: isMenuOpen ? "auto" : "none" }}
            />

            <motion.div
                className="fixed top-0 right-0 h-full w-full max-w-lg 
             bg-gradient-to-b from-black via-black/95 to-black 
             border-l border-lime-400/20 shadow-[0_0_60px_rgba(163,230,53,0.15)] z-40"
                variants={menuPanelVariants}
                initial="closed"
                animate={isMenuOpen ? "open" : "closed"}
            >
                <div className="absolute inset-0 bg-gradient-radial from-lime-400/10 via-transparent to-transparent pointer-events-none" />

                <div className="relative flex flex-col justify-center items-start h-full px-10 pt-25 pb-10">
                    <motion.nav
                        className="flex-shrink-0"
                        variants={menuItemsContainer}
                        initial="closed"
                        animate={isMenuOpen ? "open" : "closed"}
                    >
                        <ul className="space-y-5 md:space-y-10">
                            {menuItems.map((item) => {
                                const isActive = pathname === item.href; // 🔹 check active
                                return (
                                    <motion.li
                                        key={item.name}
                                        variants={menuItem}
                                    >
                                        <Link
                                            href={item.href}
                                            className={`group block text-4xl md:text-5xl font-light tracking-wide transition-all duration-500 ${
                                                isActive
                                                    ? "text-lime-400"
                                                    : "text-white hover:text-lime-400"
                                            }`}
                                            onClick={handleToggle}
                                        >
                                            <span className="relative">
                                                {item.name}
                                                <motion.span
                                                    className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-lime-400 to-pink-400 origin-left"
                                                    animate={{
                                                        scaleX: isActive
                                                            ? 1
                                                            : 0,
                                                    }}
                                                    whileHover={{ scaleX: 1 }}
                                                    transition={{
                                                        duration: 0.5,
                                                        ease: "easeOut",
                                                    }}
                                                />
                                            </span>
                                        </Link>
                                    </motion.li>
                                );
                            })}
                        </ul>
                    </motion.nav>

                    <div className="mt-auto border-t border-lime-400/20 pt-8 w-full flex justify-between text-sm text-gray-400">
                        <a
                            href="mailto:info@wefik.in"
                            className="hover:text-lime-400 transition"
                        >
                            hello@company.com
                        </a>
                        <div className="flex gap-6">
                            <a
                                href="tel:+91 9609653522"
                                className="hover:text-pink-400 transition"
                            >
                                +91 9609653522
                            </a>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default Navbar;
