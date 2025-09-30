import * as z from "zod";

const SalarySchema = z.object({
    amount: z
        .union([z.string(), z.number()])
        .transform((val) => Number(val) || 0),
    currency: z.string().default("INR"),
});

export const JobSchema = z
    .object({
        companyName: z.string().min(1, "Company Name is required"),
        jobProfile: z.string().optional(),
        jobId: z.string().optional(),
        department: z.string().optional(),
        jobRole: z.string().min(1, "Job Role is required"),
        description: z.string().optional(),
        location: z.enum(["onsite", "remote", "hybrid"]).optional(),
        type: z.enum(["internship", "full-time", "part-time"]).optional(),
        compensationType: z.enum(["paid", "unpaid"]).optional(),
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
        status: z.enum(["open", "closed"]).default("open"),
    })
    .superRefine((data, ctx) => {
        if (
            data.compensationType === "paid" &&
            (!data.salary?.amount || data.salary.amount <= 0)
        ) {
            ctx.addIssue({
                path: ["salary", "amount"],
                message: "Salary must be greater than 0 for paid jobs",
                code: z.ZodIssueCode.custom,
            });
        }
    });
