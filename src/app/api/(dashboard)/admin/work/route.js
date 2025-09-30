import Work from "@/models/Work";
import dbConnect from "@/lib/dbConnect";
import imageKitService from "@/services/ImageKitServices";

import { successResponse, errorResponse } from "@/utils/apiResponse";

/* ----------------- Create Work ----------------- */
export async function POST(req) {
    try {
        await dbConnect();
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

        const uploadedImage = await imageKitService.uploadImage(image, "works");

        const workData = {
            ...data,
            images: {
                fileId: uploadedImage.fileId,
                url: uploadedImage.url,
                filename: uploadedImage.name,
                size: uploadedImage.size,
                mimeType: uploadedImage.fileType,
            },
        };

        const work = await Work.create(workData);

        return successResponse(work, "Work posted successfully", 201);
    } catch (error) {
        console.error("Error posting work:", error);
        return errorResponse("Failed to post work", 500, error.message);
    }
}

/* ----------------- Get Works ----------------- */

export async function GET(req) {
    try {
        await dbConnect();

        const { searchParams } = new URL(req.url);

        // Parse and validate page & limit
        const page = Math.max(parseInt(searchParams.get("page")) || 1, 1);
        const limit = Math.max(parseInt(searchParams.get("limit")) || 10, 1);
        const skip = (page - 1) * limit;

        // Search
        const search = (searchParams.get("search") || "").trim();
        const query = search
            ? { $or: [{ title: { $regex: search, $options: "i" } }] }
            : {};

        // Sort
        let sortParam = (searchParams.get("sort") || "-createdAt").trim();
        const sort = {};
        if (sortParam.startsWith("-")) {
            sort[sortParam.substring(1)] = -1;
        } else {
            sort[sortParam] = 1;
        }

        // Fetch data & total count in parallel
        const [data, total] = await Promise.all([
            Work.find(query).skip(skip).limit(limit).sort(sort),
            Work.countDocuments(query),
        ]);

        // Prepare pagination info
        const pages = Math.ceil(total / limit);

        return successResponse(
            {
                data,
                pagination: {
                    total,
                    page,
                    pages,
                    limit,
                },
            },
            "Job profiles fetched successfully",
            200
        );
    } catch (error) {
        console.error(error);
        return errorResponse("Internal Server Error", 500);
    }
}
