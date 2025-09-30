import mongoose from "mongoose";

const WorkViewSchema = new mongoose.Schema({
    workId: { type: mongoose.Schema.Types.ObjectId, ref: "Work" },
    ip: String,
    createdAt: { type: Date, default: Date.now, index: true },
});

// Optional: set TTL index (e.g., expire after 5 minutes)
// Each document will auto-delete after 5 minutes
WorkViewSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

export default mongoose.models.WorkView ||
    mongoose.model("WorkView", WorkViewSchema);
