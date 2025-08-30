import React from "react";
import { SplitText } from "./SplitText";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU_LINKS = [
  { title: "Home", href: "/" },
  { title: "Agency", href: "/agency" },
  { title: "Expertise", href: "/expertise" },
  { title: "Work", href: "/work" },
  { title: "Contact", href: "/contact" },
];

export const MenuLinks = React.forwardRef(({ className = "" }, ref) => {
  const pathname = usePathname();

  return (
    <div
      ref={ref}
      className={`menu-col flex flex-col gap-4 md:flex-[3] text-black ${className}`}
    >
      {MENU_LINKS.map((link, i) => {
        const isActive = pathname === link.href;

        return (
          <div
            key={i}
            className="menu-link text-3xl md:text-5xl font-medium overflow-hidden"
          >
            <Link href={link.href}>
              {/* Outer wrapper handles underline */}
              <div className="relative inline-block group">
                {/* Text */}
                <SplitText text={link.title} />

                {/* Underline */}
                <div
                  className={`
                    absolute bottom-0 left-0 h-[2px] bg-lime-500 w-full
                    origin-left transform-gpu transition-transform duration-300 ease-out
                    ${
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    }
                  `}
                />
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
});

MenuLinks.displayName = "MenuLinks";
