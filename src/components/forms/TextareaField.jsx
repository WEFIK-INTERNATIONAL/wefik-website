"use client";
import React from "react";

const TextareaField = ({ label, className = "", ...props }) => {
    return (
        <div className={`space-y-2 ${className}`}>
            <label htmlFor={props.id} className="font-medium">
                {label}
            </label>
            <textarea
                {...props}
                rows="4"
                className="w-full border rounded-lg px-4 py-2 bg-gray-50 dark:bg-gray-950 focus:ring-1 focus:ring-[#9AE600] outline-none"
            />
        </div>
    );
};

export default TextareaField;
