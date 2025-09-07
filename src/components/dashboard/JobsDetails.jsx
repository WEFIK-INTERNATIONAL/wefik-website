"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const JobDetails = ({ job }) => {
  if (!job) {
    return <p className="text-center text-gray-400 dark:text-gray-500">No job found.</p>;
  }

  const {
    jobProfile,
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
    status = "Open",
  } = job;

  // Normalize skills
  const skillsArray = Array.isArray(skills)
    ? skills.map((s) => (typeof s === "string" ? s : s.name))
    : [];

  return (
    <div className="space-y-4 overflow-y-scroll h-[78vh] p-2">
      {/* Job Info */}
      <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">
            Job Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-4 text-gray-700 dark:text-gray-300">
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">Job Profile</p>
            <p>{jobProfile || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">Job Type</p>
            <p>{type || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">Compensation</p>
            <p>{compensationType || "N/A"}</p>
          </div>
          {compensationType === "paid" && salary && (
            <div>
              <p className="font-semibold text-gray-800 dark:text-gray-200">Salary</p>
              <p>{salary.amount} {salary.currency}</p>
            </div>
          )}
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">Location</p>
            <p>{location || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">Experience Level</p>
            <p>{experienceLevel || "N/A"}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">Openings</p>
            <p>{openings || 1}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">Application Deadline</p>
            <p>{applicationDeadline || "N/A"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Education */}
      <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 mt-2">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Education</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300">{education || "Any Graduate"}</p>
        </CardContent>
      </Card>

      {/* Skills */}
      <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 mt-2">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Skills</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {skillsArray.length > 0 ? (
            skillsArray.map((skill, idx) => (
              <Badge
                key={idx}
                className="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200 border border-gray-300 dark:border-gray-700"
              >
                {skill}
              </Badge>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No skills specified.</p>
          )}
        </CardContent>
      </Card>

      {/* Job Description */}
      <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 mt-2">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Job Description</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
            {description || "No description provided."}
          </p>
        </CardContent>
      </Card>

      {/* Contact */}
      <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 mt-2">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Contact</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>Email:</strong> {contactEmail || "N/A"}
          </p>
        </CardContent>
      </Card>

      {/* Posted Date */}
      <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 mt-2">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Posted At</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 dark:text-gray-300">
            {createdAt ? new Date(createdAt).toLocaleDateString() : "N/A"}
          </p>
        </CardContent>
      </Card>

      {/* Status */}
      <Card className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 mt-2">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-white">Status</CardTitle>
        </CardHeader>
        <CardContent>
          <Badge
            className={`px-3 py-1 ${status === "Open" ? "bg-green-600 text-white" : "bg-red-500 text-white"
              }`}
          >
            {status}
          </Badge>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobDetails;
