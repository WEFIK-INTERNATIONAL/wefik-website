"use client";
import React from "react";
import { motion } from "framer-motion";
import { Bot } from "lucide-react";

function TypingIndicator() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-start gap-3"
        >
            <div
                className="flex-shrink-0 bg-gray-800/80 backdrop-blur-sm rounded-full p-2.5 
                       shadow-lg border border-lime-400/20"
            >
                <Bot className="w-4 h-4 text-lime-400" />
            </div>
            <div
                className="max-w-[85%] p-4 rounded-2xl bg-gray-800/80 text-gray-200 
                       rounded-bl-md border border-gray-700/50 backdrop-blur-sm"
            >
                <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="h-2 w-2 bg-lime-400 rounded-full"
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.5, 1, 0.5],
                                }}
                                transition={{
                                    duration: 1.2,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-400 font-medium">
                        Neon is thinking...
                    </span>
                </div>
            </div>
        </motion.div>
    );
}

export default TypingIndicator;
