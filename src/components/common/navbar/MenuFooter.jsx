import React from "react";

export const MenuFooter = () => (
    <div className="menu-footer absolute bottom-16 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-8 w-full md:w-3/4 p-8 text-gray-500 font-neue text-sm md:text-xl">
        <div className="menu-col flex flex-col gap-1">
            <p>Real life Genie of Your idea</p>
        </div>
        <div className="menu-col flex flex-col gap-1">
            <a href="tel:+919609653522">+91 9609653522</a>
            <a href="mailto:info@wefik.in">info@wefik.in</a>
        </div>
    </div>
);
