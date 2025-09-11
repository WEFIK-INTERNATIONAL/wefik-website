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
    currency: { type: String, default: "INR", trim: true },
});

// Skill schema
const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
});

// Main Job schema
const JobSchema = new mongoose.Schema(
    {
        jobId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        companyName: { type: String, required: true, trim: true, index: true },
        jobProfile: { type: String, required: true, trim: true, index: true },

        department: { type: String, required: true, trim: true },
        jobRole: { type: String, required: true, trim: true },

        description: { type: String, required: true, trim: true },
        location: { type: String, required: true, trim: true, index: true },
        type: {
            type: String,
            enum: ["Full-time", "Part-time", "Internship"],
            required: true,
            index: true,
        },

        compensationType: {
            type: String,
            enum: ["Paid", "Unpaid"],
            default: "Paid",
        },
        salary: SalarySchema,

        experienceLevel: {
            type: String,
            enum: ["0-1 years", "1-2 years", "1-3 years", "3-5 years", "5+ years"],
            default: "0-1 years",
        },
        education: { type: String, default: "Graduate" },
        openings: { type: Number, default: 1 },

        skills: [SkillSchema],

        contactEmail: { type: String, required: true },

        applicationDeadline: { type: Date ,required: true },

        status: {
            type: String,
            enum: ["Open", "Closed", "Draft"],
            default: "Open",
            index: true,
        },
    },
    { timestamps: true }
);

// 🔎 Index for text search
JobSchema.index({
    jobProfile: "text",
    description: "text",
    "skills.name": "text",
});

// Compound index
JobSchema.index({ location: 1, status: 1 });

export default mongoose.models.Job || mongoose.model("Job", JobSchema);
