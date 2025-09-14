"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, MapPin, Briefcase, Mail, Building2 } from "lucide-react";

import { getStatusBadgeClasses } from "@/utils/statusBadge";

const JobDetails = ({ job }) => {
    if (!job) {
        return (
            <p className="text-center text-gray-400 dark:text-gray-500">
                No job found.
            </p>
        );
    }

    const {
        jobId,
        companyName,
        jobProfile,
        department,
        jobRole,
        compensationType,
        salary,
        type,
        experienceLevel,
        location,
        applicationDeadline,
        openings,
        skills,
        education,
        contactEmail,
        description,
        createdAt,
        status,
    } = job;

    const skillsArray = Array.isArray(skills)
        ? skills.map((s) => (typeof s === "string" ? s : s.name))
        : [];

    return (
        <div className="space-y-6 overflow-y-scroll h-[78vh] p-2">
            {/* Top Summary Card */}
            <Card className="relative rounded-2xl shadow-xl overflow-hidden bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-pink-500/30 backdrop-blur-lg border border-white/20">
                {/* Optional glossy overlay */}
                <div className="absolute inset-0 bg-white/10 dark:bg-white/5 pointer-events-none" />

                <CardContent className="relative p-6 text-gray-900 dark:text-gray-100">
                    <h1 className="text-2xl font-bold drop-shadow-sm">
                        {jobProfile} ({jobRole})
                    </h1>
                    <p className="mt-1 text-sm flex items-center gap-2 opacity-90">
                        <Building2 className="w-4 h-4" /> {companyName}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-3">
                        <Badge className="bg-white/20 text-white backdrop-blur-sm border border-white/20 shadow-sm">
                            {type}
                        </Badge>
                        <Badge className="bg-white/20 text-white backdrop-blur-sm border border-white/20 shadow-sm">
                            {experienceLevel}
                        </Badge>
                        <Badge
                            className={`px-5 py-1 rounded-full ${getStatusBadgeClasses(status)}`}
                        >
                            {status}
                        </Badge>
                    </div>
                </CardContent>
            </Card>

            {/* Job Information */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-white">
                        Job Information
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid md:grid-cols-2 gap-y-4 gap-x-6">
                    <InfoItem label="Job ID" value={jobId} />
                    <InfoItem label="Profile" value={jobProfile} />
                    <InfoItem label="Department" value={department} />
                    <InfoItem label="Openings" value={openings} />
                    <InfoItem label="Compensation" value={compensationType} />
                    {compensationType === "Paid" && salary?.amount && (
                        <InfoItem
                            label="Salary"
                            value={`${salary.amount} ${salary.currency}`}
                        />
                    )}
                    <InfoItem
                        label="Application Deadline"
                        value={
                            applicationDeadline
                                ? new Date(
                                      applicationDeadline
                                  ).toLocaleDateString()
                                : "N/A"
                        }
                        icon={
                            <CalendarDays className="w-4 h-4 text-indigo-500" />
                        }
                    />
                    <InfoItem
                        label="Location"
                        value={location}
                        icon={<MapPin className="w-4 h-4 text-indigo-500" />}
                    />
                </CardContent>
            </Card>

            {/* Education */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-white">
                        Education Qualification
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-gray-600 dark:text-gray-300">
                        {education || "Any Graduate"}
                    </p>
                </CardContent>
            </Card>

            {/* Skills */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-white">
                        Required Skills
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {skillsArray.length > 0 ? (
                        skillsArray.map((skill, index) => (
                            <Badge
                                key={index}
                                variant="outline"
                                className="px-3 py-1 text-sm border-indigo-500 text-indigo-600 dark:text-indigo-400"
                            >
                                {skill}
                            </Badge>
                        ))
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">
                            No skills specified.
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Description */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-white">
                        Description
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {description ? (
                        <div
                            className="prose dark:prose-invert max-w-none leading-relaxed text-gray-300"
                            dangerouslySetInnerHTML={{ __html: description }}
                        />
                    ) : (
                        <p className="text-gray-500 dark:text-gray-400">
                            No description provided.
                        </p>
                    )}
                </CardContent>
            </Card>

            {/* Contact */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg font-bold text-white">
                        Contact
                    </CardTitle>
                </CardHeader>
                <CardContent className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-indigo-500" />
                    <p className="text-gray-600 dark:text-gray-300">
                        {contactEmail || "N/A"}
                    </p>
                </CardContent>
            </Card>

            {/* Footer */}
            <div className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
                Posted on{" "}
                {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
            </div>
        </div>
    );
};

const InfoItem = ({ label, value, icon }) => (
    <div>
        <p className="font-medium text-gray-700 dark:text-gray-200 flex items-center gap-1">
            {icon} {label}
        </p>
        <p className="text-gray-500 dark:text-gray-400">{value}</p>
    </div>
);

export default JobDetails;
