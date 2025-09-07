import { NextResponse } from "next/server";
import cookieService from "@/services/CookieServices";

export async function middleware(req) {
    // const accessToken = req.cookies.get(cookieService.ACCESS_TOKEN_NAME)?.value;
    const accessToken= true;
    const path = req.nextUrl.pathname;

    if (!accessToken && path.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (accessToken) {
        try {
            const decoded =
                await cookieService.verifyAccessTokenEdge(accessToken);

            if (path === "/admin" && decoded) {
                return NextResponse.redirect(
                    new URL("/admin/dashboard", req.url)
                );
            }

            if (path.startsWith("/login") && decoded) {
                return NextResponse.redirect(new URL("/", req.url));
            }
        } catch (err) {
            return NextResponse.next();
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/login"],
};
