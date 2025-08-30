import React from "react";
import { twMerge } from "tailwind-merge";

function Tag({ className, children, ...otherProps }) {
    return (
        <div
            className={twMerge(
                "inline-flex border border-lime-400 uppercase gap-2 text-lime-400 py-1 px-2 rounded-full items-center",
                className
            )}
            {...otherProps}
        >
            <span>&#10038;</span>
            <span className="text-sm">{children}</span>
        </div>
    );
}

export default Tag;
