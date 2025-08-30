"use client";
import { useEffect } from "react";
import "locomotive-scroll/dist/locomotive-scroll.css";

export default function useLocoScroll(ref) {
    useEffect(() => {
        if (!ref.current) return;

        let scroll;

        (async () => {
            const LocomotiveScroll = (await import("locomotive-scroll"))
                .default;
            scroll = new LocomotiveScroll({
                el: ref.current,
                smooth: true,
                lerp: 0.1,
                multiplier: 1.2,
                smartphone: { smooth: true },
                tablet: { smooth: true },
            });
        })();

        return () => {
            if (scroll) scroll.destroy();
        };
    }, [ref]);
}
