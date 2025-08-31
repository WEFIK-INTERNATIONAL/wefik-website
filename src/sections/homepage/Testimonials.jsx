"use client";
import React from "react";
import avatar1 from "@/assets/images/avatar/avatar-1.png";
import avatar2 from "@/assets/images/avatar/avatar-2.png";
import avatar3 from "@/assets/images/avatar/avatar-3.png";
import avatar4 from "@/assets/images/avatar/avatar-4.png";
import avatar5 from "@/assets/images/avatar/avatar-5.png";
import avatar6 from "@/assets/images/avatar/avatar-6.png";
import avatar7 from "@/assets/images/avatar/avatar-7.png";
import avatar8 from "@/assets/images/avatar/avatar-8.png";
import avatar9 from "@/assets/images/avatar/avatar-9.png";
import Tag from "@/components/ui/Tag";
import CardBackGround from "@/components/ui/CardBackGround";
import Image from "next/image";
import { motion } from "framer-motion";

const testimonials = [
    {
        text: "WEFIK completely revamped our website with a modern, responsive design. The process was smooth and the results exceeded expectations.",
        imageSrc: avatar1.src,
        name: "Jamie Rivera",
        username: "@jamietechguru00",
        rating: 4,
        category: "Web Development",
    },
    {
        text: "Their Shopify development team helped us launch our store quickly. Sales and user engagement improved from day one.",
        imageSrc: avatar2.src,
        name: "Josh Smith",
        username: "@jjsmith",
        rating: 5,
        category: "E-commerce",
    },
    {
        text: "The UI/UX design from WEFIK gave our app a professional look and made it much easier for customers to use.",
        imageSrc: avatar3.src,
        name: "Morgan Lee",
        username: "@morganleewhiz",
        rating: 4,
        category: "UI/UX Design",
    },
    {
        text: "We were impressed by how fast WEFIK delivered our WordPress site without compromising on quality or performance.",
        imageSrc: avatar4.src,
        name: "Casey Jordan",
        username: "@caseyj",
        rating: 3,
        category: "WordPress",
    },
    {
        text: "The branding and creative campaigns WEFIK designed for us helped our company stand out in a crowded market.",
        imageSrc: avatar5.src,
        name: "Taylor Kim",
        username: "@taylorkimm",
        rating: 5,
        category: "Branding",
    },
    {
        text: "Their team provided top-notch custom solutions with seamless integrations that really streamlined our workflow.",
        imageSrc: avatar6.src,
        name: "Riley Smith",
        username: "@rileysmith1",
        rating: 5,
        category: "Custom Solutions",
    },
    {
        text: "Partnering with WEFIK for web development was the best decision we made. Communication was clear and delivery was on time.",
        imageSrc: avatar7.src,
        name: "Jordan Patels",
        username: "@jpatelsdesign",
        rating: 3.5,
        category: "Web Development",
    },
    {
        text: "They built us a powerful eCommerce site where we can easily manage products, track sales, and scale our business.",
        imageSrc: avatar8.src,
        name: "Sam Dawson",
        username: "@dawsontechtips",
        rating: 5,
        category: "E-commerce",
    },
    {
        text: "From concept to execution, WEFIK's design and development team delivered exactly what our business needed.",
        imageSrc: avatar9.src,
        name: "Casey Harper",
        username: "@casey09",
        rating: 4,
        category: "Full Service",
    },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

const StarRating = ({ rating }) => {
    return (
        <div className="flex gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
                <svg
                    key={i}
                    className={`w-4 h-4 ${i < rating ? "text-lime-800" : "text-white/20"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
};

const TestimonialsColumn = (props) => {
    return (
        <div className={props.className}>
            <motion.div
                animate={{ translateY: "-50%" }}
                transition={{
                    duration: props.duration || 10,
                    ease: "linear",
                    repeat: Infinity,
                    repeatType: "loop",
                }}
                className="flex flex-col gap-6 pb-6"
            >
                {[...new Array(2)].fill(0).map((_, index) => (
                    <React.Fragment key={index}>
                        {props.testimonials.map(
                            ({
                                text,
                                imageSrc,
                                name,
                                username,
                                rating,
                                category,
                            }) => (
                                <motion.div
                                    key={name}
                                    whileHover={{
                                        scale: 1.02,
                                        transition: { duration: 0.2 },
                                    }}
                                    className="group"
                                >
                                    <CardBackGround className="p-6 relative overflow-hidden border border-white/10 hover:border-lime-400/40 transition-all duration-500 backdrop-blur-sm">
                                        {/* Subtle gradient overlay on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-lime-400/8 via-transparent to-purple-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                        {/* Category tag */}
                                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                                            <span className="text-xs px-3 py-1.5 bg-lime-400/15 text-lime-400 rounded-full border border-lime-400/30 font-medium backdrop-blur-sm">
                                                {category}
                                            </span>
                                        </div>

                                        <StarRating rating={rating} />

                                        {/* Quote icon */}
                                        <div className="absolute top-6 left-6 opacity-10">
                                            <svg
                                                className="w-8 h-8 text-lime-400"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                                            </svg>
                                        </div>

                                        <div className="relative z-10">
                                            <div className="text-white/85 leading-relaxed mb-6 text-sm font-medium">
                                                "{text}"
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <Image
                                                        src={imageSrc}
                                                        alt={name}
                                                        width={48}
                                                        height={48}
                                                        className="size-12 rounded-full ring-2 ring-lime-400/20 group-hover:ring-lime-400/40 transition-all duration-300"
                                                    />
                                                    {/* Online indicator */}
                                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-lime-400 rounded-full border-2 border-gray-900" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <div className="font-semibold tracking-tight leading-5 text-white group-hover:text-lime-400 transition-colors duration-300">
                                                        {name}
                                                    </div>
                                                    <div className="leading-5 tracking-tight text-white/40 text-sm">
                                                        {username}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardBackGround>
                                </motion.div>
                            )
                        )}
                    </React.Fragment>
                ))}
            </motion.div>
        </div>
    );
};

function Testimonials() {
    return (
        <section className="py-24 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-tr from-lime-600/20 via-black to-transparent overflow-x-hidden"></div>
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lime-400/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="flex justify-center gap-4"
                >
                    <Tag>Testimonials</Tag>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-5xl lg:text-6xl font-bold text-center mt-6 max-w-6xl mx-auto bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent"
                >
                    <span className="bg-gradient-to-r from-lime-400 to-green-400 bg-clip-text text-transparent">
                        Success
                    </span>{" "}
                    Stories,
                    <br className="sm:hidden" /> Shared
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-center text-lg lg:text-xl text-white/60 mt-8 max-w-2xl mx-auto leading-relaxed"
                >
                    We don&apos;t just deliver projects — we build lasting
                    partnerships. Here&apos;s what our clients share about
                    working with WEFIK.
                </motion.p>

                {/* Stats section */}
                {/* <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="flex justify-center gap-8 mt-12 mb-16"
                >
                    <div className="text-center">
                        <div className="text-2xl lg:text-3xl font-bold text-lime-400">
                            150+
                        </div>
                        <div className="text-white/50 text-sm">
                            Happy Clients
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl lg:text-3xl font-bold text-lime-400">
                            4.9/5
                        </div>
                        <div className="text-white/50 text-sm">
                            Average Rating
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl lg:text-3xl font-bold text-lime-400">
                            98%
                        </div>
                        <div className="text-white/50 text-sm">
                            Project Success
                        </div>
                    </div>
                </motion.div> */}

                <div className="h-[500px] lg:h-[650px] overflow-hidden flex justify-center gap-6 max-w-6xl mx-auto [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] mt-20 p-2">
                    <TestimonialsColumn
                        testimonials={firstColumn}
                        duration={15}
                    />
                    <TestimonialsColumn
                        testimonials={secondColumn}
                        className="hidden md:block"
                        duration={17}
                    />
                    <TestimonialsColumn
                        testimonials={thirdColumn}
                        className="hidden lg:block"
                        duration={19}
                    />
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
