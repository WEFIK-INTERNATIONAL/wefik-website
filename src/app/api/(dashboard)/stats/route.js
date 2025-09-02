import dbConnect from "@/lib/dbConnect";
import Job from "@/models/Job";
import Application from "@/models/Application";
import { successResponse, errorResponse } from "@/utils/apiResponse";

export async function GET(req) {
    try {
        await dbConnect();

        const stats = await Job.aggregate([
            // 1. Join applications to each job
            {
                $lookup: {
                    from: "applications",
                    localField: "jobId",
                    foreignField: "jobId",
                    as: "apps",
                },
            },

            // 2. Run multiple stats in parallel
            {
                $facet: {
                    totalJobs: [{ $count: "count" }],

                    jobStatus: [
                        {
                            $group: {
                                _id: "$status",
                                count: { $sum: 1 },
                            },
                        },
                    ],

                    totalApplications: [
                        { $unwind: "$apps" },
                        { $count: "count" },
                    ],

                    applicationsByStatus: [
                        { $unwind: "$apps" },
                        {
                            $group: {
                                _id: "$apps.status",
                                count: { $sum: 1 },
                            },
                        },
                    ],
                },
            },
        ]);

        return successResponse(stats, "Stats genarate successfully", 200);
    } catch (error) {
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}
