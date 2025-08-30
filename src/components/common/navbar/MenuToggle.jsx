"use client";
import React, { useRef, useEffect } from "react";
import { HamburgerIcon } from "./HamburgerIcon";
import gsap from "gsap";

export const MenuToggle = ({ isMenuOpen, toggleLabelRef, onToggle }) => {
  const labelWrapperRef = useRef(null);

  useEffect(() => {
    if (!toggleLabelRef.current || !labelWrapperRef.current) return;

    if (isMenuOpen) {
      gsap.to(toggleLabelRef.current, {
        opacity: 0,
        x: 20,
        duration: 0.25,
        ease: "power2.inOut",
      });

      gsap.to(labelWrapperRef.current, {
        width: 0,
        duration: 0.25,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(labelWrapperRef.current, {
        width: "auto",
        duration: 0.25,
        ease: "power2.inOut",
      });

      gsap.to(toggleLabelRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.25,
        ease: "power2.inOut",
        delay: 0.05,
      });
    }
  }, [isMenuOpen]);

  return (
    <div
      className="menu-toggle-icon flex items-center gap-4 cursor-pointer pointer-events-auto z-[10002]"
      onClick={onToggle}
    >
      <div
        ref={labelWrapperRef}
        className="menu-toggle-label overflow-hidden flex items-center justify-end"
        style={{ width: "auto" }}
      >
        <p ref={toggleLabelRef} className="font-neue text-xl">
          Menu
        </p>
      </div>
      <HamburgerIcon isMenuOpen={isMenuOpen} onClick={onToggle} />
    </div>
  );
};
