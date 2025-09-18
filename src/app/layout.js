import "./globals.css";
import { ppNeueMontreal } from "./fonts";

import { Toaster } from "@/components/ui/sonner";
import AppLayoutClient from "@/components/common/AppLayoutClient";
import { ImageKitProvider } from "@/providers/ImageKitProvider";
import TanStackQueryProvider from "@/providers/TanStackQueryProvider";

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
                <AppLayoutClient>
                    <ImageKitProvider>
                        <TanStackQueryProvider>
                            {children}
                        </TanStackQueryProvider>
                    </ImageKitProvider>
                </AppLayoutClient>
                <Toaster position="top-right" richColors />
            </body>
        </html>
    );
}
