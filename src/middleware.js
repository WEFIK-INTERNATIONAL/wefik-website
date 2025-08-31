// middleware.js
import { NextResponse } from "next/server";
import cookieService from "@/services/CookieServices";

export function middleware(req) {
    const accessToken = req.cookies.get(cookieService.ACCESS_TOKEN_NAME)?.value;
    const path = req.nextUrl.pathname;

    // If no token and accessing protected route
    if (!accessToken && path.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (accessToken) {
        try {
            // Verify token using cookieService
            console.log("Hello");
            
            const decoded = cookieService.verifyAccessToken(accessToken);
            console.log("De", decoded);
            

            // Role-based access check
            if (path.startsWith("/admin") && decoded) {
                return NextResponse.redirect(new URL("/admin/dashboard", req.url));
            }

            // Prevent logged-in users from visiting login page
            if (path.startsWith("/login") && decoded) {
                return NextResponse.redirect(new URL("/", req.url));
            }

        } catch (err) {
            return;
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/login"],
};
