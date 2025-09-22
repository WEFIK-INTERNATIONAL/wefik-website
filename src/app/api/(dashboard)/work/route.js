import dbConnect from "@/lib/dbConnect";
import Work from "@/models/Work";
import { successResponse, errorResponse } from "@/utils/apiResponse";
import { uploadFiles } from "@/services/uploadService";

/* ----------------- Create Work ----------------- */
export async function POST(req) {
    try {
        await dbConnect();
        const form = await req.formData();

        const images = form.getAll("images");
        const data = JSON.parse(form.get("data"));

        let uploadedImages = [];
        if (images.length > 0) {
            const uploaded = await uploadFiles({
                files: images.length === 1 ? images[0] : images,
                fileCategory: "work",
            });

            // Normalize always into array
            const uploadedArray = Array.isArray(uploaded)
                ? uploaded
                : [uploaded];

            uploadedImages = uploadedArray.map((img) => ({
                fileId: img.fileId,
                url: img.url,
                filename: img.name,
                size: img.size,
                mimeType: img.fileType,
            }));
        }

        // ✅ Prepare workData
        const workData = {
            ...data,
            images: uploadedImages,
        };

        // ✅ Save in DB
        const work = await Work.create(workData);

        return successResponse(work, "Work created successfully", 201);
    } catch (error) {
        console.error("Error creating work:", error);
        return errorResponse("Failed to create work", 500, error.message);
    }
}

/* ----------------- Get Works ----------------- */
export async function GET(req) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);

        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;
        const search = searchParams.get("search") || "";
        const sort = searchParams.get("sort") || "-createdAt";

        const query = search
            ? { title: { $regex: search, $options: "i" } }
            : {};

        const works = await Work.find(query)
            .sort(sort)
            .skip((page - 1) * limit)
            .limit(limit);

        const total = await Work.countDocuments(query);

        return successResponse(
            { data: works, pagination: { total, page, limit } },
            "Works fetched successfully"
        );
    } catch (error) {
        console.error("Error fetching works:", error);
        return errorResponse("Failed to fetch works", 500, error.message);
    }
}
