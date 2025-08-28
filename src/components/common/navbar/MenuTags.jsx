import React from "react";
import { SplitText } from "./SplitText";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU_TAGS = [
  { title: "Career", href: "/career" },
  { title: "Blog", href: "/blog" },
];

export const MenuTags = React.forwardRef(({ className = "" }, ref) => {
  const pathname = usePathname();

  return (
    <div
      ref={ref}
      className={`menu-col font-neue italic flex flex-col gap-2 md:flex-[2] text-gray-500 justify-end text-xl md:text-2xl ${className}`}
    >
      {MENU_TAGS.map((tag, i) => {
        const isActive = pathname === tag.href;

        return (
          <div key={i} className="menu-tag overflow-hidden">
            <Link href={tag.href}>
              <div className="relative inline-block group">
                <SplitText text={tag.title} />
                <div
                  className={`
                    absolute bottom-0 left-0 h-[1px] bg-lime-500 w-full
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

MenuTags.displayName = "MenuTags";
