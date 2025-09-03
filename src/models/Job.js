import mongoose from "mongoose";

// Salary schema
const SalarySchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: function () {
            return this.paid;
        },
        min: [0, "Salary must be a positive number"],
    },
    currency: { type: String, default: "USD", trim: true },
});

// Requirement schema
const RequirementSchema = new mongoose.Schema({
    text: { type: String, required: true, trim: true },
});

// Skill schema (same style as Application)
const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
        default: "Beginner",
    },
});

// Main Job schema
const JobSchema = new mongoose.Schema(
    {
        jobID: {
            type: String,
            unique: true,
            index: true,
            default: () => "JOB-" + Math.floor(1000 + Math.random() * 9000),
        },
        title: { type: String, required: true, trim: true, index: true },
        description: { type: String, required: true, trim: true },
        location: { type: String, required: true, trim: true, index: true },
        type: {
            type: String,
            enum: ["Full-time", "Part-time", "Internship", "Contract"],
            required: true,
            index: true,
        },
        paid: { type: Boolean, default: true },
        salary: SalarySchema,
        requirements: [RequirementSchema],
        skills: [SkillSchema],
        postedAt: { type: Date, default: Date.now },
        status: {
            type: String,
            enum: ["Open", "Closed"],
            default: "Open",
            index: true,
        },
    },
    { timestamps: true }
);

// 🔎 Text index (title, description, skills.name)
JobSchema.index({
    title: "text",
    description: "text",
    "skills.name": "text",
});

// Compound index (for open jobs in a location)
JobSchema.index({ location: 1, status: 1 });

export default mongoose.models.Job || mongoose.model("Job", JobSchema);