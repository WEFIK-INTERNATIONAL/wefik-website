"use client";
import Tag from "@/components/ui/Tag";
import { twMerge } from "tailwind-merge";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
    {
        question: "What kind of websites does WEFIK build?",
        answer: "We develop custom websites ranging from corporate sites and portfolios to full-scale eCommerce platforms, ensuring performance, scalability, and modern design.",
        category: "Development",
        icon: "🌐",
    },
    {
        question: "Do you provide WordPress and Shopify development?",
        answer: "Yes! We specialize in WordPress and Shopify development, delivering tailored solutions for blogs, business websites, and online stores.",
        category: "Platforms",
        icon: "🛒",
    },
    {
        question: "How does WEFIK approach web design?",
        answer: "Our web design process focuses on clean aesthetics, responsiveness, and user-centered layouts that align with your brand identity.",
        category: "Design",
        icon: "🎨",
    },
    {
        question: "Do you offer UI/UX design and prototyping?",
        answer: "Absolutely. We craft intuitive user experiences, interactive prototypes, and streamlined interfaces to make your digital products both functional and delightful.",
        category: "Design",
        icon: "📱",
    },
    {
        question: "Can WEFIK help with branding?",
        answer: "Yes, we build strong brand identities by creating logos, visual guidelines, and storytelling assets that make your brand stand out.",
        category: "Branding",
        icon: "✨",
    },
    {
        question: "Do you provide creative content and campaigns?",
        answer: "Yes, we produce engaging digital content and marketing campaigns designed to connect with your audience and amplify your reach.",
        category: "Marketing",
        icon: "📢",
    },
    {
        question: "What industries does WEFIK serve?",
        answer: "We work with startups, SMEs, and enterprises across industries including eCommerce, technology, fashion, education, and more.",
        category: "General",
        icon: "🏢",
    },
    {
        question: "Does WEFIK provide ongoing support?",
        answer: "Yes. Beyond project delivery, we offer maintenance, updates, and long-term support to ensure your digital presence keeps evolving.",
        category: "Support",
        icon: "🛠️",
    },
];

// Parent animation for stagger
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            when: "beforeChildren",
            staggerChildren: 0.12,
        },
    },
};

// Each card animation
const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "linear" } },
};

export default function Faqs() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-lime-600/20 via-black to-transparent overflow-x-hidden"></div>
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-pink-500/10 rounded-full filter blur-3xl animate-pulse overflow-x-hidden"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-lime-400/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000 overflow-x-hidden"></div>
            <div className="absolute inset-0 opacity-40">
                <div className="absolute top-1/3 left-1/6 w-72 h-72 bg-lime-400/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
            </div>

            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center"
                >
                    <Tag>FAQs</Tag>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl lg:text-6xl font-bold mt-6 text-center max-w-2xl mx-auto"
                >
                    Questions? We&apos;ve got{" "}
                    <span className="bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">
                        answers
                    </span>
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center text-lg text-white/60 mt-6 max-w-xl mx-auto"
                >
                    Everything you need to know about working with WEFIK.
                    Can&apos;t find what you&apos;re looking for? Get in touch.
                </motion.p>

                {/* FAQ List with stagger animation */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    className="mt-16 flex flex-col gap-4 max-w-2xl mx-auto"
                >
                    {faqs.map((faq, faqIndex) => (
                        <motion.div
                            key={faq.question}
                            variants={cardVariants}
                            className={twMerge(
                                "group relative bg-neutral-900/80 backdrop-blur-sm rounded-2xl border transition-all duration-500 overflow-hidden",
                                selectedIndex === faqIndex
                                    ? "border-lime-400/50 bg-gradient-to-br from-lime-400/5 via-neutral-900/80 to-purple-500/5"
                                    : "border-white/10 hover:border-white/20"
                            )}
                        >
                            {/* Active indicator bar */}
                            <div
                                className={twMerge(
                                    "absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-lime-400 to-green-500 transition-all duration-500",
                                    selectedIndex === faqIndex
                                        ? "opacity-100"
                                        : "opacity-0"
                                )}
                            />

                            <div
                                className="flex justify-between items-start cursor-pointer p-6 hover:bg-white/[0.02] transition-colors duration-300"
                                onClick={() =>
                                    setSelectedIndex(
                                        selectedIndex === faqIndex
                                            ? -1
                                            : faqIndex
                                    )
                                }
                            >
                                <div className="flex items-start gap-4 flex-1">
                                    {/* Icon */}
                                    <div
                                        className={twMerge(
                                            "w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all duration-300",
                                            selectedIndex === faqIndex
                                                ? "bg-lime-400/20 ring-2 ring-lime-400/30"
                                                : "bg-white/5 group-hover:bg-white/10"
                                        )}
                                    >
                                        {faq.icon}
                                    </div>

                                    <div className="flex-1">
                                        {/* Category tag */}
                                        <div className="mb-2">
                                            <span className="text-xs px-2 py-1 bg-lime-400/10 text-lime-400/80 rounded-full border border-lime-400/20 font-medium">
                                                {faq.category}
                                            </span>
                                        </div>

                                        <h3
                                            className={twMerge(
                                                "font-medium text-lg leading-relaxed transition-colors duration-300",
                                                selectedIndex === faqIndex
                                                    ? "text-white"
                                                    : "text-white/90 group-hover:text-white"
                                            )}
                                        >
                                            {faq.question}
                                        </h3>
                                    </div>
                                </div>

                                {/* Toggle button */}
                                <motion.div
                                    animate={{
                                        rotate:
                                            selectedIndex === faqIndex ? 45 : 0,
                                    }}
                                    transition={{
                                        duration: 0.3,
                                        ease: "easeOut",
                                    }}
                                    className={twMerge(
                                        "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ml-4 flex-shrink-0",
                                        selectedIndex === faqIndex
                                            ? "bg-lime-400 text-black"
                                            : "bg-white/10 text-lime-400 hover:bg-lime-400/20"
                                    )}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line
                                            x1="12"
                                            y1="5"
                                            x2="12"
                                            y2="19"
                                        ></line>
                                        <line
                                            x1="5"
                                            y1="12"
                                            x2="19"
                                            y2="12"
                                        ></line>
                                    </svg>
                                </motion.div>
                            </div>

                            {/* Expandable answer */}
                            <AnimatePresence>
                                {selectedIndex === faqIndex && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{
                                            height: "auto",
                                            opacity: 1,
                                            transition: {
                                                duration: 0.4,
                                                ease: "easeOut",
                                            },
                                        }}
                                        exit={{
                                            height: 0,
                                            opacity: 0,
                                            transition: {
                                                duration: 0.3,
                                                ease: "easeIn",
                                            },
                                        }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 pb-6 pl-20">
                                            <div className="border-t border-white/10 pt-4">
                                                <p className="text-white/70">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Call to action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <div className="p-8 bg-gradient-to-br from-lime-400/10 via-transparent to-purple-500/10 rounded-3xl border border-lime-400/20 backdrop-blur-sm max-w-lg mx-auto">
                        <h3 className="text-xl font-semibold text-white mb-3">
                            Still have questions?
                        </h3>
                        <p className="text-white/60 mb-6">
                            Our team is here to help. Get in touch and we'll
                            respond within 24 hours.
                        </p>
                        <button className="bg-lime-400 text-black font-semibold px-8 py-3 rounded-full hover:bg-lime-300 transition-all duration-300 hover:scale-105 transform">
                            Contact Us
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
