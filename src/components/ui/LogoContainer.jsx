import React, { forwardRef } from "react";
import { motion } from "framer-motion";

const LogoContainer = forwardRef(({ animate = false, ...props }, ref) => {
    // Define animation variants for the paths with the new brand color
    const pathVariants = {
        hidden: {
            pathLength: 0,
            fill: "rgba(57, 255, 20, 0)",
        },
        visible: {
            pathLength: 1,
            fill: "rgba(163, 230, 53, 1)",
        },
    };

    return (
        <svg
            ref={ref}
            version="1.1"
            viewBox="0 0 155.41 89.43"
            className="w-full h-full"
            style={{ enableBackground: "new 0 0 155.41 89.43" }}
            {...props}
        >
            <g>
                <motion.path
                    fill="none"
                    stroke="#A3E635"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M116.72,89.43l-1.61-0.92L75.3,65.68L37.2,86.14c-1.91,1.02-4.28,0.16-5.08-1.85L9.34,27.6L0.28,5.05
             C-1.11,1.59,3-1.46,5.91,0.86L60.8,44.65L82.4,61.87l32.83,26.37L116.72,89.43z"
                    variants={pathVariants}
                    initial="hidden"
                    animate={animate ? "visible" : "hidden"}
                    transition={{
                        pathLength: {
                            duration: 2,
                            ease: "easeInOut",
                            delay: 0.2,
                        },
                        fill: { duration: 1, ease: "easeOut", delay: 2.2 },
                    }}
                />
                <motion.path
                    fill="none"
                    stroke="#51731A"
                    strokeWidth="1"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M149.72,0.47c3.21-1.73,6.81,1.56,5.37,4.92l-13.3,31l-19.48,47.96c-0.99,2.44-4.08,3.19-6.08,1.48
             L91.49,64.67l-23.72-20.2L149.72,0.47z"
                    variants={pathVariants}
                    initial="hidden"
                    animate={animate ? "visible" : "hidden"}
                    transition={{
                        pathLength: {
                            duration: 2,
                            ease: "easeInOut",
                            delay: 0.4,
                        },
                        fill: { duration: 1, ease: "easeOut", delay: 2.4 },
                    }}
                />
            </g>
        </svg>
    );
});

export default LogoContainer;
