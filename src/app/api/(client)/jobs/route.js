import Job from "@/models/Job";
import JobProfile from "@/models/JobProfile";
import dbConnect from "@/lib/dbConnect";
import { successResponse, errorResponse } from "@/utils/apiResponse";

// GET -- Fetch jobs by pagination and filters
export async function GET(req) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);

        const page = Math.max(parseInt(searchParams.get("page")) || 1, 1);
        const limit = Math.min(parseInt(searchParams.get("limit")) || 5, 50);

        const search = searchParams.get("search")?.trim();
        const type = searchParams.get("type")?.trim();
        const location = searchParams.get("location")?.trim();
        const department = searchParams.get("department")?.trim();
        const sort = searchParams.get("sort") || "newest";

        const skip = (page - 1) * limit;

        // Base filter: exclude draft jobs
        const filters = [{ status: { $ne: "draft" } }];

        // Search filter
        if (search) {
            filters.push({
                $or: [
                    { jobId: { $regex: search, $options: "i" } },
                    { jobTitle: { $regex: search, $options: "i" } },
                    { jobProfile: { $regex: search, $options: "i" } },
                    { location: { $regex: search, $options: "i" } },
                ],
            });
        }

        // Optional type filter
        if (type) {
            filters.push({ type: { $regex: `^${type}$`, $options: "i" } });
        }

        // Optional location filter
        if (location) {
            filters.push({
                location: { $regex: `^${location}$`, $options: "i" },
            });
        }

        // Optional department filter
        if (department) {
            const dept = await JobProfile.findOne({
                department: { $regex: `^${department}$`, $options: "i" },
            }).select("code");

            if (dept) {
                filters.push({
                    department: { $regex: `^${dept.code}$`, $options: "i" },
                });
            }
        }

        // Combine filters with $and if more than one
        const query = filters.length > 1 ? { $and: filters } : filters[0];

        // Sorting
        const sortBy = sort === "oldest" ? { createdAt: 1 } : { createdAt: -1 };

        // Fetch data and total count in parallel
        const [jobs, total] = await Promise.all([
            Job.find(query).skip(skip).limit(limit).sort(sortBy),
            Job.countDocuments(query),
        ]);

        const jobProfiles = await JobProfile.find();

        return successResponse(
            {
                jobs,
                jobProfiles,
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
        console.error("Error fetching jobs:", error);
        return errorResponse("Internal Server Error", 500);
    }
}
