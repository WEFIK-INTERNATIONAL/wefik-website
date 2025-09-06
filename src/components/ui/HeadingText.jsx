import React from "react";
import TextClipPathAnimation from "./TextClipPath";

function HeadingText({ children }) {
    return (
        <div className="flex flex-col gap-24">
            <TextClipPathAnimation
                text={children}
                className="text-6xl md:text-7px md:text-9xl font-medium"
            />
            <div className="border-1 w-full border-neutral-800" />
        </div>
    );
}

export default HeadingText;
