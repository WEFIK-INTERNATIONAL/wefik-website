import dbConnect from "@/lib/dbConnect";
import Job from "@/models/Job";
import { successResponse, errorResponse } from "@/utils/apiResponse";

export async function GET(req) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const jobId = searchParams.get("jobId");

        if (!jobId) {
            return new Response(
                JSON.stringify({ message: "jobId is required" }),
                {
                    status: 400,
                }
            );
        }

        const jobExists = await Job.exists({ jobId });

        return new Response(
            JSON.stringify({
                exists: !!jobExists,
                message: "Job ID check completed",
            }),
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in check-id route:", error);
        return errorResponse(error.message || "Error", 500);
    }
}
