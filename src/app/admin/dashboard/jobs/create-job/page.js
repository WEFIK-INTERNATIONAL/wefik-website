"use client";
import React, { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleArrowLeft } from "lucide-react";

export default function JobPostForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    jobId: '',
    jobProfile: '',
    compensationType: 'paid',
    salary: '',
    jobType: 'Internship',
    experienceLevel: '0–1 years',
    location: 'On-site',
    applicationDeadline: '',
    openings: 1,
    requiredSkills: '',
    education: 'Any Graduate',
    contactEmail: '',
    jobDescription: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'radio' ? value : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the formData to an API
    console.log('Form Submitted!', formData);
    alert('Job post submitted successfully! Check the console for the data.');
  };

  return (

    <div className="h-[80vh] overflow-y-scroll">
      <div className="w-20">
        <Button
          asChild
          variant="outline"
          className="flex items-center gap-2 bg-slate-900 text-white hover:bg-slate-800 hover:text-white"
        >
          <Link href="/admin/dashboard/jobs">
            <CircleArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>
      </div>
      <div className="w-full max-w-7xl shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-white-800">Post a Job</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Name */}
          <div className="space-y-2">
            <label htmlFor="companyName" className="font-medium">Company Name</label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              placeholder="Enter company name"
              value={formData.companyName}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 bg-white-100 dark:bg-gray-950 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Job Profile */}
          <div className="space-y-2">
            <label htmlFor="jobProfile" className="font-medium">Job Profile</label>
            <input
              type="text"
              id="jobProfile"
              name="jobProfile"
              placeholder="e.g. Software Engineer"
              value={formData.jobProfile}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 bg-white-100 dark:bg-gray-950 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>


          {/* Compensation Type */}
          <div className="space-y-2 md:col-span-2">
            <label className="font-medium">Stipend</label>
            <div className="flex gap-6">
              <label htmlFor="paid" className="flex items-center gap-2">
                <input
                  type="radio"
                  id="paid"
                  name="compensationType"
                  value="paid"
                  checked={formData.compensationType === 'paid'}
                  onChange={handleChange}
                /> Paid
              </label>
              <label htmlFor="unpaid" className="flex items-center gap-2">
                <input
                  type="radio"
                  id="unpaid"
                  name="compensationType"
                  value="unpaid"
                  checked={formData.compensationType === 'unpaid'}
                  onChange={handleChange}
                /> Unpaid
              </label>
            </div>
          </div>

          {/* Salary */}
          <div className="space-y-2">
            <label htmlFor="salary" className="font-medium">Salary / Stipend (if Paid)</label>
            <input
              type="text"
              id="salary"
              name="salary"
              placeholder="e.g. ₹10,000 per month or 5–7 LPA"
              value={formData.salary}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 bg-white-100 dark:bg-gray-950 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Job Type */}
          <div className="space-y-2">
            <label htmlFor="jobType" className="font-medium">Job Type</label>
            <select
              id="jobType"
              name="jobType"
              value={formData.jobType}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 bg-white-100 dark:bg-gray-950 focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option>Internship</option>
              <option>Full-time</option>
              <option>Part-time</option>
            </select>
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <label htmlFor="experienceLevel" className="font-medium">Experience Level</label>
            <select
              id="experienceLevel"
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 bg-white-100 dark:bg-gray-950 focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option>0–1 years</option>
              <option>1–3 years</option>
              <option>3–5 years</option>
              <option>5+ years</option>
            </select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label htmlFor="location" className="font-medium">Location</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 bg-white-100 dark:bg-gray-950 focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option>On-site</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
          </div>

          {/* Application Deadline */}
          <div className="space-y-2">
            <label htmlFor="applicationDeadline" className="font-medium">Application Deadline</label>
            <input
              type="date"
              id="applicationDeadline"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 bg-white-100 dark:bg-gray-950 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Number of Openings */}
          <div className="space-y-2">
            <label htmlFor="openings" className="font-medium">Number of Openings</label>
            <input
              type="number"
              id="openings"
              name="openings"
              min="1"
              placeholder="e.g. 3"
              value={formData.openings}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 bg-white-100 dark:bg-gray-950 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Required Skills */}
          <div className="md:col-span-2 space-y-2">
            <label htmlFor="requiredSkills" className="font-medium">Required Skills</label>
            <input
              type="text"
              id="requiredSkills"
              name="requiredSkills"
              placeholder="e.g. React, Node.js, SQL"
              value={formData.requiredSkills}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 bg-white-100 dark:bg-gray-950 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Education */}
          <div className="space-y-2">
            <label htmlFor="education" className="font-medium">Education Qualification</label>
            <select
              id="education"
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 bg-white-100 dark:bg-gray-950 focus:ring-2 focus:ring-amber-500 outline-none"
            >
              <option>Any Graduate</option>
              <option>B.Tech / BE</option>
              <option>MBA</option>
              <option>MCA</option>
              <option>Other</option>
            </select>
          </div>

          {/* Contact Email */}
          <div className="md:col-span-2 space-y-2">
            <label htmlFor="contactEmail" className="font-medium">Contact Email</label>
            <input
              type="text"
              id="contactEmail"
              name="contactEmail"
              placeholder="Enter application link or email"
              value={formData.contactEmail}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 bg-white-100 dark:bg-gray-950 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Job Description */}
          <div className="md:col-span-2 space-y-2">
            <label htmlFor="jobDescription" className="font-medium">Job Description</label>
            <textarea
              id="jobDescription"
              name="jobDescription"
              rows="4"
              placeholder="Describe the role, responsibilities, and expectations..."
              value={formData.jobDescription}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 bg-white-100 dark:bg-gray-950 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}