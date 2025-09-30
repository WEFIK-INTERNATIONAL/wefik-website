import dbConnect from "@/lib/dbConnect";
import Application from "@/models/Application";
import { uploadFiles } from "@/services/uploadService";
import { successResponse, errorResponse } from "@/utils/apiResponse";

// POST -- apply for a job
export async function POST(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;

        const form = await req.formData();
        const file = form.get("resume");
        const data = JSON.parse(form.get("data"));

        const existing = await Application.findOne({
            jobId: id,
            "candidateInfo.email": data.candidateInfo.email,
        });

        if (existing) {
            return errorResponse("You already applied for this job", 400);
        }

        const response = await uploadFiles({
            files: file,
            fileCategory: "resume",
        });

        const body = {
            jobId: id,
            ...data,
            resume: {
                fileId: response.fileId,
                url: response.url,
                filename: response.filename,
                size: response.size,
                mimeType: response.mimeType,
            },
        };

        const application = await Application.create(body);

        return successResponse(
            application,
            "Successfully applied for the job",
            201
        );
    } catch (error) {
        if (error.code === 11000) {
            return errorResponse("You already applied for this job", 400);
        }
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}
