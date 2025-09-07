"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleArrowLeft } from "lucide-react";
import jobServices from "@/services/JobServices";
import { toast } from "sonner";

export default function JobPostForm() {
  const [formData, setFormData] = useState({
    jobProfile: "",
    description: "",
    location: "",
    type: "",
    compensationType: "",
    salary: {
      amount: "",
      currency: "",
    },
    experienceLevel: "",
    education: "",
    openings: "",
    skills: "",
    contactEmail: "",
    applicationDeadline: "",
    status: "Open", // backend default
  });

  // Change handler
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount" || name === "currency") {
      setFormData((prev) => ({
        ...prev,
        salary: { ...prev.salary, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.jobProfile || !formData.contactEmail) {
      toast.error("Job Profile and Contact Email are required.");
      return;
    }

    const payload = {
      ...formData,
      salary: {
        amount:
          formData.compensationType === "paid"
            ? Number(formData.salary.amount)
            : 0,
        currency: formData.salary.currency || "INR", // default only if empty
      },
      skills: formData.skills
        .split(",")
        .map((s) => ({ name: s.trim() }))
        .filter((s) => s.name),
      applicationDeadline: formData.applicationDeadline
        ? new Date(formData.applicationDeadline)
        : null,
    };

    try {
      console.log("Submitting job:", payload);
      await jobServices.createJob(payload);
      toast.success("Job created successfully!");
      setFormData({
        jobProfile: "",
        description: "",
        location: "",
        type: "",
        compensationType: "",
        salary: { amount: "", currency: "" },
        experienceLevel: "",
        education: "",
        openings: "",
        skills: "",
        contactEmail: "",
        applicationDeadline: "",
        status: "Open",
      });
    } catch (err) {
      toast.error("Failed to create job.");
    }
  };

  return (
    <div className="h-[80vh] overflow-y-scroll">
      {/* Back Button */}
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

      {/* Job Post Form */}
      <div className="w-full max-w-7xl shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-white-800">Post a Job</h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Job Profile */}
          <InputField
            label="Job Profile"
            id="jobProfile"
            name="jobProfile"
            value={formData.jobProfile}
            onChange={handleChange}
            placeholder="e.g. Software Engineer"
          />

          {/* Compensation Type */}
          <div className="space-y-2 md:col-span-2">
            <label className="font-medium">Stipend</label>
            <div className="flex gap-6">
              {["paid", "unpaid"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="compensationType"
                    value={type}
                    checked={formData.compensationType === type}
                    onChange={handleChange}
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>
          </div>

          {/* Salary */}
          <InputField
            label="Salary / Stipend (if Paid)"
            id="amount"
            name="amount"
            value={formData.salary.amount}
            onChange={handleChange}
            placeholder="e.g. ₹10,000 per month"
            disabled={formData.compensationType === "unpaid"}
          />

          {/* Job Type */}
          <SelectField
            label="Job Type"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            options={["Internship", "Full-time", "Part-time"]}
          />

          {/* Experience Level */}
          <SelectField
            label="Experience Level"
            id="experienceLevel"
            name="experienceLevel"
            value={formData.experienceLevel}
            onChange={handleChange}
            options={["0–1 years", "1–3 years", "3–5 years", "5+ years"]}
          />

          {/* Location */}
          <SelectField
            label="Location"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            options={["On-site", "Remote", "Hybrid"]}
          />

          {/* Application Deadline */}
          <InputField
            label="Application Deadline"
            type="date"
            id="applicationDeadline"
            name="applicationDeadline"
            value={formData.applicationDeadline}
            onChange={handleChange}
          />

          {/* Openings */}
          <InputField
            label="Number of Openings"
            type="number"
            id="openings"
            name="openings"
            min="1"
            value={formData.openings}
            onChange={handleChange}
            placeholder="e.g. 3"
          />

          {/* Skills */}
          <InputField
            label="Required Skills"
            id="skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="e.g. React, Node.js, SQL"
            className="md:col-span-2"
          />

          {/* Education */}
          <SelectField
            label="Education Qualification"
            id="education"
            name="education"
            value={formData.education}
            onChange={handleChange}
            options={["Any Graduate", "B.Tech / BE", "MBA", "MCA", "BCA", "Other"]}
          />

          {/* Contact Email */}
          <InputField
            label="Contact Email"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleChange}
            placeholder="Enter application link or email"
            className="md:col-span-2"
          />

          {/* Job Description */}
          <div className="md:col-span-2 space-y-2">
            <label htmlFor="description" className="font-medium">
              Job Description
            </label>
            <textarea
              id="description"
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the role, responsibilities, and expectations..."
              className="w-full border rounded-lg px-4 py-2 bg-white-100 dark:bg-gray-950 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Submit */}
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

// 🔹 Helper Components
function InputField({ label, className = "", ...props }) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={props.id} className="font-medium">
        {label}
      </label>
      <input
        {...props}
        className="w-full border rounded-lg px-4 py-2 bg-white-100 dark:bg-gray-950 focus:ring-2 focus:ring-amber-500 outline-none"
      />
    </div>
  );
}

function SelectField({ label, options, className = "", ...props }) {
  return (
    <div className={`space-y-2 ${className}`}>
      <label htmlFor={props.id} className="font-medium">
        {label}
      </label>
      <select
        {...props}
        className="w-full border rounded-lg px-4 py-2 bg-white-100 dark:bg-gray-950 focus:ring-2 focus:ring-amber-500 outline-none"
      >
        <option value="">-- Select --</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
