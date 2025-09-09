import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    code: { type: String, required: true },
});

const JobProfileSchema = new mongoose.Schema(
    {
        department: { type: String, required: true },
        code: { type: String, required: true, unique: true },
        roles: [RoleSchema],
    },
    { timestamps: true }
);

JobProfileSchema.index({ code: 1, "roles.code": 1 }, { unique: true });

export default mongoose.models.JobProfile ||
    mongoose.model("JobProfile", JobProfileSchema);
