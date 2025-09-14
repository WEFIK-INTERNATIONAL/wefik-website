import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    ArticleTitle: { type: String, required: true, trim: true },
    Category: { type: String, required: true },
    Author: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String }, // store uploaded file path or cloud URL
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
