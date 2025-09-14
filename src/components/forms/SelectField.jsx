"use client";
import React from "react";
import { ChevronDown } from "lucide-react";

export default function SelectField({
    label,
    options,
    className = "",
    ...props
}) {
    return (
        <div className={`space-y-2 ${className}`}>
            <label htmlFor={props.id || props.name} className="font-medium">
                {label}
            </label>
            <div className="relative">
                <select
                    {...props}
                    id={props.id || props.name}
                    className={`w-full border rounded-lg px-4 py-2 pr-10
                        focus:ring-1 focus:ring-[#9AE600] outline-none appearance-none [&::-ms-expand :hidden ${props.disabled ? "text-gray-700 cursor-not-allowed" : ""}`}
                    style={{
                        WebkitAppearance: "none", // ✅ Safari/Chrome
                        MozAppearance: "none", // ✅ Firefox
                        appearance: "none", // ✅ Modern browsers
                    }}
                >
                    <option value="">-- Select --</option>
                    {options.map((opt) => (
                        <option
                            key={opt.value || opt}
                            value={opt.value || opt}
                            disabled={opt.disabled}
                        >
                            {opt.label || opt}
                        </option>
                    ))}
                </select>
                <ChevronDown
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none"
                />
            </div>
        </div>
    );
}
