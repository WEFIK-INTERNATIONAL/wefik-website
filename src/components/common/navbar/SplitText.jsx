import React from "react";

export const SplitText = ({ text }) => (
  <span className="inline-block overflow-hidden font-neue">
    {text.split("").map((char, i) => (
      <span
        key={i}
        className="inline-block opacity-0 translate-y-[30%] font-neue"
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ))}
  </span>
);
