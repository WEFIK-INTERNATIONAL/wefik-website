"use client";
import { useState } from "react";
import ProjectFormModal from "./ProjectFormModal";
import { twMerge } from "tailwind-merge";
import RoundedButton from "../RoundedButton";

export default function StartProjectButton({ className, backgroundColor }) {
    const [open, setOpen] = useState(false);

    return (
        <div className={"cursor-pointer pointer-events-auto"}>
            <RoundedButton
                onClick={() => setOpen(true)}
                className={twMerge(
                    "px-4 py-3 border-2 border-gray-300 rounded-full font-neue",
                    className
                )}
                backgroundColor={backgroundColor}
            >
                Start a Project
            </RoundedButton>
            <ProjectFormModal open={open} onClose={() => setOpen(false)} />
        </div>
    );
}
