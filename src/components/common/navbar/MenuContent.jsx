import React from "react";
import { MenuLinks } from "./MenuLinks";
import { MenuTags } from "./MenuTags";
import { MenuFooter } from "./MenuFooter";
import StartProjectButton from "@/components/ui/homePage/StartProjectBtn";

export const MenuContent = ({ menuLinksRef, menuTagsRef }) => (
    <div className="menu-content-wrapper flex-3 relative flex pointer-events-auto font-neue">
        <div
            className="menu-content-main absolute top-1/3 md:top-1/2 left-1/2 
      -translate-x-1/2 -translate-y-1/3 md:-translate-y-1/2 
      flex gap-8 w-full md:w-3/4 p-8"
        >
            <MenuLinks ref={menuLinksRef} className="font-3xl" />
            <MenuTags ref={menuTagsRef} className="font-xl" />
        </div>
        <div className="absolute top-6 right-20 md:right-24 z-[999999] pointer-events-auto">
            <StartProjectButton
                backgroundColor={"#84cc16"}
                className={"text-gray-500"}
            />
        </div>

        <MenuFooter />
    </div>
);
