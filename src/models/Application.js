import mongoose from "mongoose";

const CandidateInfoSchema = new mongoose.Schema({
    fullName: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        index: true,
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        match: [/^\+?[1-9]\d{7,14}$/, "Invalid phone number"],
    },

    address: { type: String, trim: true },
    country: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    pinCode: { type: String, trim: true },
});

const ResumeSchema = new mongoose.Schema({
    url: { type: String, required: true },
    filename: { type: String },
});

const SocialLinksSchema = new mongoose.Schema({
    github: {
        type: String,
        match: [/^https?:\/\/(www\.)?github\.com\/.+$/, "Invalid GitHub URL"],
    },
    linkedin: {
        type: String,
        match: [
            /^https?:\/\/(www\.)?linkedin\.com\/.+$/,
            "Invalid LinkedIn URL",
        ],
    },
    portfolio: { type: String, match: [/^https?:\/\/.+$/, "Invalid URL"] },
});

const EducationInfoSchema = new mongoose.Schema({
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
});

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
});

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
        },
        appliedAt: { type: Date, default: Date.now, index: true },
    },
    { timestamps: true }
);

ApplicationSchema.index({ status: 1 });
ApplicationSchema.index({ appliedAt: -1 });
ApplicationSchema.index(
    { jobId: 1, "candidateInfo.email": 1 },
    { unique: true }
);

export default mongoose.models.Application ||
    mongoose.model("Application", ApplicationSchema);
