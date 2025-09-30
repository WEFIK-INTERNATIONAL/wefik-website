import Work from "@/models/Work";
import dbConnect from "@/lib/dbConnect";
import imageKitService from "@/services/ImageKitServices";
import { successResponse, errorResponse } from "@/utils/apiResponse";

/* ----------------- Get Work by ID ----------------- */
export async function GET(req, { params }) {
    try {
        await dbConnect();
        const id = await params.id;
        const work = await Work.findById(id);
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
        const id = await params.id;

        const work = await Work.findById(id);
        if (!work) return errorResponse("Work not found", 404);

        const form = await req.formData();
        const entries = Array.from(form.entries());

        // Separate image
        const image = entries.find(([key]) => key === "imageFile")?.[1];

        // Build data
        const data = {};

        for (const [key, value] of entries) {
            if (key === "imageFile") continue;

            if (key.endsWith("[]")) {
                const cleanKey = key.slice(0, -2);
                if (!data[cleanKey]) data[cleanKey] = [];
                data[cleanKey].push(value);
            } else {
                data[key] = value;
            }
        }

        const updates = {};
        for (const key in data) {
            if (JSON.stringify(work[key]) !== JSON.stringify(data[key])) {
                updates[key] = data[key];
            }
        }

        console.log(image);

        if (image) {
            const uploadedImage = await imageKitService.uploadImage(
                image,
                "works"
            );
            const imageData = {
                fileId: uploadedImage.fileId,
                url: uploadedImage.url,
                filename: uploadedImage.name,
                size: uploadedImage.size,
                mimeType: uploadedImage.fileType,
            };

            updates.images = imageData;

            await imageKitService.deleteImage(work.images.fileId);
        }

        const updatedWork = await Work.findByIdAndUpdate(id, updates, {
            new: true,
        });
        return successResponse(updatedWork, "Work updated successfully");
    } catch (error) {
        console.error("Error updating work:", error);
        return errorResponse("Failed to update work", 500, error.message);
    }
}

/* ----------------- Delete Work ----------------- */
export async function DELETE(req, { params }) {
    try {
        await dbConnect();
        const id = await params.id;

        const work = await Work.findById(id);
        if (!work) return errorResponse("Work not found", 404);

        if (work.images && work.images.length > 0) {
            const fileIds = work.images
                .map((img) => img.fileId)
                .filter(Boolean);
            if (fileIds.length > 0) {
                await imageKitService.deleteImages(fileIds);
            }
        }

        await Work.findByIdAndDelete(id);

        return successResponse(null, "Work deleted successfully");
    } catch (error) {
        console.error("Error deleting work:", error);
        return errorResponse("Failed to delete work", 500, error.message);
    }
}
