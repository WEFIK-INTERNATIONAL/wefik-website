"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

function ChatToolTip({ showTooltip, onOpen, onHide }) {
    return (
        <AnimatePresence>
            {showTooltip && (
                <motion.div
                    initial={{ opacity: 0, y: 20, x: 10 }}
                    animate={{
                        opacity: 1,
                        y: 0,
                        x: 0,
                        transition: {
                            duration: 0.4,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        },
                    }}
                    exit={{
                        opacity: 0,
                        y: 15,
                        x: 5,
                        transition: {
                            duration: 0.3,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        },
                    }}
                    className="mb-3 px-4 py-3 bg-gradient-to-r from-gray-800/95 to-gray-900/95 
                          backdrop-blur-sm text-white text-sm rounded-xl shadow-xl
                          border border-lime-400/20 cursor-pointer relative overflow-hidden
                          hover:border-lime-400/40 transition-colors duration-300"
                    onClick={() => {
                        onOpen();
                        onHide();
                    }}
                >
                    {/* Animated background glow */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-lime-400/5 to-transparent"
                        animate={{ opacity: [0.5, 0.8, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    <div className="relative flex items-center gap-2">
                        <motion.span
                            className="text-lime-400"
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            💬
                        </motion.span>
                        <span className="font-medium">Need help? Ask Neon</span>
                    </div>

                    {/* Arrow pointer */}
                    <div
                        className="absolute -bottom-1 right-6 w-2 h-2 bg-gray-800 rotate-45 
                               border-r border-b border-lime-400/20"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default ChatToolTip;
