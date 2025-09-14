"use client";
import React from "react";

export default function InputField({ label, className = "", ...props }) {
    return (
        <div className={`space-y-2 ${className}`}>
            <label htmlFor={props.id || props.name} className="font-medium">
                {label}
            </label>
            <input
                {...props}
                id={props.id || props.name}
                className="w-full border rounded-lg px-4 py-2 focus:ring-1 focus:ring-[#9AE600] outline-none"
            />
        </div>
    );
}
