// app/api/works/route.ts

import Work from "@/models/Work";
import dbConnect from "@/lib/dbConnect";
import { successResponse, errorResponse } from "@/utils/apiResponse";

/* ----------------- Get Works ----------------- */
export async function GET() {
    try {
        await dbConnect();

        const works = await Work.find({ status: "public" }).sort({
            isFeatured: -1,
            priority: -1,
            createdAt: -1,
        });

        return successResponse(works, "Works fetched successfully", 200);
    } catch (error) {
        console.error("Error fetching works:", error);
        return errorResponse("Failed to fetch works", 500, error.message);
    }
}
