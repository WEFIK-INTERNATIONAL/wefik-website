import React from "react";
import backgroundNoise from "@/assets/images/backgroundnoise.gif";

export default function BackgroundNoise() {
    return (
        <div
            className="fixed inset-0 pointer-events-none opacity-[0.03] z-[2147483647]"
            style={{
                backgroundImage: `url(${backgroundNoise.src})`,
                backgroundSize: "480px 480px",
                backgroundAttachment: "fixed",
                backgroundPosition: "0 0",
                backgroundRepeat: "repeat",
            }}
            aria-hidden="true"
        />
    );
}
