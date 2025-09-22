import * as z from "zod";

export const workSchema = z.object({
    title: z.string().min(2, "Title must be at least 2 characters"),
    description: z.string().min(5, "Description must be at least 5 characters"),
    category: z.string().min(2, "Category is required"),
    projectLink: z.string().url().optional(),
    githubLink: z.string().url().optional(),
    techStack: z.string().optional(),
    tags: z.string().optional(),
    images: z
        .any()
        .refine((files) => files?.length >= 1, "At least 1 image is required")
        .refine((files) => files?.length <= 5, "Maximum 5 images allowed"),
    isFeatured: z.boolean().optional().default(false),
    priority: z.number().min(1).max(5).optional().default(5),
    status: z
        .enum(["draft", "published", "archived"])
        .optional()
        .default("draft"),
});
