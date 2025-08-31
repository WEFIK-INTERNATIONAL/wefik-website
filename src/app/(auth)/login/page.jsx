"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import API from "@/lib/axiosConfig";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await API.post("/login", formData);
            toast.success("Login successful ✅");
            router.push("/admin/dashboard");
        } catch (error) {
            console.error(error);
            toast.error(
                error.response?.data?.message ||
                    "Login failed. Please try again ❌"
            );
        } finally {
            setIsLoading(false);
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
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full p-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#9AE600]"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 rounded-md bg-white/10 border border-white/30 text-white placeholder-gray-300 focus:outline-none focus:ring-1 focus:ring-[#9AE600]"
                    value={formData.password}
                    onChange={handleChange}
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
