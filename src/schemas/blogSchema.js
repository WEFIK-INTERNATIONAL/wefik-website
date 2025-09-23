import * as z from "zod";

export const BlogSchema = z.object({
  title: z.string().min(3, "Title is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  category: z.string().min(1, "Category is required"),
  author: z.string().min(1, "Author name is required"),
  status: z.enum(["Draft", "Published", "Archived"]).default("Draft"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
