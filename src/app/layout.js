import "./globals.css";
import { ppNeueMontreal } from "./fonts";
import AppLayoutClient from "@/components/common/AppLayoutClient";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
    title: "Wefik - Real Life Genie Of Your Ideas",
    description:
        "Transform your ideas with WEFIK. We build websites, Shopify stores, WordPress sites, and provide branding, UI/UX, and social media services worldwide.",
    icons: "/favicon.ico",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={ppNeueMontreal.variable}>
            <body className="antialiased">
                <AppLayoutClient>{children}</AppLayoutClient>
                <Toaster position="top-right" richColors />
            </body>
        </html>
    );
}
