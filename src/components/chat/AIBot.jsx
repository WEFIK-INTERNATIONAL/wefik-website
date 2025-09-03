"use client";
import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bot } from "lucide-react";
import axios from "axios";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import ChatToolTip from "./ChatToolTip";
import TypingIndicator from "./TypingIndicator";

function AIBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const scrollContainerRef = useRef(null);
    const pathname = usePathname();

    useEffect(() => {
        setIsOpen(false);
        setMessages([]);
        setIsMinimized(false);
        setShowTooltip(false);

        const timer = setTimeout(() => {
            setShowTooltip(true);
        }, 3000);

        const hideTimer = setTimeout(() => {
            setShowTooltip(false);
        }, 9000);

        return () => {
            clearTimeout(timer);
            clearTimeout(hideTimer);
        };
    }, [pathname]);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setIsTyping(true);
            setTimeout(() => {
                setMessages([
                    {
                        role: "model",
                        text: "Hey, I'm Neon, your friendly AI assistant! How can I help you today?",
                        timestamp: new Date().toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                        }),
                    },
                ]);
                setIsTyping(false);
            }, 1500);
        }
    }, [isOpen, messages.length]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    useEffect(() => {
        if (isOpen && !isMinimized && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen, isMinimized]);

    useEffect(() => {
        const container = scrollContainerRef.current;

        const handleWheel = (e) => {
            if (container && container.scrollHeight > container.clientHeight) {
                e.stopPropagation();
            }
        };

        if (isOpen && container) {
            container.addEventListener("wheel", handleWheel, {
                passive: false,
            });
        }

        return () => {
            if (container) {
                container.removeEventListener("wheel", handleWheel);
            }
        };
    }, [isOpen]);

    const clearChat = () => {
        setMessages([]);
        setTimeout(() => {
            setMessages([
                {
                    role: "model",
                    text: "Chat cleared! How can I help you today?",
                    timestamp: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                },
            ]);
        }, 300);
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const timestamp = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
        const userMessage = { role: "user", text: inputValue, timestamp };
        const updatedMessages = [...messages, userMessage];

        setMessages(updatedMessages);
        setInputValue("");
        setIsLoading(true);

        setTimeout(() => setIsTyping(true), 500);

        try {
            const res = await axios.post("/api/chat", {
                messages: updatedMessages,
            });
            const botResponse = res.data?.text;

            await new Promise((resolve) =>
                setTimeout(resolve, 1000 + Math.random() * 2000)
            );

            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                {
                    role: "model",
                    text: botResponse,
                    timestamp: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                },
            ]);
        } catch (error) {
            console.error("Chat API error:", error);
            setIsTyping(false);
            setMessages((prev) => [
                ...prev,
                {
                    role: "model",
                    text: "⚠️ Something went wrong. Please try again.",
                    timestamp: new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                    }),
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return (
        <>
            <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
                <ChatToolTip
                    showTooltip={showTooltip && !isOpen}
                    onOpen={() => setIsOpen(true)}
                    onHide={() => setShowTooltip(false)}
                />

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsOpen(!isOpen)}
                    className="relative bg-gradient-to-r from-lime-400 to-lime-500 text-gray-900 
                                     rounded-full p-4 shadow-xl hover:shadow-2xl
                                     transition-all duration-300 focus:outline-none focus:ring-4 
                                     focus:ring-lime-400/30 overflow-hidden group"
                >
                    <motion.div
                        className="absolute inset-0 bg-lime-400 opacity-30"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <Bot className="w-6 h-6 text-gray-900 relative z-10 group-hover:scale-110 transition-transform" />

                    <motion.div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full shadow-lg"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    />
                </motion.button>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{
                            opacity: 1,
                            y: 0,
                            scale: 1,
                            height: isMinimized ? "auto" : "65vh",
                        }}
                        exit={{ opacity: 0, y: 30, scale: 0.9 }}
                        transition={{
                            duration: 0.4,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                        className={`fixed bottom-20 right-5 w-[calc(100%-40px)] max-w-md 
                                     ${isMinimized ? "h-auto" : "h-[65vh]"} max-h-[750px] flex flex-col 
                                     bg-gray-900/95 backdrop-blur-2xl rounded-3xl shadow-2xl 
                                     border border-lime-300/20 z-40 overflow-hidden`}
                        style={{
                            boxShadow:
                                "0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(163, 230, 53, 0.1)",
                        }}
                    >
                        <ChatHeader
                            isTyping={isTyping}
                            isMinimized={isMinimized}
                            onMinimize={() => setIsMinimized(!isMinimized)}
                            onClose={() => setIsOpen(false)}
                            onClear={clearChat}
                            messageCount={messages.length}
                        />

                        {!isMinimized && (
                            <>
                                <div
                                    ref={scrollContainerRef}
                                    className="custom-scrollbar flex-1 p-4 space-y-4 bg-gradient-to-b from-transparent via-gray-900/10 to-gray-900/20 overflow-y-auto"
                                    style={{
                                        overflowY: "auto",
                                        overscrollBehavior: "contain",
                                        maxHeight: "100%",
                                    }}
                                >
                                    {messages.map((msg, index) => (
                                        <ChatMessage
                                            key={index}
                                            message={msg}
                                            index={index}
                                        />
                                    ))}

                                    <AnimatePresence>
                                        {isTyping && <TypingIndicator />}
                                    </AnimatePresence>

                                    <div ref={messagesEndRef} />
                                </div>

                                <ChatInput
                                    inputValue={inputValue}
                                    onInputChange={handleInputChange}
                                    onSubmit={handleSendMessage}
                                    isLoading={isLoading}
                                    inputRef={inputRef}
                                />
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default AIBot;
