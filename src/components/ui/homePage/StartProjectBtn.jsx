"use client";
import { useState } from "react";
import ProjectFormModal from "./ProjectFormModal";
import { twMerge } from "tailwind-merge";
import RoundedButton from "../RoundedButton";

export default function StartProjectButton({ className }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={twMerge("cursor-pointer pointer-events-auto", className)}>
      <RoundedButton
        onClick={() => setOpen(true)}
        className="px-4 py-3 border-2 border-gray-300 rounded-full font-neue text-gray-500"
        backgroundColor={"#84cc16"}
      >
        Start a Project
      </RoundedButton>
      <ProjectFormModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
