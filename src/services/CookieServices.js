import jwt from "jsonwebtoken";

class CookieService {
    constructor() {
        this.ACCESS_TOKEN_NAME =
            process.env.ACCESS_TOKEN_NAME || "access_token";
        this.REFRESH_TOKEN_NAME =
            process.env.REFRESH_TOKEN_NAME || "refresh_token";
        this.ACCESS_EXPIRES = parseInt(
            process.env.ACCESS_TOKEN_EXPIRES || "900",
            10
        );
        this.REFRESH_EXPIRES = parseInt(
            process.env.REFRESH_TOKEN_EXPIRES || "604800",
            10
        );

        this.ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
        this.REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

        this.baseOpts = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
        };
    }

    // ================== COOKIE METHODS ==================
    setAuthCookies(cookieStore, accessToken, refreshToken) {
        cookieStore.set(this.ACCESS_TOKEN_NAME, accessToken, {
            ...this.baseOpts,
            maxAge: this.ACCESS_EXPIRES,
        });
        cookieStore.set(this.REFRESH_TOKEN_NAME, refreshToken, {
            ...this.baseOpts,
            maxAge: this.REFRESH_EXPIRES,
        });
    }

    clearAuthCookies(cookieStore) {
        cookieStore.set(this.ACCESS_TOKEN_NAME, "", {
            ...this.baseOpts,
            maxAge: 0,
        });
        cookieStore.set(this.REFRESH_TOKEN_NAME, "", {
            ...this.baseOpts,
            maxAge: 0,
        });
    }

    getCookieNames() {
        return {
            ACCESS_TOKEN_NAME: this.ACCESS_TOKEN_NAME,
            REFRESH_TOKEN_NAME: this.REFRESH_TOKEN_NAME,
        };
    }

    // ================== JWT METHODS ==================
    signAccessToken(payload) {
        return jwt.sign(payload, this.ACCESS_SECRET, {
            expiresIn: this.ACCESS_EXPIRES,
        });
    }

    signRefreshToken(payload) {
        return jwt.sign(payload, this.REFRESH_SECRET, {
            expiresIn: this.REFRESH_EXPIRES,
        });
    }

    verifyAccessToken(token) {        
        return jwt.verify(token, this.ACCESS_SECRET);
    }

    verifyRefreshToken(token) {
        return jwt.verify(token, this.REFRESH_SECRET);
    }
}

const cookieService = new CookieService();
export default cookieService;
