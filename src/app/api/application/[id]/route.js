import dbConnect from "@/lib/dbConnect";
import Application from "@/models/Application";
import { successResponse, errorResponse } from "@/utils/apiResponse";

// PATCH -- Update application status
export async function PATCH(req, { params }) {
    try {
        await dbConnect();
        const body = await req.json();

        const application = await Application.findByIdAndUpdate(
            params.id,
            { status: body.status },
            { new: true }
        );

        if (!application) {
            return errorResponse("Application not found", 404);
        }

        return successResponse(application, "Update successful", 200);
    } catch (error) {
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}

// DELETE -- Delete an application
export async function DELETE(req, { params }) {
    try {
        await dbConnect();

        const application = await Application.findByIdAndDelete(params.id);

        if (!application) {
            return errorResponse("Application not found", 404);
        }

        return successResponse(null, "Deleted successfully", 200);
    } catch (error) {
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}
