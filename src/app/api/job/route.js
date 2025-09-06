import dbConnect from "@/lib/dbConnect";
import Job from "@/models/Job";
import { successResponse, errorResponse } from "@/utils/apiResponse";

// POST -- Create a new job
export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();

        const job = await Job.create(body);

        return successResponse(
            job,
            "Job created successfully",
            201
        );
    } catch (error) {
        if (error.code === 11000) {
            return errorResponse("This job already exists", 400);
        }
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}

// GET -- Fetch all jobs
export async function GET(req) {
    try {
        await dbConnect();

        const jobs = await Job.find();
         
        return successResponse(
            jobs,
            "Jobs fetched successfully",
            200
        );
    } catch (error) {
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}
