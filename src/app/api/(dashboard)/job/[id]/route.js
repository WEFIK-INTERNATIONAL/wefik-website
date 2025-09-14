import dbConnect from "@/lib/dbConnect";
import Job from "@/models/Job";
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

// PATCH -- Update job details
export async function PATCH(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        let body = await req.json();

        if (typeof body === "string") {
            body = { status: body };
        }

        const job = await Job.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        );

        if (!job) {
            return errorResponse("Job not found", 404);
        }

        return successResponse(job, "Job updated successfully", 200);
    } catch (error) {
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}

// DELETE -- Delete a job
export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;

        const job = await Job.findByIdAndDelete(id);

        if (!job) {
            return errorResponse("Job not found", 404);
        }

        return successResponse(null, "Job deleted successfully", 200);
    } catch (error) {
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}
