import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Role name is required"],
            trim: true,
        },
        code: {
            type: String,
            required: [true, "Role code is required"],
            trim: true,
            set: (val) => val?.toUpperCase(),
        },
    },
    { _id: false }
);

const JobProfileSchema = new mongoose.Schema(
    {
        department: {
            type: String,
            required: [true, "Department name is required"],
            trim: true,
        },
        code: {
            type: String,
            required: [true, "Department code is required"],
            trim: true,
            unique: true,
            set: (val) => val?.toUpperCase(),
        },
        roles: [RoleSchema],
    },
    { timestamps: true }
);

export default mongoose.models.JobProfile ||
    mongoose.model("JobProfile", JobProfileSchema);
