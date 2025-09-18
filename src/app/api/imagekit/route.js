import { NextResponse } from "next/server";
import { uploadFile } from "@/services/uploadService";

export async function POST(req) {
    try {
        // 🔒 Auth check (replace with real JWT/session check)
        const isAuthenticated = true;
        if (!isAuthenticated) {
            return NextResponse.json(
                { success: false, message: "Unauthorized: Please login first" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const uploadResponse = await uploadFile(body);

        return NextResponse.json(
            {
                success: true,
                message: "File uploaded successfully",
                category: body.fileCategory,
                data: uploadResponse,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Upload Error:", error);
        return NextResponse.json(
            { success: false, message: error.message || "Upload failed" },
            { status: 400 }
        );
    }
}
