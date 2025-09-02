import React, { ComponentPropsWithoutRef } from "react";
import grainImage from "@/assets/images/grain.jpg";
import { twMerge } from "tailwind-merge";

function CardBackGround({ className, children, ...other }) {
    return (
        <div
            className={twMerge(
                "bg-neutral-900 rounded-lg relative after:content-[''] after:absolute after:inset-0 z-0 after:z-10 overflow-hidden after:outline-2 after:-outline-offset-2 after:rounded-lg after:outline-white/15 after:pointer-events-none",
                className
            )}
            {...other}
        >
            <div
                className="absolute inset-0 -z-10 opacity-5"
                style={{
                    backgroundImage: `url(${grainImage.src})`,
                }}
            ></div>
            {children}
        </div>
    );
}

export default CardBackGround;
