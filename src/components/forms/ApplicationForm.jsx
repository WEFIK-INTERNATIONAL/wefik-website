"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

// ✅ Validation Schema (mirrors mongoose schema)
const schema = z.object({
    candidateInfo: z.object({
        fullName: z.string().min(2, "Full name is required"),
        email: z.string().email("Invalid email"),
        phone: z.string().regex(/^\+?[1-9]\d{7,14}$/, "Invalid phone"),
        address: z.string().optional(),
        country: z.string().optional(),
        city: z.string().optional(),
        state: z.string().optional(),
        pinCode: z.string().optional(),
    }),
    educationInfo: z.array(
        z.object({
            degree: z.string().min(2, "Degree required"),
            institution: z.string().min(2, "Institution required"),
            fieldOfStudy: z.string().optional(),
            startDate: z.string().optional(),
            endDate: z.string().optional(),
            grade: z.string().optional(),
        })
    ),
    skills: z.array(
        z.object({
            name: z.string().min(1, "Skill required"),
            level: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"]),
        })
    ),
    workExperience: z.array(
        z.object({
            company: z.string().min(2, "Company required"),
            role: z.string().min(2, "Role required"),
            startDate: z.string().min(1, "Start date required"),
            endDate: z.string().optional(),
            description: z.string().optional(),
        })
    ),
});

export default function ApplicationForm({ onSubmit }) {
    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            candidateInfo: {
                fullName: "",
                email: "",
                phone: "",
                address: "",
                country: "",
                city: "",
                state: "",
                pinCode: "",
            },
            educationInfo: [
                {
                    degree: "",
                    institution: "",
                    fieldOfStudy: "",
                    startDate: "",
                    endDate: "",
                    grade: "",
                },
            ],
            skills: [{ name: "", level: "Intermediate" }],
            workExperience: [
                {
                    company: "",
                    role: "",
                    startDate: "",
                    endDate: "",
                    description: "",
                },
            ],
        },
    });

    const { fields: educationFields, append: addEducation } = useFieldArray({
        control: form.control,
        name: "educationInfo",
    });
    const { fields: skillFields, append: addSkill } = useFieldArray({
        control: form.control,
        name: "skills",
    });
    const { fields: workFields, append: addWork } = useFieldArray({
        control: form.control,
        name: "workExperience",
    });

    return (
        <Card className="max-w-4xl mx-auto shadow-md mt-20">
            <CardHeader>
                <CardTitle>Job Application</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        {/* Candidate Info */}
                        <section>
                            <h2 className="text-lg font-semibold">
                                Candidate Information
                            </h2>
                            <div className="grid md:grid-cols-2 gap-4 mt-2">
                                {[
                                    "fullName",
                                    "email",
                                    "phone",
                                    "address",
                                    "country",
                                    "state",
                                    "city",
                                    "pinCode",
                                ].map((field) => (
                                    <FormField
                                        key={field}
                                        control={form.control}
                                        name={`candidateInfo.${field}`}
                                        render={({ field: f }) => (
                                            <FormItem>
                                                <FormLabel className="capitalize">
                                                    {field.replace(
                                                        /([A-Z])/g,
                                                        " $1"
                                                    )}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder={field}
                                                        {...f}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Education Section */}
                        <section>
                            <h2 className="text-lg font-semibold">Education</h2>
                            {educationFields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="grid md:grid-cols-2 gap-4 mt-2"
                                >
                                    <FormField
                                        control={form.control}
                                        name={`educationInfo.${index}.degree`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Degree</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="B.Tech"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`educationInfo.${index}.institution`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Institution
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="University"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`educationInfo.${index}.fieldOfStudy`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Field of Study
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Computer Science"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`educationInfo.${index}.grade`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Grade</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="8.5 CGPA"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`educationInfo.${index}.startDate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Start Date
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`educationInfo.${index}.endDate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>End Date</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                className="mt-2"
                                onClick={() =>
                                    addEducation({
                                        degree: "",
                                        institution: "",
                                    })
                                }
                            >
                                Add Education
                            </Button>
                        </section>

                        {/* Skills Section */}
                        <section>
                            <h2 className="text-lg font-semibold">Skills</h2>
                            {skillFields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="grid md:grid-cols-2 gap-4 mt-2"
                                >
                                    <FormField
                                        control={form.control}
                                        name={`skills.${index}.name`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Skill</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="React"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`skills.${index}.level`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Level</FormLabel>
                                                <Select
                                                    onValueChange={
                                                        field.onChange
                                                    }
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select level" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="Beginner">
                                                            Beginner
                                                        </SelectItem>
                                                        <SelectItem value="Intermediate">
                                                            Intermediate
                                                        </SelectItem>
                                                        <SelectItem value="Advanced">
                                                            Advanced
                                                        </SelectItem>
                                                        <SelectItem value="Expert">
                                                            Expert
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                className="mt-2"
                                onClick={() =>
                                    addSkill({
                                        name: "",
                                        level: "Intermediate",
                                    })
                                }
                            >
                                Add Skill
                            </Button>
                        </section>

                        {/* Work Experience */}
                        <section>
                            <h2 className="text-lg font-semibold">
                                Work Experience
                            </h2>
                            {workFields.map((field, index) => (
                                <div
                                    key={field.id}
                                    className="grid md:grid-cols-2 gap-4 mt-2"
                                >
                                    <FormField
                                        control={form.control}
                                        name={`workExperience.${index}.company`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Company</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Company Name"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`workExperience.${index}.role`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Role</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Software Engineer"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`workExperience.${index}.startDate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    Start Date
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`workExperience.${index}.endDate`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>End Date</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`workExperience.${index}.description`}
                                        render={({ field }) => (
                                            <FormItem className="md:col-span-2">
                                                <FormLabel>
                                                    Description
                                                </FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder="Worked on building scalable apps..."
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                className="mt-2"
                                onClick={() =>
                                    addWork({
                                        company: "",
                                        role: "",
                                        startDate: "",
                                    })
                                }
                            >
                                Add Work Experience
                            </Button>
                        </section>

                        <Button type="submit" className="w-full">
                            Submit Application
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}
