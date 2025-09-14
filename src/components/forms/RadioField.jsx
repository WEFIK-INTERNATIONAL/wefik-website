"use cleint"
import React from "react";

const RadioField = ({ label, options, name, value, onChange }) => {
    return (
        <div className="space-y-2">
            <span className="font-medium">{label}</span>
            <div className="flex gap-6">
                {options.map((opt) => (
                    <label key={opt.value} className="flex items-center gap-2">
                        <input
                            type="radio"
                            name={name}
                            value={opt.value}
                            checked={value === opt.value}
                            onChange={onChange}
                        />
                        {opt.label}
                    </label>
                ))}
            </div>
        </div>
    );
};

export default RadioField;
