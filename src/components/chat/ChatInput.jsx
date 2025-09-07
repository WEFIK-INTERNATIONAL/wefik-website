"use client";
import React from "react";
import { motion } from "framer-motion";
import { SendHorizonal } from "lucide-react";

function ChatInput({
    inputValue,
    onInputChange,
    onSubmit,
    isLoading,
    inputRef,
}) {
    return (
        <div
            className="flex-shrink-0 p-4 border-t border-lime-300/10 
                    bg-gradient-to-r from-gray-800/40 to-gray-900/40 backdrop-blur-sm"
        >
            <form onSubmit={onSubmit} className="space-y-2">
                <div className="flex items-center gap-3">
                    <div className="flex-1 relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={inputValue}
                            onChange={onInputChange}
                            placeholder="Ask me anything..."
                            className="w-full bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 
                                 rounded-2xl py-4 px-5 pr-16 text-white text-sm
                                 placeholder-gray-500 focus:outline-none 
                                 focus:ring-2 focus:ring-lime-400/50 focus:border-lime-400/50
                                 transition-all duration-300"
                            disabled={isLoading}
                            maxLength={500}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                            {inputValue.length}/500
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="bg-gradient-to-r from-lime-400 to-lime-500 text-gray-900 
                             rounded-2xl p-4 shadow-lg hover:shadow-xl
                             disabled:opacity-50 disabled:cursor-not-allowed 
                             hover:from-lime-300 hover:to-lime-400 transition-all duration-300
                             disabled:hover:scale-100"
                        disabled={isLoading || !inputValue.trim()}
                    >
                        <SendHorizonal className="w-5 h-5" />
                    </motion.button>
                </div>

                {/* Character counter warning */}
                {inputValue.length > 400 && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-yellow-400 px-2"
                    >
                        {500 - inputValue.length} characters remaining
                    </motion.p>
                )}
            </form>
        </div>
    );
}

export default ChatInput;
