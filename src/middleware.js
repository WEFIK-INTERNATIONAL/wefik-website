import { NextResponse } from "next/server";

export function middleware(req) {
    const token = false;
    const path = req.nextUrl.pathname;

    if (!token && path.startsWith("/admin")) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    if (token && path.startsWith("/login")) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/login"],
};
