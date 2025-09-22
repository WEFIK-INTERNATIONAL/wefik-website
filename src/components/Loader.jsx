import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const Loader = ({ size = 150 }) => {
    return (
        <div style={{ width: size, height: size }}>
            <DotLottieReact
                src="/assets/Loader.lottie"
                loop
                autoplay
                style={{ width: "100%", height: "100%" }}
            />
        </div>
    );
};

export default Loader;
