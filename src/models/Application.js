import mongoose from "mongoose";

const CandidateInfoSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true, trim: true, maxlength: 100 },

        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
            index: true,
        },

        phone: {
            type: String,
            required: true,
            trim: true,
            match: [/^\+?[1-9]\d{7,14}$/, "Invalid phone number"],
        },

        address: { type: String, trim: true, maxlength: 255 },
        country: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        pinCode: { type: String, trim: true, maxlength: 20 },
    },
    { _id: false }
);

const ResumeSchema = new mongoose.Schema(
    {
        fileId: { type: String, required: true },
        url: { type: String, required: true },
        filename: { type: String },
        size: { type: Number },
        mimeType: { type: String },
    },
    { _id: false }
);

const SocialLinksSchema = new mongoose.Schema(
    {
        github: {
            type: String,
            match: [
                /^https?:\/\/(www\.)?github\.com\/[A-Za-z0-9_-]+$/,
                "Invalid GitHub URL",
            ],
        },
        linkedin: {
            type: String,
            match: [
                /^https?:\/\/(www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+$/,
                "Invalid LinkedIn URL",
            ],
        },
        portfolio: { type: String, match: [/^https?:\/\/.+$/, "Invalid URL"] },
    },
    { _id: false }
);

const EducationInfoSchema = new mongoose.Schema(
    {
        degree: { type: String, required: true, trim: true },
        institution: { type: String, required: true, trim: true },
        fieldOfStudy: { type: String, trim: true },
        startDate: { type: Date },
        endDate: {
            type: Date,
            validate: {
                validator: function (v) {
                    return !this.startDate || !v || v >= this.startDate;
                },
                message: "End date must be after start date",
            },
        },
        grade: { type: String },
    },
    { _id: false }
);

const WorkExperienceSchema = new mongoose.Schema(
    {
        company: { type: String, trim: true },
        role: { type: String, trim: true },
        startDate: { type: Date },
        endDate: { type: Date },
        description: { type: String, trim: true, maxlength: 500 },
    },
    { _id: false }
);

const SkillSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true, maxlength: 50 },
        level: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
            default: "Beginner",
        },
    },
    { _id: false }
);

const ApplicationSchema = new mongoose.Schema(
    {
        jobId: {
            type: String,
            required: true,
            index: true,
        },
        jobTitle: { type: String, required: true, trim: true },

        candidateInfo: { type: CandidateInfoSchema, required: true },

        educationInfo: [EducationInfoSchema],
        workExperience: {
            type: [WorkExperienceSchema],
            required: false,
            default: [],
        },

        skills: [SkillSchema],

        resume: { type: ResumeSchema, required: true },
        socialLinks: SocialLinksSchema,

        status: {
            type: String,
            enum: [
                "Pending",
                "Reviewed",
                "Shortlisted",
                "Accepted",
                "Rejected",
            ],
            default: "Pending",
            index: true,
        },

        appliedAt: { type: Date, default: Date.now, index: true },
    },
    { timestamps: true }
);

// ✅ Indexes for performance
ApplicationSchema.index(
    { jobId: 1, "candidateInfo.email": 1 },
    { unique: true }
);
ApplicationSchema.index({ appliedAt: -1 });

export default mongoose.models.Application ||
    mongoose.model("Application", ApplicationSchema);
