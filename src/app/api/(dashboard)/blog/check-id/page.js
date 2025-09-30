import dbConnect from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { errorResponse } from "@/utils/apiResponse";

export async function GET(req) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const blogId = searchParams.get("blogId");

    if (!blogId) {
      return new Response(
        JSON.stringify({ message: "blogId is required" }),
        { status: 400 }
      );
    }

    const blogExists = await Blog.exists({ blogId });

    return new Response(
      JSON.stringify({
        exists: !!blogExists,
        message: "Blog ID check completed",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in blog check-id route:", error);
    return errorResponse(error.message || "Error", 500);
  }
}
