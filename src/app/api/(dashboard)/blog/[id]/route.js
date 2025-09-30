import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { successResponse, errorResponse } from "@/utils/apiResponse";

// GET -- Fetch a single blog by blogId
export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;
        const blog = await Blog.findById(id);


        if (!blog) return errorResponse("Blog not found", 404);

        return successResponse(blog, "Successfully fetched the blog", 200);
    } catch (error) {
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}

// PATCH -- Update blog details by blogId
export async function PATCH(req, { params }) {
    try {
        await dbConnect();
        const { id } =  params;
        let body = await req.json();

        if (typeof body === "string") {
            body = { status: body };
        }

        const blog = await Blog.findByIdAndUpdate(
            id,
            {$set: body},
            { new: true, runValidators: true }
        );

        if (!blog) return errorResponse("Blog not found", 404);

        return successResponse(blog, "Blog updated successfully", 200);
    } catch (error) {
        console.error("PATCH error:", error);
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}


// DELETE -- Delete a blog by blogId
export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const { id } = params;

        const blog = await Blog.findOneAndDelete(id);

        if (!blog) return errorResponse("Blog not found", 404);

        return successResponse(null, "Blog deleted successfully", 200);
    } catch (error) {
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}
