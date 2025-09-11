import dbConnect from "@/lib/dbConnect";
import Job from "@/models/Job";
import { successResponse, errorResponse } from "@/utils/apiResponse";

// POST -- Create a new job
export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        const job = await Job.create(body);

        return successResponse(job, "Job created successfully", 201);
    } catch (error) {
        if (error.code === 11000) {
            return errorResponse("This job already exists", 400);
        }
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}

// GET -- Fetch jobs by pagination
export async function GET(req) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;
        const search = searchParams.get("search") || "";
        const sort = searchParams.get("sort") || "newest";

        const skip = (page - 1) * limit;        

        // 🔎 Search filter
        const query = search
            ? {
                  $or: [
                      { jobId: { $regex: search, $options: "i" } },
                      { jobTitle: { $regex: search, $options: "i" } },
                      { jobProfile: { $regex: search, $options: "i" } },
                      { location: { $regex: search, $options: "i" } },
                  ],
              }
            : {};

        // 📌 Sorting
        let sortBy = {};
        if (sort === "newest") sortBy = { createdAt: -1 };
        if (sort === "oldest") sortBy = { createdAt: 1 };

        const [data, total] = await Promise.all([
            Job.find(query).skip(skip).limit(limit).sort(sortBy),
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
            "Job profiles fetched successfully",
            200
        );
    } catch (error) {
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}
