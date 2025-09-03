"use client";
import React from "react";
import Tag from "@/components/ui/Tag";
import fourStrip from "@/assets/images/expertise/four-stripe.svg";
import roundStar from "@/assets/images/expertise/round-star.svg";
import snowFlex from "@/assets/images/expertise/snow-flex.svg";
import threeDot from "@/assets/images/expertise/threedot.svg";
import zipProduct from "@/assets/images/expertise/zip-product.svg";
import ExpertiseCard from "@/components/ui/homePage/ExpertiseCard";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { motion } from "framer-motion";

const servicesContent = [
    {
        title: "Web Design",
        iconImage: threeDot,
        description:
            "From pixel-perfect layouts to intuitive navigation, our websites don't just look good — they work hard for your brand",
        result: [
            "Fully responsive across devices",
            "Optimized for speed and SEO",
            "Custom Tailored Design",
        ],
        linkTo: "#",
        btnName: "Web Design",
        className: "",
    },
    {
        title: "Digital Product Design",
        iconImage: zipProduct,
        description:
            "From SaaS platforms to mobile apps, we design digital products that are beautiful, functional, and future-ready",
        result: [
            "Mobile & web app design",
            "Dashboard & data visualization",
            "Cross-platform consistency",
        ],
        linkTo: "#",
        btnName: "Product Design",
        className: "bg-gradient-to-br from-lime-800 to-lime-400",
    },
    {
        title: "Development",
        iconImage: roundStar,
        description:
            "We turn creative visions into functional, scalable platforms — built to perform and grow with your business",
        result: [
            "Shopify, WordPress, & custom builds",
            "Seamless integrations",
            "Fast, secure, and maintainable code",
        ],
        linkTo: "#",
        btnName: "Development",
    },
    {
        title: "UI/UX & Prototyping",
        iconImage: snowFlex,
        description:
            "We design experiences that engage users and drive results — blending creativity with human-centered strategy.",
        result: [
            "Wireframes & interactive prototypes",
            "User journey mapping & testing",
            "Conversion-focused experience design",
        ],
        linkTo: "#",
        btnName: "UI/UX Works",
        className: "bg-gradient-to-br from-lime-800 to-lime-400",
    },
    {
        title: "Brand Identity",
        iconImage: fourStrip,
        description:
            "Your brand is more than a logo — it's a story. We shape every detail so your business leaves a lasting mark",
        result: [
            "Logo creation & brand guidelines",
            "Typography & color systems",
            "Cohesive visual language",
        ],
        linkTo: "#",
        btnName: "Branding",
    },
    {
        title: "Creative Content & Campaigns",
        iconImage: roundStar,
        description:
            "We produce high-impact visual content and campaigns that amplify your brand's voice",
        result: [
            "Social media campaigns & ad creatives",
            "Video editing & motion graphics",
            "Marketing automation-ready visuals",
        ],
        linkTo: "#",
        btnName: "Content Services",
        className: "bg-gradient-to-br from-lime-800 to-lime-400",
    },
];

function ExpertiseSection() {
    const [sliderRef] = useKeenSlider({
        loop: true,
        mode: "snap",
        slides: {
            perView: 1.1,
            spacing: 16,
        },
        breakpoints: {
            "(min-width: 640px)": {
                slides: { perView: 1.5, spacing: 20 },
            },
            "(min-width: 768px)": {
                slides: { perView: 2.2, spacing: 24 },
            },
        },
    });

    return (
        <section className="py-24">
            <div className="container">
                <div className="flex justify-center gap-4">
                    <Tag>Our Services</Tag>
                </div>
                <h2 className="text-6xl font-medium text-center mt-6 max-w-6xl mx-auto">
                    Our Services, Your{" "}
                    <span className="text-lime-400">Growth</span>
                </h2>
                <p className="text-center text-xl text-white/50 mt-8 max-w-2xl mx-auto">
                    From web design and development to branding, UI/UX, and
                    creative campaigns — our services are crafted to help your
                    business grow, stand out, and connect effortlessly.
                </p>

                <div className="block lg:hidden mt-16 ">
                    <div ref={sliderRef} className="keen-slider">
                        {servicesContent.map((item, index) => (
                            <div
                                className="keen-slider__slide !min-h-[480px]"
                                key={index}
                            >
                                <ExpertiseCard
                                    item={item}
                                    className={item.className}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="hidden lg:grid mt-20 grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {servicesContent.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <ExpertiseCard
                                item={item}
                                className={item.className}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default ExpertiseSection;
