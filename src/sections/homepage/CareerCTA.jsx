"use client";
import React from "react";
import { motion } from "framer-motion";
import RoundedButton from "@/components/ui/RoundedButton";

function CareerCTA() {
    return (
        <section>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="mt-16 text-center"
                >
                    <div className="p-8 max-w-6xl mx-auto bg-gradient-to-br from-lime-400/10 via-transparent to-purple-500/10 rounded-3xl border border-lime-400/20 backdrop-blur-sm">
                        <h3 className="text-3xl font-semibold text-white mb-3">
                            Be a Part of Something Great
                        </h3>
                        <p className="text-white/60 mb-6 max-w-3xl mx-auto">
                            We are always looking for talented individuals to
                            join our team. We have Big Plans -They include You.
                            Easiest & Simple Hiring Process Ever.
                        </p>
                        <div className="flex flex-col items-center mt-10 gap-4 text-lg">
                            <RoundedButton
                                href="/career"
                                className={
                                    "p-3 rounded-full bg-lime-400 font-medium text-black outline-2 outline-lime-600 cursor-pointer"
                                }
                            >
                                Join the Team
                            </RoundedButton>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

export default CareerCTA;
