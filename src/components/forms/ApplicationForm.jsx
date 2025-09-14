"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Badge } from "../ui/badge";

export default function ApplicationForm() {
    // Candidate Info
    const [candidate, setCandidate] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        country: "",
        city: "",
        state: "",
        pinCode: "",
    });

    // Resume
    const [resume, setResume] = useState({ url: "" });

    // Social Links
    const [social, setSocial] = useState({
        github: "",
        linkedin: "",
        portfolio: "",
    });

    // Education Info (Dynamic)
    const [education, setEducation] = useState([
        {
            degree: "",
            institution: "",
            fieldOfStudy: "",
            startDate: "",
            endDate: "",
            grade: "",
        },
    ]);

    // Skills (Dynamic)
    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");

    // Handlers
    const handleCandidateChange = (e) => {
        const { name, value } = e.target;
        setCandidate((prev) => ({ ...prev, [name]: value }));
    };

    const handleSocialChange = (e) => {
        const { name, value } = e.target;
        setSocial((prev) => ({ ...prev, [name]: value }));
    };

    // Education handlers
    const handleEducationChange = (index, field, value) => {
        const updated = [...education];
        updated[index][field] = value;
        setEducation(updated);
    };
    const addEducation = () =>
        setEducation([
            ...education,
            {
                degree: "",
                institution: "",
                fieldOfStudy: "",
                startDate: "",
                endDate: "",
                grade: "",
            },
        ]);
    const removeEducation = (index) =>
        setEducation(education.filter((_, i) => i !== index));

    // Skills handlers
    const addSkill = () => {
        if (newSkill.trim() !== "") {
            setSkills([...skills, { name: newSkill }]);
            setNewSkill(""); // reset input
        }
    };

    const removeSkill = (index) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    // Submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            candidateInfo: candidate,
            resume,
            socialLinks: social,
            educationInfo: education,
            skills,
        };
        console.log("Submitted Data:", formData);

        toast.success("Application submitted successfully!");
    };

    return (
        <div className="mt-20">
            <form
                onSubmit={handleSubmit}
                className="space-y-8 p-6 max-w-4xl mx-auto"
            >
                <h2 className="text-2xl font-bold">Job Application Form</h2>

                {/* Candidate Info */}
                <Card>
                    <CardHeader>
                        <CardTitle>Candidate Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="gap-0">
                                    Full Name
                                    <span className="text-red-600">*</span>:
                                </Label>
                                <Input
                                    name="fullName"
                                    placeholder="Enter Your Full Name"
                                    value={candidate.fullName}
                                    onChange={handleCandidateChange}
                                    required
                                    className="!focus:outline-none !focus:ring-1 !focus:ring-[#9AE600]"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="gap-0">
                                    Email<span className="text-red-600">*</span>
                                    :
                                </Label>
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Enter Your Email"
                                    value={candidate.email}
                                    onChange={handleCandidateChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="gap-0">
                                    Phone Number
                                    <span className="text-red-600">*</span>:
                                </Label>
                                <Input
                                    name="phone"
                                    type="number"
                                    placeholder="Enter Your Phone No."
                                    value={candidate.phone}
                                    onChange={handleCandidateChange}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="gap-0">
                                    Address
                                    <span className="text-red-600">*</span>:
                                </Label>
                                <Input
                                    name="address"
                                    placeholder="Enter Your Address"
                                    value={candidate.address}
                                    onChange={handleCandidateChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="gap-0">
                                    Country
                                    <span className="text-red-600">*</span>:
                                </Label>
                                <Input
                                    name="country"
                                    placeholder="Enter Country"
                                    value={candidate.country}
                                    onChange={handleCandidateChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="gap-0">
                                    City<span className="text-red-600">*</span>:
                                </Label>
                                <Input
                                    name="city"
                                    placeholder="Enter City"
                                    value={candidate.city}
                                    onChange={handleCandidateChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="gap-0">
                                    State<span className="text-red-600">*</span>
                                    :
                                </Label>
                                <Input
                                    name="state"
                                    placeholder="Enter State"
                                    value={candidate.state}
                                    onChange={handleCandidateChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="gap-0">
                                    Pin Code
                                    <span className="text-red-600">*</span>:
                                </Label>
                                <Input
                                    type="number"
                                    name="pinCode"
                                    placeholder="Enter Pincode"
                                    value={candidate.pinCode}
                                    onChange={handleCandidateChange}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Resume */}
                <Card>
                    <CardHeader>
                        <CardTitle>Resume</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Input
                            type="file"
                            placeholder="Resume URL"
                            value={resume.url}
                            onChange={(e) => setResume(e.target.value)}
                            required
                        />
                    </CardContent>
                </Card>

                {/* Social Links */}
                <Card>
                    <CardHeader>
                        <CardTitle>Social Links</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center gap-4">
                        <div className="space-y-2">
                            <Label>Github:</Label>
                            <Input
                                name="github"
                                placeholder="GitHub URL"
                                value={social.github}
                                onChange={handleSocialChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Linkedin:</Label>
                            <Input
                                name="linkedin"
                                placeholder="LinkedIn URL"
                                value={social.linkedin}
                                onChange={handleSocialChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Portfolio:</Label>
                            <Input
                                name="portfolio"
                                placeholder="Portfolio URL"
                                value={social.portfolio}
                                onChange={handleSocialChange}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Education Info */}
                <Card>
                    <CardContent className="space-y-4 pt-4">
                        <h3 className="text-lg font-semibold">Education</h3>
                        {education.map((edu, index) => (
                            <div
                                key={index}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end border p-3 rounded-md"
                            >
                                <Input
                                    placeholder="Degree"
                                    value={edu.degree}
                                    onChange={(e) =>
                                        handleEducationChange(
                                            index,
                                            "degree",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                                <Input
                                    placeholder="Institution"
                                    value={edu.institution}
                                    onChange={(e) =>
                                        handleEducationChange(
                                            index,
                                            "institution",
                                            e.target.value
                                        )
                                    }
                                    required
                                />
                                <Input
                                    placeholder="Field of Study"
                                    value={edu.fieldOfStudy}
                                    onChange={(e) =>
                                        handleEducationChange(
                                            index,
                                            "fieldOfStudy",
                                            e.target.value
                                        )
                                    }
                                />
                                <Input
                                    type="date"
                                    value={edu.startDate}
                                    onChange={(e) =>
                                        handleEducationChange(
                                            index,
                                            "startDate",
                                            e.target.value
                                        )
                                    }
                                />
                                <Input
                                    type="date"
                                    value={edu.endDate}
                                    onChange={(e) =>
                                        handleEducationChange(
                                            index,
                                            "endDate",
                                            e.target.value
                                        )
                                    }
                                />
                                <Input
                                    placeholder="Grade"
                                    value={edu.grade}
                                    onChange={(e) =>
                                        handleEducationChange(
                                            index,
                                            "grade",
                                            e.target.value
                                        )
                                    }
                                />
                                {education.length > 1 && (
                                    <Button
                                        type="button"
                                        variant="destructive"
                                        onClick={() => removeEducation(index)}
                                    >
                                        Remove
                                    </Button>
                                )}
                            </div>
                        ))}
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addEducation}
                        >
                            + Add Education
                        </Button>
                    </CardContent>
                </Card>

                {/* Skills Section */}
                <Card>
                    <CardHeader>
                        <CardTitle>Skills</CardTitle>
                    </CardHeader>

                    <CardContent className="flex justify-center items-center gap-2">
                        <Input
                            placeholder="Skill Name"
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                        />
                        <Button
                            type="button"
                            variant="outline"
                            onClick={addSkill}
                            className="hover:cursor-pointer"
                        >
                            + Add Skill
                        </Button>
                    </CardContent>

                    <CardFooter className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <Badge
                                key={index}
                                className="flex items-center gap-2 px-3 py-1"
                            >
                                {skill.name}
                                <button
                                    type="button"
                                    onClick={() => removeSkill(index)}
                                    className="ml-2 text-red-400 hover:text-red-600 hover:cursor-pointer"
                                >
                                    ✕
                                </button>
                            </Badge>
                        ))}
                    </CardFooter>
                </Card>

                {/* Submit */}
                <Button type="submit" className="w-full">
                    Submit Application
                </Button>
            </form>
        </div>
    );
}
