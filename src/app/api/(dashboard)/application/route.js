import dbConnect from "@/lib/dbConnect";
import Application from "@/models/Application";
import { successResponse, errorResponse } from "@/utils/apiResponse";
import { uploadFile } from "@/services/uploadService";

// POST -- Create a new application
export async function POST(req) {
    try {
        await dbConnect();
        const form = await req.formData();

        const file = form.get("resume");
        const data = JSON.parse(form.get("data"));

        const existing = await Application.findOne({
            jobId: data.jobId,
            "candidateInfo.email": data.candidateInfo.email,
        });

        if (existing) {
            return errorResponse("You already applied for this job", 400);
        }

        const response = await uploadFile({
            file,
            fileCategory: "resume",
        });

        const body = {
            ...data,
            resume: {
                fileId: response.fileId,
                url: response.url,
                filename: response.filename,
                size: response.size,
                mimeType: response.mimeType,
            },
        };

        const application = await Application.create(body);

        return successResponse(
            application,
            "Application created successfully",
            201
        );
    } catch (error) {
        if (error.code === 11000) {
            return errorResponse("You already applied for this job", 400);
        }
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}

// GET -- Fetch all applications
export async function GET(req) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);
        const pageParam = Number.parseInt(searchParams.get("page") ?? "", 10);
        const limitParam = Number.parseInt(searchParams.get("limit") ?? "", 10);
        const page =
            Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;
        const limit =
            Number.isFinite(limitParam) && limitParam > 0 && limitParam <= 100
                ? limitParam
                : 10;
        const rawSearch = (searchParams.get("search") ?? "").trim();
        const search = rawSearch.slice(0, 100); // cap length to avoid pathological regex
        const sortInput = (searchParams.get("sort") ?? "newest").toLowerCase();
        const sort = sortInput === "oldest" ? "oldest" : "newest";
        const skip = (page - 1) * limit;

        // 🔎 Search filter
        const query = search
            ? {
                  $or: [
                      { jobId: { $regex: search, $options: "i" } },
                      { jobTitle: { $regex: search, $options: "i" } },
                      { jobProfile: { $regex: search, $options: "i" } },
                  ],
              }
            : {};

        // 📌 Sorting
        let sortBy = {};
        if (sort === "newest") sortBy = { createdAt: -1 };
        if (sort === "oldest") sortBy = { createdAt: 1 };

        const [data, total] = await Promise.all([
            Application.find(query).skip(skip).limit(limit).sort(sortBy),
            Application.countDocuments(query),
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
            "Applications fetched successfully",
            200
        );
    } catch (error) {
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}
