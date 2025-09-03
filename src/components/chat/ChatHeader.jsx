"use client";
import React from "react";
import { motion } from "framer-motion";
import { Bot, RefreshCw, Minimize2, X, Maximize2 } from "lucide-react";

function ChatHeader({
    isTyping,
    isMinimized,
    onMinimize,
    onClose,
    onClear,
    messageCount,
}) {
    return (
        <div
            className="flex-shrink-0 p-4 border-b border-lime-300/10 
                    bg-gradient-to-r from-gray-800/60 to-gray-900/60 backdrop-blur-sm"
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <motion.div
                            className="w-9 h-9 bg-gradient-to-r from-lime-400 to-lime-500 
                                  rounded-full flex items-center justify-center shadow-lg"
                            animate={isTyping ? { scale: [1, 1.05, 1] } : {}}
                            transition={{
                                duration: 1.5,
                                repeat: isTyping ? Infinity : 0,
                            }}
                        >
                            <Bot className="w-5 h-5 text-gray-900" />
                        </motion.div>
                        <motion.div
                            className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 
                                  border-2 border-gray-900 rounded-full"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-lime-400 tracking-wide">
                            Neon
                        </h3>
                        <motion.p
                            className="text-xs text-gray-400"
                            animate={isTyping ? { opacity: [0.5, 1, 0.5] } : {}}
                            transition={{
                                duration: 1,
                                repeat: isTyping ? Infinity : 0,
                            }}
                        >
                            {isTyping ? "Typing..." : "Online"}
                        </motion.p>
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClear}
                        className="text-gray-400 hover:text-lime-400 transition-colors p-2 rounded-lg
                              hover:bg-gray-700/50"
                        title="Clear chat"
                        disabled={messageCount === 0}
                    >
                        <RefreshCw size={16} />
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onMinimize}
                        className="text-gray-400 hover:text-lime-400 transition-colors p-2 rounded-lg
                              hover:bg-gray-700/50"
                        title={isMinimized ? "Expand" : "Minimize"}
                    >
                        {isMinimized ? (
                            <Maximize2 size={16} />
                        ) : (
                            <Minimize2 size={16} />
                        )}
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={onClose}
                        className="text-gray-400 hover:text-red-400 transition-colors p-2 rounded-lg
                              hover:bg-red-500/10"
                        title="Close"
                    >
                        <X size={16} />
                    </motion.button>
                </div>
            </div>
        </div>
    );
}

export default ChatHeader;
