import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export const useMenuAnimations = (contentRef) => {
  const overlayRef = useRef(null);
  const overlayContentRef = useRef(null);
  const mediaWrapperRef = useRef(null);
  const toggleLabelRef = useRef(null);
  const hamburgerRef = useRef(null);
  const menuLinksRef = useRef(null);
  const menuTagsRef = useRef(null);

  useGSAP(() => {
    gsap.set(overlayRef.current, {
      opacity: 1,
      clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
    });
    gsap.set(overlayContentRef.current, { y: "100%" });
    gsap.set(mediaWrapperRef.current, { opacity: 0 });

    gsap.set(menuLinksRef.current?.querySelectorAll("span") ?? [], {
      opacity: 0,
      y: "30%",
    });
    gsap.set(menuTagsRef.current?.querySelectorAll("span") ?? [], {
      opacity: 0,
      y: "30%",
    });
  }, []);

  const animateMenuOpen = () => {
    const tl = gsap.timeline();

    return tl
      .to(toggleLabelRef.current, {
        y: "-100%",
        duration: 0.4,
        ease: "power2.inOut",
      })
      .to(
        contentRef.current,
        { y: "100vh", duration: 0.8, ease: "power2.inOut" },
        0
      )
      .to(
        overlayRef.current,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.8,
          ease: "power2.inOut",
        },
        0
      )
      .to(
        overlayContentRef.current,
        { y: "0%", duration: 0.8, ease: "power2.inOut" },
        0
      )
      .to(mediaWrapperRef.current, { opacity: 1, duration: 0.4 }, 0.4)
      .to(
        menuLinksRef.current?.querySelectorAll("span") ?? [],
        {
          opacity: 1,
          y: "0%",
          stagger: 0.02,
          duration: 0.4,
          ease: "power2.out",
        },
        0.5
      )
      .to(
        menuTagsRef.current?.querySelectorAll("span") ?? [],
        {
          opacity: 1,
          y: "0%",
          stagger: 0.02,
          duration: 0.4,
          ease: "power2.out",
        },
        0.7
      );
  };

  const animateMenuClose = () => {
    const tl = gsap.timeline();

    return tl
      .to(menuLinksRef.current?.querySelectorAll("span") ?? [], {
        opacity: 0,
        y: "30%",
        stagger: { each: 0.01, from: "end" },
        duration: 0.3,
        ease: "power2.in",
      })
      .to(
        menuTagsRef.current?.querySelectorAll("span") ?? [],
        {
          opacity: 0,
          y: "30%",
          stagger: { each: 0.01, from: "end" },
          duration: 0.3,
          ease: "power2.in",
        },
        0
      )
      .to(mediaWrapperRef.current, { opacity: 0, duration: 0.4 }, 0.4)
      .to(
        overlayContentRef.current,
        { y: "100%", duration: 0.8, ease: "power2.inOut" },
        0.3
      )
      .to(
        overlayRef.current,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 0.8,
          ease: "power2.inOut",
        },
        0.3
      )
      .to(
        contentRef.current,
        { y: "0vh", duration: 0.8, ease: "power2.inOut" },
        0.3
      )
      .to(
        toggleLabelRef.current,
        { y: "0%", duration: 0.4, ease: "power2.inOut" },
        0.5
      );
  };

  return {
    refs: {
      overlayRef,
      overlayContentRef,
      mediaWrapperRef,
      toggleLabelRef,
      hamburgerRef,
      menuLinksRef,
      menuTagsRef,
    },
    animations: {
      animateMenuOpen,
      animateMenuClose,
    },
  };
};
