"use client";

import React, { useRef } from "react";
import NavBar from "./navbar/NavBar";

export default function AppLayoutClient({ children }) {
  const contentRef = useRef(null);

  return (
    <>
      <NavBar contentRef={contentRef} />
      <div ref={contentRef}>{children}</div>
    </>
  );
}
