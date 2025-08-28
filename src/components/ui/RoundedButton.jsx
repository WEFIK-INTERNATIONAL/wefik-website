"use client";
import React from "react";
import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";
import gsap from "gsap";
import Link from "next/link";

export default function RoundedButton({
  children,
  className,
  backgroundColor,
  href = "#",
  ...attributes
}) {
  const container = useRef(null);
  const circle = useRef(null);
  let timeline = useRef(null);
  let timeoutId = null;

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(
        circle.current,
        { top: "-25%", width: "150%", duration: 0.4, ease: "power3.in" },
        "enter"
      )
      .to(
        circle.current,
        { top: "-150%", width: "125%", duration: 0.25 },
        "exit"
      );
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeline.current.tweenFromTo("enter", "exit");
  };

  const manageMouseLeave = () => {
    timeoutId = setTimeout(() => {
      timeline.current.play();
    }, 300);
  };

  return (
    <div
      ref={container}
      className={twMerge(
        "relative w-fit flex items-center justify-center overflow-hidden cursor-pointer",
        className
      )}
      onMouseEnter={manageMouseEnter}
      onMouseLeave={manageMouseLeave}
      {...attributes}
    >
      <Link
        href={href}
        className="relative z-10 transition-[color] duration-400 ease-linear hover:text-white"
      >
        {children}
      </Link>
      <div
        ref={circle}
        style={{ backgroundColor }}
        className="absolute w-full h-[150%] rounded-full top-[100%]"
      ></div>
    </div>
  );
}
