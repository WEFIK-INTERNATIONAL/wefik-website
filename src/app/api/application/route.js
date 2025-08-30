import dbConnect from "@/lib/dbConnect";
import Application from "@/models/Application";
import { successResponse, errorResponse } from "@/utils/apiResponse";

// POST -- Create a new application
export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();

        const application = await Application.create(body);

        return successResponse(
            application,
            "Application created successfully",
            201
        );
    } catch (error) {
        if (error.code === 11000) {
            return errorResponse("You already applied for this job", 400);
        }
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}

// GET -- Fetch all applications
export async function GET(req) {
    try {
        await dbConnect();

        const applications = await Application.find();
         
        return successResponse(
            applications,
            "Applications fetched successfully",
            200
        );
    } catch (error) {
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}

// GET -- Fetch all applications (with pagination)
// export async function GET(req) {
//     try {
//         await dbConnect();

//         const { searchParams } = new URL(req.url);
//         const page = parseInt(searchParams.get("page") || "1", 10);
//         const limit = parseInt(searchParams.get("limit") || "10", 10);
//         const skip = (page - 1) * limit;

//         const [applications, total] = await Promise.all([
//             Application.find({}).skip(skip).limit(limit),
//             Application.countDocuments(),
//         ]);

//         return successResponse(
//             {
//                 applications,
//                 pagination: {
//                     total,
//                     page,
//                     pages: Math.ceil(total / limit),
//                 },
//             },
//             "Applications fetched successfully",
//             200
//         );
//     } catch (error) {
//         return errorResponse(error.message || "Internal Server Error", 500);
//     }
// }
