"use client";

import React, { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
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

export default function JobPostForm({ job = null }) {
    const router = useRouter();
    const { mutate: generateJobId } = useGenerateJobId();
    const { data: jobProfiles = [], isLoading } = useGetJobProfile();
    const { mutate: createJob, isPending: isCreating } = useCreateJob();
    const { mutate: updateJob, isPending: isUpdating } = useUpdateJob();

    const normalizeJob = (j) => {
        if (!j) return {};
        return {
            ...j,
            salary: j.salary || { amount: "", currency: "INR" },
            skills: j.skills
                ? j.skills
                      .map((s) => (typeof s === "string" ? s : s.name))
                      .join(", ")
                : "",
            applicationDeadline: j.applicationDeadline
                ? new Date(j.applicationDeadline).toISOString().split("T")[0]
                : "",
        };
    };

    const defaultValues = useMemo(
        () => ({
            companyName: "Wefik",
            jobProfile: "",
            jobId: "",
            department: "",
            jobRole: "",
            description: "",
            location: "",
            type: "",
            compensationType: "",
            salary: { amount: "", currency: "INR" },
            experienceLevel: "",
            openings: "",
            education: "",
            skills: "",
            contactEmail: "",
            applicationDeadline: "",
            status: "Open",
            ...normalizeJob(job),
        }),
        [job]
    );

    const form = useForm({
        resolver: zodResolver(JobSchema),
        defaultValues,
    });

    const { watch, setValue, handleSubmit, control } = form;
    const formData = watch();

    const roles =
        jobProfiles.find((d) => d.code === formData.department)?.roles || [];

    useEffect(() => {
        if (formData.jobRole && !job) {
            setValue(
                "jobProfile",
                roles.find((r) => r.code === formData.jobRole)?.name || ""
            );
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

    const onSubmit = (values) => {
        if (!values.jobRole || !values.contactEmail) {
            toast.error("Job Role and Contact Email are required.");
            return;
        }

        const payload = {
            ...values,
            salary: {
                amount:
                    values.compensationType === "Paid"
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

        if (job) {
            updateJob({ id: job._id, data: payload });
            router.push("/admin/dashboard/jobs");
        } else {
            createJob(payload);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-x-6 gap-y-6">
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
                            placeholder="Job Profile"
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

                    <FormSelect
                        form={form}
                        name="department"
                        label="Department"
                        options={
                            jobProfiles.length > 0
                                ? jobProfiles.map((d) => ({
                                      value: d.code,
                                      label: d.department,
                                  }))
                                : [
                                      {
                                          value: "none",
                                          label: "⚠️ Create Job Profile First",
                                      },
                                  ]
                        }
                        className="w-full"
                    />

                    <FormSelect
                        form={form}
                        name="jobRole"
                        label="Job Role"
                        options={roles.map((r) => ({
                            value: r.code,
                            label: r.name,
                        }))}
                        disabled={!formData.department || job}
                        className="w-full"
                    />

                    <FormSelect
                        form={form}
                        name="type"
                        label="Job Type"
                        options={[
                            { label: "Internship", value: "Internship" },
                            { label: "Full-time", value: "Full-time" },
                            { label: "Part-time", value: "Part-time" },
                        ]}
                        className="w-full"
                    />

                    <FormSelect
                        form={form}
                        name="location"
                        label="Location"
                        options={[
                            { label: "On-site", value: "On-site" },
                            { label: "Remote", value: "Remote" },
                            { label: "Hybrid", value: "Hybrid" },
                        ]}
                        className="w-full"
                    />

                    <FormRadio
                        form={form}
                        name="compensationType"
                        label="Compensation Type"
                        options={[
                            { label: "Paid", value: "Paid" },
                            { label: "Unpaid", value: "Unpaid" },
                        ]}
                        className="hover:cursor-pointer"
                    />

                    <FormInput
                        form={form}
                        name="salary.amount"
                        label="Salary / Stipend"
                        placeholder="e.g. ₹10,000 per month"
                        disabled={formData.compensationType === "Unpaid"}
                    />

                    <FormSelect
                        form={form}
                        name="experienceLevel"
                        label="Experience Level"
                        options={[
                            { label: "0-1 years", value: "0-1 years" },
                            { label: "1-2 years", value: "1-2 years" },
                            { label: "1-3 years", value: "1-3 years" },
                            { label: "3-5 years", value: "3-5 years" },
                            { label: "5+ years", value: "5+ years" },
                        ]}
                        className="w-full"
                    />

                    <FormInput
                        form={form}
                        name="openings"
                        label="Number of Openings"
                        type="number"
                        placeholder="e.g. 3"
                        min={1}
                        className="w-full"
                    />

                    <FormInput
                        form={form}
                        name="applicationDeadline"
                        label="Application Deadline"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full"
                    />

                    <FormSelect
                        form={form}
                        name="education"
                        label="Education"
                        options={[
                            { label: "Graduate", value: "Graduate" },
                            { label: "B.E/B.Tech", value: "B.E/B.Tech" },
                            { label: "BSC", value: "BSC" },
                        ]}
                        className="w-full"
                    />

                    <FormInput
                        form={form}
                        name="contactEmail"
                        label="Contact Email"
                        placeholder="hr@company.com"
                        className="w-full md:col-span-2"
                    />

                    <FormInput
                        form={form}
                        name="skills"
                        label="Required Skills (Comma separated)"
                        placeholder="e.g. React, Node.js, SQL"
                        className="w-full md:col-span-2"
                    />

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

                    <div className="md:col-span-2 flex justify-end gap-4">
                        <Button
                            type="submit"
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
