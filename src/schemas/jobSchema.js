import * as z from "zod";

const SalarySchema = z.object({
    amount: z
        .string()
        .optional()
        .transform((val) => (val ? Number(val) : 0)),
    currency: z.string().default("INR"),
});

export const JobSchema = z.object({
    companyName: z.string().min(1, "Company Name is required"),
    jobProfile: z.string().optional(),
    jobId: z.string().optional(),
    department: z.string().optional(),
    jobRole: z.string().optional(),
    description: z.string().optional(),
    location: z.enum(["On-site", "Remote", "Hybrid"]).optional(),
    type: z.enum(["Internship", "Full-time", "Part-time"]).optional(),
    compensationType: z.enum(["Paid", "Unpaid"]).optional(),
    salary: SalarySchema,
    experienceLevel: z.string().optional(),
    openings: z
        .union([z.string(), z.number()])
        .optional()
        .transform((v) =>
            v === undefined || v === "" ? undefined : Number(v)
        ),
    education: z.string().optional(),
    skills: z.string().optional(),
    contactEmail: z.string().email("Invalid email address"),
    applicationDeadline: z.string().optional(),
    status: z.enum(["Open", "Closed"]).default("Open"),
});
