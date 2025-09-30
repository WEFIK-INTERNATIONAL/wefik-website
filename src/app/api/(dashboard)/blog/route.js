import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { successResponse, errorResponse } from "@/utils/apiResponse";

// POST -- Create a new blog
export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();

        const blog = await Blog.create(body);

        return successResponse(blog, "Blog created successfully", 201);
    } catch (error) {
        if (error?.name === "ValidationError") {
            const messages = Object.values(error.errors || {})
                .map((e) => e.message)
                .join(", ");
            return errorResponse(messages || "Validation error", 400);
        }
        if (error?.code === 11000) {
            return errorResponse("This blog already exists", 409);
        }
        if (error instanceof SyntaxError) {
            return errorResponse("Invalid JSON payload", 400);
        }
        return errorResponse("Internal Server Error", 500);
    }
}

// GET -- Fetch blogs with pagination and search
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
                      { blogId: { $regex: search, $options: "i" } },
                      { title: { $regex: search, $options: "i" } },
                      { category: { $regex: search, $options: "i" } },
                      { author: { $regex: search, $options: "i" } },
                  ],
              }
            : {};

        // 📌 Sorting
        let sortBy = {};
        if (sort === "newest") sortBy = { createdAt: -1 };
        if (sort === "oldest") sortBy = { createdAt: 1 };

        const [data, total] = await Promise.all([
            Blog.find(query).skip(skip).limit(limit).sort(sortBy),
            Blog.countDocuments(query),
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
            "Blogs fetched successfully",
            200
        );
    } catch (error) {
        console.error(error);
        return errorResponse("Internal Server Error", 500);
    }
}
