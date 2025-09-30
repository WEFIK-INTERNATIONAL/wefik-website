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
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;
        const search = searchParams.get("search") || "";

        const skip = (page - 1) * limit;

        // 🔎 Search filter
        const query = search
            ? {
                  $or: [
                      { department: { $regex: search, $options: "i" } },
                      { roles: { $regex: search, $options: "i" } },
                  ],
              }
            : {};

        let dataQuery = JobProfile.find(query).sort({ department: 1 });

        // Apply pagination only if page & limit are passed
        if (page && limit) {
            const skip = (page - 1) * limit;
            dataQuery = dataQuery.skip(skip).limit(limit);
        }

        const [data, total] = await Promise.all([
            dataQuery,
            JobProfile.countDocuments(query),
        ]);

        return successResponse(
            {
                data,
                pagination: {
                    total,
                    page,
                    pages: Math.ceil(total / limit),
                    limit,
                },
            },
            "Job profiles fetched successfully",
            200
        );
    } catch (error) {
        console.error("❌ Error in JobProfile API:", error);
        return errorResponse(error.message || "Internal Server Error", 500);
    }
}
