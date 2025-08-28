"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { MenuBar } from "./MenuBar";
import { MenuOverlay } from "./MenuOverlay";
import { useMenuAnimations } from "@/app/hooks/useMenuAnimations";

export default function NavBar({ contentRef }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const scrollYRef = useRef(0);
  const pathname = usePathname();

  const { refs, animations } = useMenuAnimations(contentRef);

  const lockScroll = () => {
    scrollYRef.current = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "relative";
  };

  const unlockScroll = () => {
    document.body.style.overflow = "";
    document.body.style.position = "";
    window.scrollTo(0, scrollYRef.current);
  };

  const toggleMenu = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (!isMenuOpen) {
      setIsMenuOpen(true);
      lockScroll();

      const tl = animations.animateMenuOpen();
      tl.eventCallback("onComplete", () => setIsAnimating(false));

      refs.hamburgerRef.current?.classList.add("active");
    } else {
      closeMenuWithAnimation();
    }
  };

  const closeMenuWithAnimation = () => {
    const tl = animations.animateMenuClose();
    tl.eventCallback("onComplete", () => {
      setIsAnimating(false);
      setIsMenuOpen(false);
      unlockScroll();
      refs.hamburgerRef.current?.classList.remove("active");
    });
  };

  useEffect(() => {
    if (isMenuOpen && !isAnimating) {
      setIsAnimating(true);
      closeMenuWithAnimation();
    }
  }, [pathname]);

  return (
    <nav className="fixed top-0 left-0 w-screen z-[10002] bg-white pointer-events-auto">
      <MenuBar
        isMenuOpen={isMenuOpen}
        toggleLabelRef={refs.toggleLabelRef}
        onToggleMenu={toggleMenu}
      />

      <MenuOverlay
        ref={refs.overlayRef}
        overlayContentRef={refs.overlayContentRef}
        mediaWrapperRef={refs.mediaWrapperRef}
        menuLinksRef={refs.menuLinksRef}
        menuTagsRef={refs.menuTagsRef}
      />
    </nav>
  );
}
