"use client";

import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import RichTextEditor from "./RichTextEditor";

import {
    useGetJobProfile,
    useCreateJob,
    useGenerateJobId,
    useUpdateJob,
} from "@/queries/jobs";

import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";
import FormRadio from "./components/FormRadio";

import { JobSchema } from "@/schemas/jobSchema";

/* ------------------ Constants ------------------ */
const DEPARTMENT_PLACEHOLDER = [
    { value: "none", label: "⚠️ Create Job Profile First" },
];
const JOB_TYPES = [
    { label: "Internship", value: "internship" },
    { label: "Full-time", value: "full-time" },
    { label: "Part-time", value: "part-time" },
];
const LOCATIONS = [
    { label: "On-site", value: "onsite" },
    { label: "Remote", value: "remote" },
    { label: "Hybrid", value: "hybrid" },
];
const COMPENSATION = [
    { label: "Paid", value: "paid" },
    { label: "Unpaid", value: "unpaid" },
];
const EXPERIENCE_LEVELS = [
    { label: "0-1 years", value: "0-1 years" },
    { label: "1-2 years", value: "1-2 years" },
    { label: "1-3 years", value: "1-3 years" },
    { label: "3-5 years", value: "3-5 years" },
    { label: "5+ years", value: "5+ years" },
];
const EDUCATION = [
    { label: "Graduate", value: "graduate" },
    { label: "B.E/B.Tech", value: "b.e/b.tech" },
    { label: "B.Sc", value: "b.sc" },
    { label: "Masters", value: "masters" },
];

/* ------------------ Utils ------------------ */
const formatJobForEdit = (job) => {
    if (!job) return {};

    return {
        salary: {
            amount: job.salary?.amount ?? 0,
            currency: job.salary?.currency || "INR",
        },
        skills: job.skills
            ? typeof job.skills === "string"
                ? job.skills
                : job.skills
                      .map((s) => (typeof s === "string" ? s : s.name))
                      .join(", ")
            : "",
        applicationDeadline: job.applicationDeadline
            ? new Date(job.applicationDeadline).toISOString().split("T")[0]
            : "",
        status:
            job.status && ["open", "closed"].includes(job.status)
                ? job.status
                : "open",
    };
};

/* ------------------ Component ------------------ */
export default function JobPostForm({ job = null }) {
    const router = useRouter();

    const { mutate: generateJobId } = useGenerateJobId();
    const { data: jobProfiles = [], isLoading } = useGetJobProfile();
    const { mutate: createJob, isPending: isCreating } = useCreateJob();
    const { mutate: updateJob, isPending: isUpdating } = useUpdateJob();

    /* ------------------ Default Values ------------------ */
    const defaultValues = useMemo(
        () => ({
            companyName: job?.companyName || "Wefik",
            jobProfile: job?.jobProfile || "",
            jobId: job?.jobId || "",
            department: job?.department || "",
            jobRole: job?.jobRole || "",
            description: job?.description || "",
            location: job?.location || "",
            type: job?.type || "",
            compensationType: job?.compensationType || "",
            salary: {
                amount: job?.salary?.amount ?? 0,
                currency: job?.salary?.currency || "INR",
            },
            experienceLevel: job?.experienceLevel || "",
            openings: job?.openings ?? undefined,
            education: job?.education || "",
            skills: job?.skills
                ? typeof job.skills === "string"
                    ? job.skills
                    : job.skills
                          .map((s) => (typeof s === "string" ? s : s.name))
                          .join(", ")
                : "",
            contactEmail: job?.contactEmail || "",
            applicationDeadline: job?.applicationDeadline
                ? new Date(job.applicationDeadline).toISOString().split("T")[0]
                : "",
            status:
                job?.status && ["open", "closed"].includes(job.status)
                    ? job.status
                    : "open",
        }),
        [job]
    );

    /* ------------------ React Hook Form ------------------ */
    const form = useForm({
        resolver: zodResolver(JobSchema),
        defaultValues,
    });

    const { watch, setValue, handleSubmit, control, reset } = form;
    const formData = watch();

    /* ------------------ Reset on edit ------------------ */
    useEffect(() => {
        reset(defaultValues);
    }, [defaultValues, reset]);

    /* ------------------ Roles for department ------------------ */
    const roles =
        jobProfiles?.data?.find((d) => d.code === formData.department)?.roles ||
        [];

    /* ------------------ Generate Job ID ------------------ */
    useEffect(() => {
        if (formData.jobRole && !job) {
            const roleName =
                roles.find((r) => r.code === formData.jobRole)?.name || "";
            setValue("jobProfile", roleName);
            setValue("jobId", "Generating...");

            generateJobId(formData.jobRole, {
                onSuccess: (newId) => setValue("jobId", newId),
                onError: () => {
                    toast.error("Failed to generate Job ID");
                    setValue("jobId", "");
                },
            });
        }
    }, [formData.jobRole, job, roles, generateJobId, setValue]);

    /* ------------------ Auto-adjust salary for unpaid ------------------ */
    useEffect(() => {
        if (formData.compensationType === "unpaid") {
            setValue("salary.amount", 0);
        }
    }, [formData.compensationType, setValue]);

    /* ------------------ Submit ------------------ */
    const handleFormSubmit = async (values) => {
        const payload = {
            ...values,
            salary: {
                amount:
                    values.compensationType === "paid"
                        ? Number(values.salary.amount) || 0
                        : 0,
                currency: values.salary.currency || "INR",
            },
            skills: values.skills
                ? values.skills
                      .split(",")
                      .map((s) => ({ name: s.trim() }))
                      .filter((s) => s.name)
                : [],
            applicationDeadline: values.applicationDeadline
                ? new Date(values.applicationDeadline)
                : null,
        };

        if (!values.jobRole || !values.contactEmail) {
            toast.error("Job Role and Contact Email are required.");
            return;
        }

        if (job) {
            updateJob({ id: job._id, data: payload });
            router.push("/admin/dashboard/jobs");
        } else {
            createJob(payload);
        }
    };

    /* ------------------ Render ------------------ */
    return (
        <Form {...form}>
            <form
                onSubmit={handleSubmit(handleFormSubmit)}
                noValidate
                className="space-y-6"
            >
                <div className="grid md:grid-cols-2 gap-x-6 gap-y-6">
                    {/* Company Info */}
                    <div className="col-span-2 grid md:grid-cols-3 gap-5">
                        <FormInput
                            form={form}
                            name="companyName"
                            label="Company Name"
                            placeholder="e.g. Wefik Solutions"
                        />
                        <FormInput
                            form={form}
                            name="jobProfile"
                            label="Job Profile"
                            placeholder="e.g. Web Developer"
                            readOnly
                        />
                        <FormInput
                            form={form}
                            name="jobId"
                            label="Job ID"
                            placeholder="e.g. ENG-WEB-2025-0021"
                            readOnly
                        />
                    </div>

                    {/* Department & Role */}
                    <FormSelect
                        form={form}
                        name="department"
                        label="Department"
                        options={
                            jobProfiles?.data?.length > 0
                                ? jobProfiles.data.map((d) => ({
                                      value: d.code,
                                      label: d.department,
                                  }))
                                : DEPARTMENT_PLACEHOLDER
                        }
                    />
                    <FormSelect
                        form={form}
                        name="jobRole"
                        label="Job Role"
                        options={roles.map((r) => ({
                            value: r.code,
                            label: r.name,
                        }))}
                        disabled={!formData.department}
                    />

                    {/* Type & Location */}
                    <FormSelect
                        form={form}
                        name="type"
                        label="Job Type"
                        options={JOB_TYPES}
                    />
                    <FormSelect
                        form={form}
                        name="location"
                        label="Location"
                        options={LOCATIONS}
                    />

                    {/* Compensation */}
                    <FormRadio
                        form={form}
                        name="compensationType"
                        label="Compensation Type"
                        options={COMPENSATION}
                    />
                    <FormInput
                        form={form}
                        name="salary.amount"
                        label="Salary / Stipend"
                        placeholder="e.g. ₹10,000 per month"
                        disabled={formData.compensationType === "unpaid"}
                    />

                    {/* Experience, Openings, Deadline */}
                    <FormSelect
                        form={form}
                        name="experienceLevel"
                        label="Experience Level"
                        options={EXPERIENCE_LEVELS}
                    />
                    <FormInput
                        form={form}
                        name="openings"
                        label="Number of Openings"
                        placeholder="e.g. 10"
                        type="number"
                        min={1}
                    />
                    <FormInput
                        form={form}
                        name="applicationDeadline"
                        label="Application Deadline"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                    />
                    <FormSelect
                        form={form}
                        name="education"
                        label="Education"
                        options={EDUCATION}
                    />

                    {/* Contact & Skills */}
                    <FormInput
                        form={form}
                        name="contactEmail"
                        label="Contact Email"
                        placeholder="hr@company.com"
                        className="md:col-span-2"
                    />
                    <FormInput
                        form={form}
                        name="skills"
                        label="Required Skills (Comma separated)"
                        placeholder="e.g. React, Node.js, SQL"
                        className="md:col-span-2"
                    />

                    {/* Description */}
                    <div className="col-span-2">
                        <Controller
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <RichTextEditor
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            )}
                        />
                    </div>

                    {/* Submit */}
                    <div className="md:col-span-2 flex justify-end gap-4">
                        <Button
                            type="submit"
                            disabled={isCreating || isUpdating}
                            className="px-8 py-2 rounded-lg hover:cursor-pointer"
                        >
                            {job
                                ? isUpdating
                                    ? "Updating..."
                                    : "Update Job"
                                : isCreating
                                  ? "Posting..."
                                  : "Post Job"}
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
}
