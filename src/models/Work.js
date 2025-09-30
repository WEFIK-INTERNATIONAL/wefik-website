import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        slug: { type: String, unique: true, trim: true },
        description: { type: String, required: true },
        category: { type: String, required: true },
        tags: [String],
        techStack: [String],
        projectLink: String,
        githubLink: String,
        images: {
            fileId: { type: String, required: true },
            url: { type: String, required: true },
            filename: String,
            size: Number,
            mimeType: String,
        },
        isFeatured: { type: Boolean, default: false },
        priority: {
            type: Number,
            min: 1,
            max: 5,
            default: 5,
        },
        status: {
            type: String,
            enum: ["draft", "public", "private"],
            default: "draft",
        },
        views: { type: Number, default: 0 },
    },
    { timestamps: true }
);

workSchema.pre("save", async function (next) {
    if (!this.slug) {
        let slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, "")
            .trim()
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-");

        let originalSlug = slug;
        let count = 1;
        while (await mongoose.models.Work.exists({ slug })) {
            slug = `${originalSlug}-${count}`;
            count++;
        }

        this.slug = slug;
    }
    next();
});

export default mongoose.models.Work || mongoose.model("Work", workSchema);
