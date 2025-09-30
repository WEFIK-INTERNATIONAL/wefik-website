import Job from "@/models/Job";
import dbConnect from "@/lib/dbConnect";
import { successResponse, errorResponse } from "@/utils/apiResponse";

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;

        const job = await Job.findOne({ jobId: id });

        if (!job) {
            return errorResponse("Job not found", 404);
        }

        return successResponse(job, "Successfully fetched the job", 200);
    } catch (error) {
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}
