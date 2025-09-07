"use client";
import React from "react";
import { motion } from "framer-motion";
import { Bot, User } from "lucide-react";

function ChatMessage({ message, index }) {
    const isUser = message.role === "user";

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex items-start gap-3 group ${
                isUser ? "justify-end" : ""
            }`}
        >
            {!isUser && (
                <div
                    className="flex-shrink-0 bg-gray-800/80 backdrop-blur-sm rounded-full p-2.5 
                                   shadow-lg border border-lime-400/20"
                >
                    <Bot className="w-4 h-4 text-lime-400" />
                </div>
            )}

            <div className={`max-w-[85%] relative ${isUser ? "order-1" : ""}`}>
                <div
                    className={`p-4 rounded-2xl relative backdrop-blur-sm ${
                        isUser
                            ? "bg-gradient-to-r from-lime-500 to-lime-400 text-gray-900 rounded-br-md shadow-lg"
                            : "bg-gray-800/80 text-gray-100 rounded-bl-md border border-gray-700/50"
                    }`}
                >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                        {message.text}
                    </p>
                </div>

                {message.timestamp && (
                    <motion.p
                        className={`text-xs text-gray-500 mt-2 px-2 ${
                            isUser ? "text-right" : "text-left"
                        }`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        {message.timestamp}
                    </motion.p>
                )}
            </div>

            {isUser && (
                <div
                    className="flex-shrink-0 bg-gray-700/80 backdrop-blur-sm rounded-full p-2.5 
                                   shadow-lg border border-gray-600/50 order-2"
                >
                    <User className="w-4 h-4 text-gray-300" />
                </div>
            )}
        </motion.div>
    );
}

export default ChatMessage;
