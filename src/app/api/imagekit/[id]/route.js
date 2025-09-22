import { NextResponse } from "next/server";
import ImageKit from "imagekit";

const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

export async function DELETE(req, { params }) {
    const { id } = await params;

    if (!id) {
        return NextResponse.json(
            { success: false, message: "Missing fileId" },
            { status: 400 }
        );
    }

    try {
        const result = await imagekit.deleteFile(id);
        return NextResponse.json({
            success: true,
            message: "File deleted successfully",
            result,
        });
    } catch (error) {
        console.error("ImageKit delete error:", error); // 👈 log full error
        return NextResponse.json(
            { success: false, message: "Delete failed", details: error.message },
            { status: 500 }
        );
    }
}
