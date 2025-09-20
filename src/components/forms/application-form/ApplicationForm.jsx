"use client";

import React, { useState } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import SkillsForm from "./SkillsForm";
import ResumeUpload from "./ResumeUpload";
import EducationForm from "./EducationForm";
import SocialLinksForm from "./SocialLinksForm";
import CandidateInfoForm from "./CandidateInfoForm";
import WorkExperienceForm from "./WorkExperienceForm";

import { useApplyJobApplication } from "@/queries/applications";

// --------------------
// Zod Schema
// --------------------
const schema = z.object({
    candidateInfo: z.object({
        fullName: z.string().min(2, "Full name is required"),
        email: z.string().email("Invalid email"),
        phone: z
            .string()
            .regex(/^\+?[1-9]\d{7,14}$/, "Invalid phone number format"),
        address: z.string().optional(),
        country: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        pinCode: z.string().optional(),
    }),
    educationInfo: z
        .array(
            z.object({
                degree: z.string().min(2),
                institution: z.string().min(2),
                fieldOfStudy: z.string().optional(),
                startDate: z.string().optional(),
                endDate: z.string().optional(),
                grade: z.string().optional(),
            })
        )
        .min(1)
        .max(3),
    skills: z
        .array(
            z.object({
                name: z
                    .string()
                    .min(2, "Each skill must be at least 2 characters long"),
                level: z
                    .enum(["Beginner", "Intermediate", "Advanced", "Expert"])
                    .default("Beginner"),
            })
        )
        .min(1, "You must add at least 1 skill")
        .max(6, "You can add a maximum of 6 skills"),
    socialLinks: z.object({
        github: z.string().optional(),
        linkedin: z.string().optional(),
        portfolio: z.string().optional(),
    }),
    workExperience: z
        .array(
            z.object({
                company: z.string().optional(),
                role: z.string().optional(),
                startDate: z.string().optional(),
                endDate: z.string().optional(),
                description: z.string().optional(),
            })
        )
        .max(5),
    resume: z
        .instanceof(File, { message: "Resume is required." })
        .refine((file) => file.size <= 5 * 1024 * 1024, "File must be <5MB")
        .refine((file) => file.type === "application/pdf", "Only PDF allowed"),
});

// --------------------
// Main Component
// --------------------
export default function ApplicationForm({ formTitle, jobId, jobTitle }) {
    const { mutateAsync: applyJobApplication, isPending } =
        useApplyJobApplication();

    const [skillInput, setSkillInput] = useState("");

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            candidateInfo: { fullName: "", email: "", phone: "" },
            educationInfo: [{ degree: "", institution: "" }],
            skills: [],
            socialLinks: {
                github: "",
                linkedin: "",
                portfolio: "",
            },
            workExperience: [{ company: "", role: "" }],
            resume: null,
        },
        mode: "onChange",
    });

    const {
        fields: educationFields,
        append: addEducation,
        remove: removeEducation,
    } = useFieldArray({ control: form.control, name: "educationInfo" });

    const {
        fields: workFields,
        append: addWork,
        remove: removeWork,
    } = useFieldArray({ control: form.control, name: "workExperience" });

    // --------------------
    // Submit Handler
    // --------------------
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            // Append file
            if (data.resume) {
                formData.append("resume", data.resume);
            }

            // Append job info
            formData.append("jobId", jobId);
            formData.append("jobTitle", jobTitle);

            // Prepare the rest of the data
            const payload = {
                jobId,
                jobTitle,
                ...data,
            };

            formData.append(
                "data",
                JSON.stringify({ ...payload, resume: undefined })
            );

            await applyJobApplication(formData);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <Card className="max-w-4xl mx-auto border-gray-700 shadow-lg text-white">
            <CardHeader>
                <CardTitle className="text-3xl font-bold text-[#9AE300]">
                    {formTitle || "Job Application Form"}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-10"
                    >
                        <CandidateInfoForm form={form} />
                        <ResumeUpload form={form} />
                        <EducationForm
                            form={form}
                            fields={educationFields}
                            addEducation={addEducation}
                            removeEducation={removeEducation}
                        />
                        <SkillsForm
                            form={form}
                            skillInput={skillInput}
                            setSkillInput={setSkillInput}
                        />
                        <SocialLinksForm form={form} />
                        <WorkExperienceForm
                            form={form}
                            fields={workFields}
                            addWork={addWork}
                            removeWork={removeWork}
                        />

                        <Button
                            type="submit"
                            disabled={isPending}
                            className="w-full text-lg font-semibold bg-[#9AE300] hover:bg-[#85c700] hover:cursor-pointer py-6 rounded-lg"
                        >
                            {isPending ? "Submitting..." : "Submit Application"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
