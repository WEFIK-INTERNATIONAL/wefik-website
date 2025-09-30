import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    imageUrl: { type: String },
    status: { 
      type: String, 
      enum: ["Draft", "Published", "Archived"],
      default: "Draft" 
    },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
