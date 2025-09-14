import connectDB from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { successResponse, errorResponse } from "@/utils/apiResponse"; 

// POST -- Create a new blog
export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        const blog = await Blog.create(body);

        return successResponse(
            blog,
            "Blog created successfully",
            201
        );
    } catch (error) {
        if (error.code === 11000) {
            return errorResponse("This blog already exists", 400);
        }
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}

// GET -- Fetch all blogs
export async function GET(req) {
    try {
        await dbConnect();

        const blogs = await Blog.find();

        return successResponse(
            blogs,
            "Blogs fetched successfully",
            200
        );
    } catch (error) {
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}
