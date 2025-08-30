import React from "react";
import { MenuLogo } from "./MenuLogo";
import { MenuToggle } from "./MenuToggle";

export const MenuBar = ({ isMenuOpen, toggleLabelRef, onToggleMenu }) => (
    <div className="menu-bar fixed top-0 left-0 w-full p-6 flex justify-between items-center text-gray-400 z-[10000] pointer-events-none">
        <MenuLogo isMenuOpen={isMenuOpen} />
        <MenuToggle
            isMenuOpen={isMenuOpen}
            onToggle={onToggleMenu}
            toggleLabelRef={toggleLabelRef}
        />
    </div>
);
