"use client";
import React from "react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
    Github,
    Linkedin,
    Globe,
    FileUser,
    User,
    GraduationCap,
    Award,
    ClipboardCheck,
} from "lucide-react";

import { getStatusBadgeClasses } from "@/utils/statusBadge";

const ApplicationDetails = ({ application }) => {
    if (!application) {
        return (
            <p className="text-center text-gray-500 dark:text-gray-400">
                No application found.
            </p>
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
            icon: <Github className="w-4 h-4" />,
        },
        {
            name: "LinkedIn",
            url: socialLinks?.linkedin,
            icon: <Linkedin className="w-4 h-4" />,
        },
        {
            name: "Portfolio",
            url: socialLinks?.portfolio,
            icon: <Globe className="w-4 h-4" />,
        },
    ];

    return (
        <div className="space-y-8 overflow-y-scroll h-[78vh] p-4 rounded-xl">
            {/* Candidate Info */}
            <SectionCard
                title="Candidate Information"
                icon={<User className="w-5 h-5" />}
            >
                <Info label="Full Name" value={candidateInfo?.fullName} />
                <Info label="Email" value={candidateInfo?.email} />
                <Info label="Phone" value={candidateInfo?.phone} />
                <Info
                    label="Address"
                    value={
                        [
                            candidateInfo?.address,
                            candidateInfo?.city,
                            candidateInfo?.state,
                            candidateInfo?.country,
                        ]
                            .filter(Boolean)
                            .join(", ") +
                        (candidateInfo?.pinCode
                            ? ` - ${candidateInfo.pinCode}`
                            : "")
                    }
                />
            </SectionCard>

            {/* Resume */}
            {resume?.url && (
                <SectionCard
                    title="Resume"
                    icon={<FileUser className="w-5 h-5" />}
                >
                    <Link
                        href={resume?.url}
                        target="_blank"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:underline dark:text-blue-400"
                    >
                        <FileUser className="w-4 h-4" />
                        {resume?.filename || "Download Resume"}
                    </Link>
                </SectionCard>
            )}

            {/* Social Links */}
            {socialLinks && (
                <SectionCard title="Social Links" icon="🌐">
                    <div className="flex flex-wrap gap-4">
                        {links
                            .filter((link) => link.url)
                            .map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600"
                                >
                                    {link.icon}
                                    <span>{link.name}</span>
                                </Link>
                            ))}
                    </div>
                </SectionCard>
            )}

            {/* Education */}
            <SectionCard
                title="Education"
                icon={<GraduationCap className="w-5 h-5" />}
            >
                {educationInfo && educationInfo.length > 0 ? (
                    educationInfo.map((edu, index) => (
                        <div key={index} className="mb-6">
                            <Info label="Degree" value={edu?.degree} />
                            <Info
                                label="Institution"
                                value={edu?.institution}
                            />
                            <Info
                                label="Field of Study"
                                value={edu?.fieldOfStudy}
                            />
                            <Info
                                label="Date"
                                value={`${edu?.startDate ? new Date(edu.startDate).toLocaleDateString() : "N/A"} - ${
                                    edu?.endDate
                                        ? new Date(
                                              edu.endDate
                                          ).toLocaleDateString("en-US", {
                                              year: "numeric",
                                              month: "short",
                                              day: "numeric",
                                          })
                                        : "Present"
                                }`}
                            />
                            <Info label="Grade" value={edu?.grade || "N/A"} />
                            {index !== educationInfo.length - 1 && (
                                <Separator className="my-4 dark:bg-gray-700" />
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                        No education info available.
                    </p>
                )}
            </SectionCard>

            {/* Skills */}
            <SectionCard title="Skills" icon={<Award className="w-5 h-5" />}>
                {skills && skills.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                        {skills.map((skill, index) => (
                            <Badge
                                key={index}
                                className="px-3 py-1 rounded-md bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                            >
                                {skill?.name} ({skill?.level})
                            </Badge>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400">
                        No skills added.
                    </p>
                )}
            </SectionCard>

            {/* Status */}
            <SectionCard
                title="Application Status"
                icon={<ClipboardCheck className="w-5 h-5" />}
            >
                <Badge
                    className={`px-4 py-1 rounded-full text-sm font-medium ${getStatusBadgeClasses(status)}`}
                >
                    {status}
                </Badge>
                <p className="text-sm text-gray-600 mt-3 dark:text-gray-400">
                    Applied on {new Date(appliedAt).toLocaleDateString()}
                </p>
            </SectionCard>
        </div>
    );
};

// ✅ Section wrapper with subtle neutral styling
const SectionCard = ({ title, icon, children }) => (
    <Card className="border border-gray-200 dark:border-gray-800 shadow-sm rounded-xl py-0">
        <CardHeader className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 rounded-t-lg !pb-0">
            <CardTitle className="flex items-center text-base font-semibold text-gray-900 dark:text-gray-100 py-4">
                {icon} {title}
            </CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">{children}</CardContent>
    </Card>
);

// ✅ Label + value row
const Info = ({ label, value }) => (
    <p className="text-md">
        <span className="font-medium text-gray-900 dark:text-gray-100">
            {label}:{" "}
        </span>
        <span className="text-gray-600 dark:text-gray-400">
            {value || "N/A"}
        </span>
    </p>
);

export default ApplicationDetails;
