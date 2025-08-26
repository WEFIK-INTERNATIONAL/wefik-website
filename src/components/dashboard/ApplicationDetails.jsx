"use client";
import React from "react";
import Link from "next/link";

const ApplicationDetails = () => {
	const application = {
		// Personal Details
		name: "John Doe",
		email: "johndoe@example.com",
		phone: "123-456-7890",
		address: "123 Main St, City, Country",
		resume: "resume-john-doe.pdf",
		links: {
			github: "https://github.com/johndoe",
			linkedin: "https://linkedin.com/in/johndoe",
			portfolio: "https://johndoe.dev",
		},

		// Education
		education: [
			{
				degree: "B.Sc. Computer Science",
				institution: "XYZ University",
				year: "2022",
			},
			{
				degree: "High School Diploma",
				institution: "ABC High School",
				year: "2018",
			},
		],

		// Experience
		experience: [
			{
				role: "Frontend Developer",
				company: "TechCorp",
				duration: "2022 - Present",
				details: "Working on React and Next.js projects.",
			},
			{
				role: "Intern",
				company: "WebSolutions",
				duration: "2021 - 2022",
				details: "Assisted in building UI components.",
			},
		],

		// Skills
		skills: ["React", "JavaScript", "TypeScript", "TailwindCSS"],

		// Job details
		position: "Frontend Developer",
		jobId: "JOB-12345",
		employmentType: "Full-time",
		jobType: "Remote",
		salary: "$75,000 / year",
		appliedAt: "2025-08-20",
	};

	return (
		<div className="h-96 overflow-x-scroll space-y-8 text-sm">
			{/* Job Details */}
			<div className="space-y-3">
				<h2 className="text-lg font-bold border-b pb-1">Job Details</h2>
				<div className="flex justify-between">
					<p>
						<span className="font-semibold">Job Title:</span>{" "}
						{application?.position}
					</p>
					<p>
						<span className="font-semibold">Job ID:</span> {application?.jobId}
					</p>
				</div>
				<div className="flex justify-between">
					<p>
						<span className="font-semibold">Employment Type:</span>{" "}
						{application?.employmentType}
					</p>
					<p>
						<span className="font-semibold">Job Type:</span>{" "}
						{application?.jobType}
					</p>
				</div>
				<p>
					<span className="font-semibold">Salary:</span> {application?.salary}
				</p>
				<p>
					<span className="font-semibold">Applied On:</span>{" "}
					{application?.appliedAt}
				</p>
			</div>

			{/* Personal Details */}
			<div className="space-y-3">
				<h2 className="text-lg font-bold border-b pb-1">Personal Details</h2>
				<p>
					<span className="font-semibold">Name:</span> {application?.name}
				</p>
				<p>
					<span className="font-semibold">Email:</span> {application?.email}
				</p>
				<p>
					<span className="font-semibold">Phone:</span> {application?.phone}
				</p>
				<p>
					<span className="font-semibold">Address:</span> {application?.address}
				</p>

				{application?.links && (
					<div className="flex items-center gap-3">
						<p className="font-semibold">Links:</p>
						{application?.links?.github && (
							<Link
								href={application.links.github}
								target="_blank"
								className="text-blue-600"
							>
								Github
							</Link>
						)}
						{application?.links?.linkedin && (
							<Link
								href={application.links.linkedin}
								target="_blank"
								className="text-blue-600"
							>
								LinkedIn
							</Link>
						)}
						{application?.links?.portfolio && (
							<Link
								href={application.links.portfolio}
								target="_blank"
								className="text-blue-600"
							>
								Portfolio
							</Link>
						)}
					</div>
				)}

				<Link href={application?.resume} className="text-blue-600">
					Resume Link
				</Link>
			</div>

			{/* Education */}
			<div className="space-y-3">
				<h2 className="text-lg font-bold border-b pb-1">Education</h2>
				{application.education.map((edu, index) => (
					<div key={index}>
						<p className="font-semibold">{edu.degree}</p>
						<p>
							{edu.institution} - {edu.year}
						</p>
					</div>
				))}
			</div>

			{/* Experience */}
			<div className="space-y-3">
				<h2 className="text-lg font-bold border-b pb-1">Experience</h2>
				{application.experience.map((exp, index) => (
					<div key={index} className="space-y-1">
						<div className="flex justify-between">
							<p className="font-semibold">
								{exp.role} @ {exp.company}
							</p>
							<p className="text-gray-600">{exp.duration}</p>
						</div>
						<p>{exp.details}</p>
					</div>
				))}
			</div>

			{/* Skills */}
			<div className="space-y-3">
				<h2 className="text-lg font-bold border-b pb-1">Skills</h2>
				<p>{application.skills.join(", ")}</p>
			</div>
		</div>
	);
};

export default ApplicationDetails;
