"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import { toast } from "sonner";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {            
            toast.success("Login successful.");
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message ||
                    "Login failed. Please try again ❌"
            );
        }
    };

    return (
        <form
            onSubmit={handleLogin}
            className="backdrop-blur-sm bg-white/5 border border-white/10 p-8 rounded-md shadow-xl w-full"
        >
            <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>

            <div className="flex flex-col gap-4">
                <input
                    type="username"
                    placeholder="Username"
                    className="w-full p-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#9AE600]"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#9AE600]"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>

            <Button
                type="submit"
                disabled={isLoading}
                className="mt-6 w-full bg-[#9AE600] hover:bg-[#85c800] text-black py-3 rounded-md font-bold transition-all duration-300 shadow-md hover:shadow-lg hover:cursor-pointer"
            >
                {isLoading ? "Loading..." : "Login"}
            </Button>
        </form>
    );
}
