import dbConnect from "@/lib/dbConnect";
import Job from "@/models/Job";
import JobProfile from "@/models/JobProfile";
import { successResponse, errorResponse } from "@/utils/apiResponse";

// GET -- Search jobs
export async function GET(req) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const search = searchParams.get("search") || "";
        const type = searchParams.get("type");
        const location = searchParams.get("location");
        const department = searchParams.get("department");

        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;
        const skip = (page - 1) * limit;

        // 🔎 Search + filters
        const query = {};

        if (search) {
            query.$or = [
                { jobId: { $regex: search, $options: "i" } },
                { jobProfile: { $regex: search, $options: "i" } },
                { jobRole: { $regex: search, $options: "i" } },
                { location: { $regex: search, $options: "i" } },
                { "skills.name": { $regex: search, $options: "i" } },
            ];
        }

        if (type) query.type = { $regex: `^${type}$`, $options: "i" };
        if (location)
            query.location = { $regex: `^${location}$`, $options: "i" };
        if (department) {
            const dept = await JobProfile.findOne({
                department: { $regex: `^${department}$`, $options: "i" },
            }).select("code");

            query.department = { $regex: `^${dept.code}$`, $options: "i" };
        }

        const [data, total] = await Promise.all([
            Job.find(query).skip(skip).limit(limit),
            Job.countDocuments(query),
        ]);

        return successResponse(
            {
                data,
                pagination: {
                    total,
                    page,
                    pages: Math.ceil(total / limit),
                    limit,
                },
            },
            "Jobs fetched successfully",
            200
        );
    } catch (error) {
        console.error(error);
        return errorResponse("Internal Server Error", 500);
    }
}
