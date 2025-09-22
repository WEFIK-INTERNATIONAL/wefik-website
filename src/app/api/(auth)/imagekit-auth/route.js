import { getUploadAuthParams } from "@imagekit/next/server";
import { successResponse, errorResponse } from "@/utils/apiResponse";

export async function GET() {
    try {
        const isAuthenticated = true;
        if (!isAuthenticated) {
            return errorResponse("Unauthorized: Please login first", 401);
        }

        if (
            !process.env.IMAGEKIT_PRIVATE_KEY ||
            !process.env.IMAGEKIT_PUBLIC_KEY
        ) {
            return errorResponse("ImageKit keys are not configured", 500);
        }

        const { token, expire, signature } = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
            publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        });

        return successResponse(
            {
                token,
                expire,
                signature,
                publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
            },
            "Auth parameters generated successfully",
            200
        );
    } catch (error) {
        console.error("ImageKit Auth Error:", error);
        return errorResponse(
            "Failed to generate ImageKit auth parameters",
            500,
            error?.message || null
        );
    }
}
