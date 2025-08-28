import React from "react";

export const HamburgerIcon = ({ isMenuOpen, onClick }) => (
  <div
    className="relative w-12 h-12 flex flex-col justify-center items-center cursor-pointer outline-2 rounded-full"
    onClick={onClick}
  >
    <span
      className={`absolute w-6 h-[0.5px] transition-all duration-300 ease-in-out ${
        isMenuOpen ? "rotate-45 bg-black" : "-translate-y-1.5 bg-white"
      }`}
    />
    <span
      className={`absolute w-6 h-[0.5px] transition-all duration-300 ease-in-out ${
        isMenuOpen ? "-rotate-45 bg-black" : "translate-y-1.5 bg-white"
      }`}
    />
  </div>
);
