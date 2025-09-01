"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

const JobsDetails = ({ job }) => {
    if (!job) {
        return <p className="text-center text-gray-500">No job found.</p>;
    }

    const {
        companyName,
        companyWebsite,
        jobProfile,
        jobCategory,
        stipendType, // "Paid" or "Unpaid"
        salary,
        jobType,
        experienceLevel,
        location,
        applicationDeadline,
        openings,
        requiredSkills,
        educationQualification,
        contactEmail,
        jobDescription,
        postedAt,
        status,
    } = job;

    return (
        <div className="space-y-3 overflow-y-scroll h-[78vh]">
            {/* Job Info */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-bold">
                        Job Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 md:gap-4">
                    <div>
                        <p className="font-semibold">Company Name</p>
                        <p className="text-gray-500">{companyName}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Company Website / LinkedIn</p>
                        {companyWebsite ? (
                            <Link
                                href={companyWebsite}
                                target="_blank"
                                className="text-blue-600 hover:underline"
                            >
                                {companyWebsite}
                            </Link>
                        ) : (
                            <p className="text-gray-500">N/A</p>
                        )}
                    </div>
                    <div>
                        <p className="font-semibold">Job Profile</p>
                        <p className="text-gray-500">{jobProfile}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Job Category</p>
                        <p className="text-gray-500">{jobCategory}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Stipend</p>
                        <p className="text-gray-500">{stipendType}</p>
                    </div>
                    {stipendType === "Paid" && (
                        <div>
                            <p className="font-semibold">Salary / Stipend</p>
                            <p className="text-gray-500">{salary}</p>
                        </div>
                    )}
                    <div>
                        <p className="font-semibold">Job Type</p>
                        <p className="text-gray-500">{jobType}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Experience Level</p>
                        <p className="text-gray-500">{experienceLevel}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Location</p>
                        <p className="text-gray-500">{location}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Application Deadline</p>
                        <p className="text-gray-500">
                            {applicationDeadline
                                ? new Date(applicationDeadline).toLocaleDateString()
                                : "N/A"}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold">Number of Openings</p>
                        <p className="text-gray-500">{openings}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Education Qualification</p>
                        <p className="text-gray-500">{educationQualification}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Contact Email</p>
                        <p className="text-gray-500">{contactEmail}</p>
                    </div>
                    <div>
                        <p className="font-semibold">Posted On</p>
                        <p className="text-gray-500">
                            {postedAt ? new Date(postedAt).toLocaleDateString() : "N/A"}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Skills */}
            <Card>
                <CardHeader>
                    <CardTitle>Required Skills</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {requiredSkills && requiredSkills.length > 0 ? (
                        requiredSkills.map((skill, idx) => (
                            <Badge key={idx} variant="outline">
                                {skill}
                            </Badge>
                        ))
                    ) : (
                        <p className="text-gray-500">No skills specified.</p>
                    )}
                </CardContent>
            </Card>

            {/* Description */}
            <Card>
                <CardHeader>
                    <CardTitle>Job Description</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 whitespace-pre-line">
                        {jobDescription || "No description provided."}
                    </p>
                </CardContent>
            </Card>

            {/* Status */}
            <Card>
                <CardHeader>
                    <CardTitle>Status</CardTitle>
                </CardHeader>
                <CardContent>
                    <Badge
                        className={`${
                            status === "Open"
                                ? "bg-green-600 text-white"
                                : "bg-red-500 text-white"
                        }`}
                    >
                        {status}
                    </Badge>
                </CardContent>
            </Card>
        </div>
    );
};

export default JobsDetails;
