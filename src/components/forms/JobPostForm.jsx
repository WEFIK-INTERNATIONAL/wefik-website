"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import InputField from "./InputField";
import SelectField from "./SelectField";
import RadioField from "./RadioField";
import RichTextEditor from "./RichTextEditor";

import {
    useGetJobProfile,
    useCreateJob,
    useGenerateJobId,
    useUpdateJob,
} from "@/queries/jobs";

export default function JobPostForm({ job = null }) {
    const router = useRouter();
    
    const { mutate: generateJobId } = useGenerateJobId();
    const { data: jobProfiles = [], isLoading } = useGetJobProfile();
    const { mutate: createJob, isPending: isCreating } = useCreateJob();
    const { mutate: updateJob, isPending: isUpdating } = useUpdateJob();

    const normalizeJob = (job) => {
        if (!job) return {};

        return {
            ...job,
            salary: job.salary || { amount: "", currency: "INR" },

            skills: job.skills
                ? job.skills
                      .map((s) => (typeof s === "string" ? s : s.name))
                      .join(", ")
                : "",

            applicationDeadline: job.applicationDeadline
                ? new Date(job.applicationDeadline).toISOString().split("T")[0]
                : "",
        };
    };

    const [formData, setFormData] = useState({
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
    });

    const roles =
        jobProfiles.find((dept) => dept.code === formData.department)?.roles ||
        [];

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "amount" || name === "currency") {
            setFormData((prev) => ({
                ...prev,
                salary: { ...prev.salary, [name]: value },
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.jobRole || !formData.contactEmail) {
            toast.error("Job Role and Contact Email are required.");
            return;
        }

        const payload = {
            ...formData,
            salary: {
                amount:
                    formData.compensationType === "Paid"
                        ? Number(formData.salary.amount) || 0
                        : 0,
                currency: formData.salary.currency || "INR",
            },
            skills: formData.skills
                ? formData.skills
                      .split(",")
                      .map((s) => ({ name: s.trim() }))
                      .filter((s) => s.name)
                : [],
            applicationDeadline: formData.applicationDeadline
                ? new Date(formData.applicationDeadline)
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
        <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
            <div className="md:col-span-2 flex gap-10">
                <InputField
                    label="Company Name"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="e.g. Wefik Solutions"
                    className="md:w-full"
                />

                <InputField
                    label="Job Profile"
                    name="jobProfile"
                    value={formData.jobProfile}
                    placeholder="Job Profile"
                    readOnly
                    className="md:w-full cursor-not-allowed"
                />

                <InputField
                    label="Job ID"
                    name="jobId"
                    value={formData.jobId}
                    placeholder="e.g. ENG-WEB-2025-0021"
                    readOnly
                    className="md:w-full cursor-not-allowed"
                />
            </div>

            {/* Department */}
            <SelectField
                label="Department"
                name="department"
                value={formData.department}
                onChange={(e) =>
                    setFormData((prev) => ({
                        ...prev,
                        department: e.target.value,
                        jobRole: "",
                        jobProfile: "",
                        jobId: "",
                    }))
                }
                options={
                    jobProfiles.length > 0
                        ? jobProfiles.map((d) => ({
                              value: d.code,
                              label: d.department,
                          }))
                        : [
                              {
                                  value: null,
                                  label: "⚠️ Create Job Profile First",
                                  disabled: true,
                              },
                          ]
                }
                disabled={isLoading || job}
            />

            {/* Job Role */}
            <SelectField
                label="Job Role"
                name="jobRole"
                value={formData.jobRole}
                onChange={(e) => {
                    const value = e.target.value;
                    const selectedRole = roles.find((r) => r.code === value);

                    setFormData((prev) => ({
                        ...prev,
                        jobRole: value,
                        jobProfile: selectedRole ? selectedRole.name : "",
                        jobId: "Generating...",
                    }));

                    generateJobId(value, {
                        onSuccess: (newJobId) => {
                            setFormData((prev) => ({
                                ...prev,
                                jobId: newJobId,
                            }));
                        },
                        onError: () => {
                            toast.error("Failed to generate Job ID");
                            setFormData((prev) => ({ ...prev, jobId: "" }));
                        },
                    });
                }}
                options={roles.map((r) => ({
                    value: r.code,
                    label: r.name,
                }))}
                disabled={!formData.department || job}
            />

            {/* Job Type */}
            <SelectField
                label="Job Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                options={[
                    { label: "Internship", value: "Internship" },
                    { label: "Full-time", value: "Full-time" },
                    { label: "Part-time", value: "Part-time" },
                ]}
            />

            {/* Location */}
            <SelectField
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                options={[
                    { label: "On-site", value: "On-site" },
                    { label: "Remote", value: "Remote" },
                    { label: "Hybrid", value: "Hybrid" },
                ]}
            />

            {/* Compensation */}
            <RadioField
                label="Compensation Type"
                name="compensationType"
                value={formData.compensationType}
                onChange={handleChange}
                options={[
                    { label: "Paid", value: "Paid" },
                    { label: "Unpaid", value: "Unpaid" },
                ]}
            />

            {/* Salary */}
            <InputField
                label="Salary / Stipend"
                id="amount"
                name="amount"
                value={formData.salary.amount}
                onChange={handleChange}
                placeholder="e.g. ₹10,000 per month"
                disabled={formData.compensationType === "Unpaid"}
            />

            {/* Experience */}
            <SelectField
                label="Experience Level"
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleChange}
                options={[
                    { label: "0-1 years", value: "0-1 years" },
                    { label: "1-2 years", value: "1-2 years" },
                    { label: "1-3 years", value: "1-3 years" },
                    { label: "3-5 years", value: "3-5 years" },
                    { label: "5+ years", value: "5+ years" },
                ]}
            />

            {/* Openings */}
            <InputField
                label="Number of Openings"
                type="number"
                name="openings"
                min="1"
                value={formData.openings}
                onChange={handleChange}
                placeholder="e.g. 3"
            />

            {/* Application Deadline */}
            <InputField
                label="Application Deadline"
                type="date"
                name="applicationDeadline"
                value={formData.applicationDeadline}
                onChange={handleChange}
                min={new Date().toISOString().split("T")[0]}
            />

            {/* Education */}
            <SelectField
                label="Education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                options={[
                    { label: "Graduate", value: "Graduate" },
                    { label: "B.E/B.Tech", value: "B.E/B.Tech" },
                    { label: "BSC", value: "BSC" },
                ]}
            />

            {/* Contact Email */}
            <InputField
                label="Contact Email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                placeholder="hr@company.com"
                className="md:col-span-2"
            />

            {/* Skills */}
            <InputField
                label="Required Skills (Comma separated)"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                placeholder="e.g. React, Node.js, SQL"
                className="md:col-span-2"
            />

            <div className="md:col-span-2 w-full">
                <RichTextEditor
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>

            {/* Submit */}
            <div className="md:col-span-2 flex justify-end gap-4">
                <Button
                    type="submit"
                    // variant="outline"
                    className="px-8 py-2 rounded-lg transition hover:cursor-pointer"
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
        </form>
    );
}
