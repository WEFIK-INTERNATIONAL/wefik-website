import User from "@/models/User";
import { cookies } from "next/headers";
import dbConnect from "@/lib/dbConnect";
import cookieService from "@/services/CookieServices";
import { successResponse, errorResponse } from "@/utils/apiResponse";

export async function POST(req) {
    try {
        await dbConnect();

        const cookieStore = await cookies();
        const { REFRESH_TOKEN_NAME } = cookieService.getCookieNames();
        const refreshToken = cookieStore.get(REFRESH_TOKEN_NAME)?.value;

        if (refreshToken) {
            const user = await User.findOne({ _id: refreshToken.id });
            if (user) {
                user.refreshToken = null;
                await user.save();
            }
        }

        cookieService.clearAuthCookies(cookieStore);

        return successResponse({}, "Logout successful");
    } catch (error) {
        return errorResponse("Server error", 500, error.message);
    }
}
