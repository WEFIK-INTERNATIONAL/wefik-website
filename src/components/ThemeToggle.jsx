"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();

    return (
        <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="p-1 px-3 rounded hover:cursor-pointer"
        >
            {theme === "light" ? <Moon /> : <Sun />}
        </button>
    );
}
