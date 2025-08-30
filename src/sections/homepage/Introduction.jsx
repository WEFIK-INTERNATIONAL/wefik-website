import SplitWord from "@/components/ui/SplitWord";
import React from "react";

const paraOne =
    "Outdated websites and clunky platforms hold businesses back. In today's digital-first world, your online presence isn't just a touchpoint — it's your growth engine and a key to winning clients.";
const paraTwo =
    "At WEFIK, we help ambitious businesses scale with bold, minimal, and modern digital solutions — from strategy and UX to high-performing websites, apps, and campaigns . Your ideas deserve more than presence; they deserve to lead and grow.";

const keywords = [
    "growth",
    "websites",
    "wefik",
    "presence",
    "solutions",
    "campaigns",
    "grow",
];

function Introduction() {
    return (
        <section className="text-white relative">
            <div className="absolute inset-0 bg-gradient-to-bl from-gray-900 via-black to-transparent"></div>
            <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-pink-500/10 rounded-full filter blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-lime-400/10 rounded-full filter blur-3xl animate-pulse animation-delay-2000"></div>
            <div
                className="absolute inset-0 opacity-5"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
                    backgroundSize: "50px 50px",
                }}
            ></div>
            <div className="container">
                <div>
                    <SplitWord
                        paraOne={paraOne}
                        paraTwo={paraTwo}
                        keywords={keywords}
                    />
                </div>
            </div>
        </section>
    );
}

export default Introduction;
