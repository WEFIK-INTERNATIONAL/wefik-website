"use client";
import React from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Github, Linkedin, Globe, FileUser } from "lucide-react";

const ApplicationDetails = ({ application }) => {
    if (!application) {
        return (
            <p className="text-center text-gray-500">No application found.</p>
        );
    }

    const {
        candidateInfo,
        educationInfo,
        skills,
        resume,
        socialLinks,
        status,
        appliedAt,
    } = application;

    const links = [
        {
            name: "GitHub",
            url: socialLinks?.github,
            icon: <Github />,
        },
        {
            name: "LinkedIn",
            url: socialLinks?.linkedin,
            icon: <Linkedin />,
        },
        {
            name: "Portfolio",
            url: socialLinks?.portfolio,
            icon: <Globe />,
        },
    ];

    return (
        <div className="space-y-3 overflow-y-scroll h-[78vh]">
            {/* Candidate Info */}
            <Card className="dark:text-white">
                <CardHeader>
                    <CardTitle className="text-lg font-bold">
                        Candidate Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 md:gap-4">
                    <div>
                        <p className="font-semibold">Full Name</p>
                        <p className="text-gray-500 dark:text-gray-300">
                            {candidateInfo?.fullName}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold">Email</p>
                        <p className="text-gray-500 dark:text-gray-300">
                            {candidateInfo?.email}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold">Phone</p>
                        <p className="text-gray-500 dark:text-gray-300">
                            {candidateInfo?.phone}
                        </p>
                    </div>
                    <div>
                        <p className="font-semibold">Address</p>
                        <p className="text-gray-500 dark:text-gray-300">
                            {candidateInfo?.address}, {candidateInfo?.city},{" "}
                            {candidateInfo?.state}, {candidateInfo?.country} -{" "}
                            {candidateInfo?.pinCode}
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Resume */}
            {resume?.url && (
                <Card className="dark:text-white">
                    <CardHeader>
                        <CardTitle>Resume</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Link
                            href={resume?.url}
                            target="_blank"
                            className="flex items-center gap-2 text-blue-600"
                        >
                            <FileUser />
                            {resume?.filename || "Download Resume"}
                        </Link>
                    </CardContent>
                </Card>
            )}

            {/* Resume */}
            {socialLinks && (
                <Card className="dark:text-white">
                    <CardHeader>
                        <CardTitle>Social Links</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-6">
                            {links
                                .filter((link) => link.url)
                                .map((link, idx) => (
                                    <Link
                                        key={idx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-blue-600 hover:underline"
                                    >
                                        {link.icon}
                                        {link.name}
                                    </Link>
                                ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Education */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-bold dark:text-white">
                        Education
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {educationInfo && educationInfo.length > 0 ? (
                        educationInfo.map((edu, index) => (
                            <div key={index} className="mb-4">
                                <p className="font-semibold">
                                    <span className="font-bold dark:text-white">
                                        Degree:
                                    </span>{" "}
                                    <span className="text-gray-600 dark:text-gray-300">
                                        {edu?.degree}
                                    </span>
                                </p>
                                <p>
                                    <span className="font-bold dark:text-white">
                                        Institution:
                                    </span>{" "}
                                    <span className="text-gray-600 dark:text-gray-300">
                                        {edu?.institution}
                                    </span>
                                </p>
                                <p>
                                    <span className="font-bold dark:text-white">
                                        Field Of Study:
                                    </span>{" "}
                                    <span className="text-gray-600 dark:text-gray-300">
                                        {edu?.fieldOfStudy}
                                    </span>
                                </p>
                                <p>
                                    <span className="font-bold dark:text-white">
                                        Date:
                                    </span>{" "}
                                    <span className="text-gray-600 dark:text-gray-300">
                                        {edu?.startDate
                                            ? new Date(
                                                  edu?.startDate
                                              ).toLocaleDateString()
                                            : "N/A"}{" "}
                                        -{" "}
                                        {edu?.endDate
                                            ? new Date(
                                                  edu?.endDate
                                              ).toLocaleDateString()
                                            : "Present"}
                                    </span>
                                </p>
                                <p>
                                    <span className="font-bold dark:text-white">
                                        Grade:
                                    </span>{" "}
                                    <span className="text-gray-600 dark:text-gray-300">
                                        {edu?.grade || "N/A"}
                                    </span>
                                </p>
                                {index !== educationInfo.length - 1 && (
                                    <Separator className="my-2 dark:bg-gray-700" />
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">
                            No education info available.
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Skills */}
            <Card className="dark:text-white">
                <CardHeader>
                    <CardTitle className="text-lg font-bold">Skills</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {skills && skills.length > 0 ? (
                        skills.map((skill, index) => (
                            <Badge key={index} variant="outline">
                                {skill?.name} ({skill?.level})
                            </Badge>
                        ))
                    ) : (
                        <p className="text-gray-500">No skills added.</p>
                    )}
                </CardContent>
            </Card>

            {/* Status */}
            <Card className="dark:text-white">
                <CardHeader>
                    <CardTitle className="text-lg font-bold">
                        Application Status
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Badge
                        className={`${
                            status === "Pending"
                                ? "bg-yellow-500 text-white"
                                : status === "Reviewed"
                                  ? "bg-blue-500 text-white"
                                  : status === "Shortlisted"
                                    ? "bg-purple-500 text-white"
                                    : status === "Rejected"
                                      ? "bg-red-500 text-white"
                                      : "bg-green-600 text-white"
                        }`}
                    >
                        {status}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-2 dark:text-white">
                        Applied on {new Date(appliedAt).toLocaleDateString()}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default ApplicationDetails;
