import Work from "@/models/Work";
import WorkView from "@/models/WorkView";
import dbConnect from "@/lib/dbConnect";
import { successResponse, errorResponse } from "@/utils/apiResponse";

/* ----------------- Get Work by ID ----------------- */
export async function GET(req, { params }) {
    try {
        await dbConnect();
        const id = params.id;

        const ip =
            req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
            req.ip ||
            "unknown";

        const work = await Work.findOne({ _id: id });
        if (!work) return errorResponse("Work not found", 404);

        const alreadyViewed = await WorkView.findOne({
            workId: work._id,
            ip,
            createdAt: { $gte: new Date(Date.now() - 5 * 60 * 1000) },
        });

        console.log("Already viewed:", alreadyViewed);

        if (!alreadyViewed) {
            await WorkView.create({ workId: work._id, ip });
            await Work.findByIdAndUpdate(work._id, { $inc: { views: 1 } });
            work.views += 1;
        }

        return successResponse(work, "Work fetched successfully");
    } catch (error) {
        console.error("Error fetching work:", error);
        return errorResponse("Failed to fetch work", 500, error.message);
    }
}
