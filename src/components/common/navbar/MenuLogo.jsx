"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const MenuLogo = ({ isMenuOpen }) => {
  const logoRef = useRef(null);
  const textRef = useRef(null);
  const pathname = usePathname();

  const playStrokeDraw = () => {
    const paths = logoRef.current.querySelectorAll("path");

    gsap.set(paths, {
      strokeDasharray: 1000,
      strokeDashoffset: 1000,
      fill: "transparent",
    });

    gsap.to(paths, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: "power2.out",
      stagger: 0.2,
      onComplete: () => {
        gsap.to(paths, {
          fill: (i, t) => t.getAttribute("data-fill"),
          duration: 0.6,
          stagger: 0.1,
        });
      },
    });
  };

  useEffect(() => {
    playStrokeDraw();

    const logoElement = logoRef.current;
    logoElement.addEventListener("mouseenter", playStrokeDraw);

    return () => {
      logoElement.removeEventListener("mouseenter", playStrokeDraw);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      playStrokeDraw();

      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.6, ease: "power3.out" }
      );
    } else {
      gsap.to(textRef.current, {
        opacity: 0,
        x: -20,
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [isMenuOpen]);

  useEffect(() => {
    playStrokeDraw();
  }, [pathname]);

  return (
    <div className="menu-logo w-fit h-auto flex items-center justify-center cursor-pointer pointer-events-auto z-[10002]">
      <Link href="/" className="text-white flex items-center gap-3">
        <svg
          ref={logoRef}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 155.41 89.43"
          className="w-12 h-12"
        >
          <path
            d="M116.72,89.43l-1.61-0.92L75.3,65.68L37.2,86.14c-1.91,1.02-4.28,0.16-5.08-1.85L9.34,27.6L0.28,5.05
		        C-1.11,1.59,3-1.46,5.91,0.86L60.8,44.65L82.4,61.87l32.83,26.37L116.72,89.43z"
            stroke="#A3E635"
            strokeWidth="2"
            data-fill="#A3E635"
            fill="#A3E635"
          />
          <path
            d="M149.72,0.47c3.21-1.73,6.81,1.56,5.37,4.92l-13.3,31l-19.48,47.96c-0.99,2.44-4.08,3.19-6.08,1.48
		        L91.49,64.67l-23.72-20.2L149.72,0.47z"
            stroke="#51731A"
            strokeWidth="2"
            data-fill="#51731A"
            fill="#51731A"
          />
        </svg>

        <p
          ref={textRef}
          className="font-neue font-medium text-2xl text-black lg:text-white"
        >
          Wefik
        </p>
      </Link>
    </div>
  );
};
