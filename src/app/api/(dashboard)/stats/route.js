import dbConnect from "@/lib/dbConnect";
import Job from "@/models/Job";
import Application from "@/models/Application"; // ✅ Import Application model
import { successResponse, errorResponse } from "@/utils/apiResponse";

export async function GET() {
    try {
        await dbConnect();

        // ✅ Total jobs
        const totalJobs = await Job.countDocuments();

        // ✅ Open / Closed jobs (case-insensitive just in case)
        const totalOpenJobs = await Job.countDocuments({
            status: { $regex: /^open$/i },
        });
        const totalClosedJobs = await Job.countDocuments({
            status: { $regex: /^closed$/i },
        });

        // ✅ Total applications
        const totalApplications = await Application.countDocuments();

        // ✅ Applications by status
        const applicationsByStatus = await Application.aggregate([
            {
                $group: {
                    _id: { $toLower: "$status" }, // normalize casing
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    status: "$_id",
                    count: 1,
                    _id: 0,
                },
            },
        ]);

        const stats = {
            totalJobs,
            totalOpenJobs,
            totalClosedJobs,
            totalApplications,
            applicationsByStatus,
        };

        return successResponse(stats, "Stats generated successfully", 200);
    } catch (error) {
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}
