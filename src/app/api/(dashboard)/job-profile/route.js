import dbConnect from "@/lib/dbConnect";
import JobProfile from "@/models/JobProfile";
import { successResponse, errorResponse } from "@/utils/apiResponse";

export async function POST(req) {
    try {
        await dbConnect();
        const body = await req.json();
        const { department, code, roles } = body;

        // Check if department exists
        const existingDept = await JobProfile.findOne({ code });

        if (existingDept) {
            // Collect existing role codes and names
            const existingRoleCodes = existingDept.roles.map((r) => r.code);
            const existingRoleNames = existingDept.roles.map((r) =>
                r.name.toLowerCase()
            );

            // Find duplicates by either code or name
            const duplicates = roles.filter(
                (r) =>
                    existingRoleCodes.includes(r.code) ||
                    existingRoleNames.includes(r.name.toLowerCase())
            );

            if (duplicates.length > 0) {
                return errorResponse(
                    `Role(s) already exist: ${duplicates
                        .map((d) => d.name)
                        .join(", ")}`,
                    400
                );
            }

            // Add only unique new roles
            existingDept.roles.push(...roles);
            await existingDept.save();

            return successResponse(
                existingDept,
                "JobProfile updated successfully (roles added)",
                200
            );
        } else {
            // Create new department
            const newDept = await JobProfile.create({
                department,
                code,
                roles,
            });

            return successResponse(
                newDept,
                "JobProfile created successfully",
                201
            );
        }
    } catch (error) {
        console.error("❌ Error in JobProfile API:", error);
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}

export async function GET(req) {
    try {
        await dbConnect();
        const jobProfiles = await JobProfile.find();

        return successResponse(
            jobProfiles,
            "Successfully fetched Job-Profiles",
            200
        );
    } catch (error) {
        console.error("❌ Error in JobProfile API:", error);
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}
