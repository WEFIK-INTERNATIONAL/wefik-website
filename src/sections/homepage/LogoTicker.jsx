"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

import quantumLogo from "@/assets/images/logoticker/quantum.svg";
import acmeLogo from "@/assets/images/logoticker/acme-corp.svg";
import echoValleyLogo from "@/assets/images/logoticker/echo-valley.svg";
import pulseLogo from "@/assets/images/logoticker/pulse.svg";
import outsideLogo from "@/assets/images/logoticker/outside.svg";
import apexLogo from "@/assets/images/logoticker/apex.svg";
import celestialLogo from "@/assets/images/logoticker/celestial.svg";
import twiceLogo from "@/assets/images/logoticker/twice.svg";

const logos = [
    { name: "Quantum", image: quantumLogo },
    { name: "Acme Corp", image: acmeLogo },
    { name: "Echo Valley", image: echoValleyLogo },
    { name: "Pulse", image: pulseLogo },
    { name: "Outside", image: outsideLogo },
    { name: "Apex", image: apexLogo },
    { name: "Celestial", image: celestialLogo },
    { name: "Twice", image: twiceLogo },
];

export default function LogoTicker() {
    return (
        <section className="py-24 overflow-x-clip">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="container"
            >
                <h3 className="text-center text-white/50 text-xl">
                    Already chosen by these market leaders
                </h3>
                <div className="flex overflow-hidden mt-12 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
                    <motion.div
                        animate={{ x: "-50%" }}
                        transition={{
                            duration: 30,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                        className="flex flex-none gap-24 pr-24"
                    >
                        {Array.from({ length: 2 }).map((_, i) => (
                            <React.Fragment key={i}>
                                {logos.map((logo) => (
                                    <Image
                                        src={logo.image}
                                        alt={logo.name}
                                        key={logo.name}
                                    />
                                ))}
                            </React.Fragment>
                        ))}
                    </motion.div>
                </div>
            </motion.div>
        </section>
    );
}
