import bcrypt from "bcryptjs";
import User from "@/models/User";
import { cookies } from "next/headers";
import dbConnect from "@/lib/dbConnect";
import cookieService from "@/services/CookieServices";
import { successResponse, errorResponse } from "@/utils/apiResponse";

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        const { username, password } = body;

        if (!username || !password) {
            return errorResponse("Username and Password required", 400);
        }

        const user = await User.findOne({ username });
        if (!user) {
            return errorResponse("Invalid credentials", 401);
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return errorResponse("Invalid credentials", 401);
        }

        const payload = {
            id: user._id.toString(),
            username: user.username,
            role: user.role,
        };

        const accessToken = cookieService.signAccessToken(payload);
        const refreshToken = cookieService.signRefreshToken(payload);

        user.refreshToken = refreshToken;
        await user.save();

        const cookieStore = await cookies();
        cookieService.setAuthCookies(cookieStore, accessToken, refreshToken);

        return successResponse(
            {
                accessToken,
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role,
                },
            },
            "Login successful"
        );
    } catch (error) {
        return errorResponse("Server error", 500, error.message);
    }
}
