import jwt from "jsonwebtoken";

class CookieService {
    constructor() {
        this.ACCESS_TOKEN_NAME =
            process.env.ACCESS_TOKEN_NAME || "access_token";
        this.REFRESH_TOKEN_NAME =
            process.env.REFRESH_TOKEN_NAME || "refresh_token";

        this.ACCESS_EXPIRES = parseInt(
            process.env.ACCESS_TOKEN_EXPIRES || "900", // 15m default
            10
        );
        this.REFRESH_EXPIRES = parseInt(
            process.env.REFRESH_TOKEN_EXPIRES || "604800", // 7d default
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

    // ========== SIGN TOKENS ==========
    signAccessToken = (payload) => {
        return jwt.sign(payload, this.ACCESS_SECRET, { expiresIn: "15m" });
    };

    signRefreshToken = (payload) => {
        return jwt.sign(payload, this.REFRESH_SECRET, { expiresIn: "7d" });
    };

    // ========== SET COOKIES ==========
    setAuthCookies = (cookieStore, accessToken, refreshToken) => {
        cookieStore.set(this.ACCESS_TOKEN_NAME, accessToken, {
            ...this.baseOpts,
            sameSite: "strict",
            maxAge: 60 * 15, // 15 minutes
        });

        cookieStore.set(this.REFRESH_TOKEN_NAME, refreshToken, {
            ...this.baseOpts,
            sameSite: "strict",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });
    };

    // ========== VERIFY TOKENS ==========
    verifyAccessToken = (token) => {
        try {
            return jwt.verify(token, this.ACCESS_SECRET);
        } catch (err) {
            return null;
        }
    };

    verifyRefreshToken = (token) => {
        try {
            return jwt.verify(token, this.REFRESH_SECRET);
        } catch (err) {
            return null;
        }
    };

    // ========== CLEAR COOKIES ==========
    clearAuthCookies = (cookieStore) => {
        cookieStore.delete(this.ACCESS_TOKEN_NAME);
        cookieStore.delete(this.REFRESH_TOKEN_NAME);
    };
}

const cookieService = new CookieService();
export default cookieService;
