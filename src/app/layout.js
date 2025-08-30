import BackgroundNoise from "@/components/common/BackgroundNoise";
import { ppNeueMontreal } from "./fonts";
import "./globals.css";
import AppLayoutClient from "@/components/common/AppLayoutClient";

export const metadata = {
    title: "Wefik - Real Life Genie Of Your Ideas",
    description:
        "Transform your ideas with WEFIK. We build websites, Shopify stores, WordPress sites, and provide branding, UI/UX, and social media services worldwide.",
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon.ico",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className={`${ppNeueMontreal.variable}`}>
            <body className="antialiased bg-black">
                <BackgroundNoise />
                <AppLayoutClient>{children}</AppLayoutClient>
            </body>
        </html>
    );
}
