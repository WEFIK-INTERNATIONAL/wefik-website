import dbConnect from "@/lib/dbConnect";
import Work from "@/models/Work";
import { successResponse, errorResponse } from "@/utils/apiResponse";

/* ----------------- Get Work by ID ----------------- */
export async function GET(req, { params }) {
    try {
        await dbConnect();
        const work = await Work.findById(params.id);
        if (!work) return errorResponse("Work not found", 404);

        return successResponse(work, "Work fetched successfully");
    } catch (error) {
        console.error("Error fetching work:", error);
        return errorResponse("Failed to fetch work", 500, error.message);
    }
}

/* ----------------- Update Work ----------------- */
export async function PATCH(req, { params }) {
    try {
        await dbConnect();
        const formData = await req.formData();

        const updateData = {};
        formData.forEach((value, key) => {
            updateData[key] = value;
        });

        const work = await Work.findByIdAndUpdate(params.id, updateData, {
            new: true,
        });

        if (!work) return errorResponse("Work not found", 404);

        return successResponse(work, "Work updated successfully");
    } catch (error) {
        console.error("Error updating work:", error);
        return errorResponse("Failed to update work", 500, error.message);
    }
}

/* ----------------- Delete Work ----------------- */
export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const work = await Work.findByIdAndDelete(params.id);

        if (!work) return errorResponse("Work not found", 404);

        return successResponse(null, "Work deleted successfully");
    } catch (error) {
        console.error("Error deleting work:", error);
        return errorResponse("Failed to delete work", 500, error.message);
    }
}
