"use client";
import { createContext, useContext, useState, useEffect } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
	const [jobs, setJobs] = useState([]);
	const [applications, setApplications] = useState([
		{
			id: 1,
			jobId: 101,
			title: "Frontend Developer",
			candidateInfo: {
				fullName: "John Doe",
				email: "johndoe@example.com",
				phone: "+1 123-456-7890",
				address: "123 Main St",
				city: "New York",
				state: "NY",
				country: "USA",
				pinCode: "10001",
			},
			resume: {
				url: "/resumes/john-doe.pdf",
				filename: "John-Doe-Resume.pdf",
			},
			educationInfo: [
				{
					degree: "B.Sc. Computer Science",
					institution: "XYZ University",
					fieldOfStudy: "Computer Science",
					startDate: "2018-08-01",
					endDate: "2022-06-30",
					grade: "3.8 GPA",
				},
			],
			socialLinks: {
				github: { url: "https://github.com/johndoe" },
				linkedin: { url: "https://linkedin.com/in/johndoe" },
				portfolio: { url: "https://johndoe.dev" },
			},
			skills: [
				{ name: "React", level: "Advanced" },
				{ name: "TypeScript", level: "Intermediate" },
			],
			status: "Pending",
			appliedAt: "2025-08-20",
		},
		{
			id: 2,
			jobId: 101,
			title: "Frontend Developer",
			candidateInfo: {
				fullName: "Alice Smith",
				email: "alice.smith@example.com",
				phone: "+44 20 7946 0958",
				address: "45 Queen St",
				city: "London",
				state: "LDN",
				country: "UK",
				pinCode: "SW1A 1AA",
			},
			resume: {
				url: "/resumes/alice-smith.pdf",
				filename: "Alice-Smith-Resume.pdf",
			},
			educationInfo: [
				{
					degree: "M.Sc. Software Engineering",
					institution: "University of London",
					fieldOfStudy: "Software Engineering",
					startDate: "2019-09-01",
					endDate: "2021-07-30",
					grade: "Distinction",
				},
			],
			socialLinks: {
				github: { url: "https://github.com/alicesmith" },
				linkedin: { url: "https://linkedin.com/in/alicesmith" },
				portfolio: { url: "https://alicesmith.dev" },
			},
			skills: [
				{ name: "Vue.js", level: "Advanced" },
				{ name: "Node.js", level: "Intermediate" },
			],
			status: "Reviewed",
			appliedAt: "2025-08-18",
		},
		{
			id: 3,
			jobId: 102,
			title: "Backend Developer",
			candidateInfo: {
				fullName: "Raj Patel",
				email: "raj.patel@example.com",
				phone: "+91 98765-43210",
				address: "12 MG Road",
				city: "Bangalore",
				state: "KA",
				country: "India",
				pinCode: "560001",
			},
			resume: {
				url: "/resumes/raj-patel.pdf",
				filename: "Raj-Patel-Resume.pdf",
			},
			educationInfo: [
				{
					degree: "B.Tech Information Technology",
					institution: "IIT Bombay",
					fieldOfStudy: "IT",
					startDate: "2016-07-01",
					endDate: "2020-05-30",
					grade: "8.9 CGPA",
				},
			],
			socialLinks: {
				github: { url: "https://github.com/rajpatel" },
				linkedin: { url: "https://linkedin.com/in/rajpatel" },
				portfolio: { url: "https://rajpatel.tech" },
			},
			skills: [
				{ name: "Node.js", level: "Advanced" },
				{ name: "MongoDB", level: "Advanced" },
				{ name: "Docker", level: "Intermediate" },
			],
			status: "Shortlisted",
			appliedAt: "2025-08-15",
		},
		{
			id: 4,
			jobId: 103,
			title: "UI/UX Designer",
			candidateInfo: {
				fullName: "Maria Lopez",
				email: "maria.lopez@example.com",
				phone: "+34 654 321 098",
				address: "Calle Mayor 123",
				city: "Madrid",
				state: "MD",
				country: "Spain",
				pinCode: "28001",
			},
			resume: {
				url: "/resumes/maria-lopez.pdf",
				filename: "Maria-Lopez-Resume.pdf",
			},
			educationInfo: [
				{
					degree: "B.A. Graphic Design",
					institution: "Universidad Complutense",
					fieldOfStudy: "Graphic Design",
					startDate: "2015-09-01",
					endDate: "2019-06-30",
					grade: "First Class",
				},
			],
			socialLinks: {
				github: { url: "" },
				linkedin: { url: "https://linkedin.com/in/marialopez" },
				portfolio: { url: "https://marialopez.design" },
			},
			skills: [
				{ name: "Figma", level: "Advanced" },
				{ name: "Adobe XD", level: "Intermediate" },
				{ name: "Illustrator", level: "Advanced" },
			],
			status: "Accepted",
			appliedAt: "2025-08-12",
		},
		{
			id: 5,
			jobId: 104,
			title: "Data Scientist",
			candidateInfo: {
				fullName: "Chen Wei",
				email: "chen.wei@example.com",
				phone: "+86 138-0011-2233",
				address: "88 Zhongshan Rd",
				city: "Shanghai",
				state: "SH",
				country: "China",
				pinCode: "200000",
			},
			resume: {
				url: "/resumes/chen-wei.pdf",
				filename: "Chen-Wei-Resume.pdf",
			},
			educationInfo: [
				{
					degree: "M.Sc. Data Science",
					institution: "Tsinghua University",
					fieldOfStudy: "Data Science",
					startDate: "2017-09-01",
					endDate: "2019-07-01",
					grade: "3.9 GPA",
				},
			],
			socialLinks: {
				github: { url: "https://github.com/chenwei" },
				linkedin: { url: "" },
				portfolio: { url: "" },
			},
			skills: [
				{ name: "Python", level: "Advanced" },
				{ name: "TensorFlow", level: "Intermediate" },
				{ name: "Pandas", level: "Advanced" },
			],
			status: "Rejected",
			appliedAt: "2025-08-10",
		},
	]);

	const [isLoading, setIsLoading] = useState(false);

	return (
		<DashboardContext.Provider
			value={{ isLoading, jobs, applications, setApplications, setJobs }}
		>
			{children}
		</DashboardContext.Provider>
	);
};

export const useDashboardContext = () => useContext(DashboardContext);
