"use client";
// Note: This component uses mock services for demonstration.
import { useState, useEffect } from "react";

export default function EditJobForm() {
  // Mock job ID - in real Next.js app, this would come from useParams()
  const jobId = "123";

  const [formData, setFormData] = useState({
    companyName: "",
    companyWebsite: "",
    jobProfile: "",
    jobCategory: "Software Development",
    compensation: "paid",
    salary: "",
    jobType: "Full-time",
    experienceLevel: "0–1 years",
    location: "On-site",
    applicationDeadline: "",
    numberOfOpenings: "1",
    requiredSkills: "",
    education: "Any Graduate",
    contactEmail: "",
    jobDescription: ""
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [originalData, setOriginalData] = useState({});

  // Mock JobService methods (replace with your actual service)
  const mockJobService = {
    async getJobById(id) {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: {
              companyName: "TechCorp Solutions",
              companyWebsite: "https://techcorp.com",
              jobProfile: "Senior Software Engineer",
              jobCategory: "Software Development",
              compensation: "paid",
              salary: "₹15,00,000 - ₹20,00,000 per annum",
              jobType: "Full-time",
              experienceLevel: "3–5 years",
              location: "Hybrid",
              applicationDeadline: "2025-10-15",
              numberOfOpenings: 2,
              requiredSkills: "React, Node.js, TypeScript, AWS, MongoDB",
              education: "B.Tech / BE",
              contactEmail: "careers@techcorp.com",
              jobDescription: "We are looking for a Senior Software Engineer to join our dynamic team. The role involves developing scalable web applications using modern technologies, collaborating with cross-functional teams, and mentoring junior developers."
            }
          });
        }, 1000);
      });
    },

    async updateJob(id, data) {
      // Simulate API call
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log("Mock API Update:", { id, data });
          resolve({ success: true });
        }, 1000);
      });
    }
  };

  // Fetch job data on component mount
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // In real app, replace mockJobService with your actual jobServices import
        const response = await mockJobService.getJobById(jobId);
        const jobData = response.data || response;
        
        // Map the API response to your form structure
        const mappedData = {
          companyName: jobData.companyName || "",
          companyWebsite: jobData.companyWebsite || "",
          jobProfile: jobData.jobProfile || "",
          jobCategory: jobData.jobCategory || "Software Development",
          compensation: jobData.compensation || "paid",
          salary: jobData.salary || "",
          jobType: jobData.jobType || "Full-time",
          experienceLevel: jobData.experienceLevel || "0–1 years",
          location: jobData.location || "On-site",
          applicationDeadline: jobData.applicationDeadline ? jobData.applicationDeadline.split('T')[0] : "",
          numberOfOpenings: jobData.numberOfOpenings?.toString() || "1",
          requiredSkills: jobData.requiredSkills || "",
          education: jobData.education || "Any Graduate",
          contactEmail: jobData.contactEmail || "",
          jobDescription: jobData.jobDescription || ""
        };
        
        setFormData(mappedData);
        setOriginalData(mappedData);
      } catch (error) {
        console.error("Error fetching job data:", error);
        setError("Failed to load job data. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobData();
  }, [jobId]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setError(null);

      // In real app, replace mockJobService with your actual jobServices import
      const response = await mockJobService.updateJob(jobId, formData);
      
      // Show success message
      alert("Job post updated successfully!");
      
      // In real Next.js app, this would be: router.push("/admin/dashboard/jobs")
      console.log("Would navigate to jobs list");
      
    } catch (error) {
      console.error("Error updating job:", error);
      setError("Failed to update job. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // In real Next.js app, this would be: router.back()
    console.log("Would navigate back");
    alert("Cancelled - would navigate back in real app");
  };

  const handleReset = () => {
    // Reset to original data
    setFormData({ ...originalData });
  };

  if (isLoading) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading job data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[80vh] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">
            <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const inputClass = "w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none bg-white";

  return (
    <div className="h-[80vh] overflow-y-scroll">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Edit Job Post</h2>
          <div className="flex gap-2">
            <button
              onClick={handleReset}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              disabled={isSaving}
            >
              Reset
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition disabled:bg-green-400"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Name */}
          <div className="space-y-2">
            <label className="font-medium">Company Name</label>
            <input
              type="text"
              value={formData.companyName}
              onChange={(e) => handleInputChange("companyName", e.target.value)}
              className={inputClass}
              required
            />
          </div>

          {/* Company Website */}
          <div className="space-y-2">
            <label className="font-medium">Company Website / LinkedIn</label>
            <input
              type="url"
              value={formData.companyWebsite}
              onChange={(e) => handleInputChange("companyWebsite", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Job Profile */}
          <div className="space-y-2">
            <label className="font-medium">Job Profile</label>
            <input
              type="text"
              value={formData.jobProfile}
              onChange={(e) => handleInputChange("jobProfile", e.target.value)}
              className={inputClass}
              required
            />
          </div>

          {/* Job Category */}
          <div className="space-y-2">
            <label className="font-medium">Job Category</label>
            <select
              value={formData.jobCategory}
              onChange={(e) => handleInputChange("jobCategory", e.target.value)}
              className={inputClass}
            >
              <option>Software Development</option>
              <option>Data Science</option>
              <option>Marketing</option>
              <option>Design</option>
              <option>Other</option>
            </select>
          </div>

          {/* Compensation Type */}
          <div className="space-y-2 md:col-span-2">
            <label className="font-medium">Stipend</label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="compensation"
                  value="paid"
                  checked={formData.compensation === "paid"}
                  onChange={(e) => handleInputChange("compensation", e.target.value)}
                />
                Paid
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="compensation"
                  value="unpaid"
                  checked={formData.compensation === "unpaid"}
                  onChange={(e) => handleInputChange("compensation", e.target.value)}
                />
                Unpaid
              </label>
            </div>
          </div>

          {/* Salary */}
          <div className="space-y-2">
            <label className="font-medium">Salary / Stipend (if Paid)</label>
            <input
              type="text"
              value={formData.salary}
              onChange={(e) => handleInputChange("salary", e.target.value)}
              className={inputClass}
              placeholder="e.g. ₹10,000 per month or 5–7 LPA"
            />
          </div>

          {/* Job Type */}
          <div className="space-y-2">
            <label className="font-medium">Job Type</label>
            <select
              value={formData.jobType}
              onChange={(e) => handleInputChange("jobType", e.target.value)}
              className={inputClass}
            >
              <option>Internship</option>
              <option>Full-time</option>
              <option>Part-time</option>
            </select>
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <label className="font-medium">Experience Level</label>
            <select
              value={formData.experienceLevel}
              onChange={(e) => handleInputChange("experienceLevel", e.target.value)}
              className={inputClass}
            >
              <option>0–1 years</option>
              <option>1–3 years</option>
              <option>3–5 years</option>
              <option>5+ years</option>
            </select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="font-medium">Location</label>
            <select
              value={formData.location}
              onChange={(e) => handleInputChange("location", e.target.value)}
              className={inputClass}
            >
              <option>On-site</option>
              <option>Remote</option>
              <option>Hybrid</option>
            </select>
          </div>

          {/* Application Deadline */}
          <div className="space-y-2">
            <label className="font-medium">Application Deadline</label>
            <input
              type="date"
              value={formData.applicationDeadline}
              onChange={(e) => handleInputChange("applicationDeadline", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Number of Openings */}
          <div className="space-y-2">
            <label className="font-medium">Number of Openings</label>
            <input
              type="number"
              min="1"
              value={formData.numberOfOpenings}
              onChange={(e) => handleInputChange("numberOfOpenings", e.target.value)}
              className={inputClass}
            />
          </div>

          {/* Required Skills */}
          <div className="md:col-span-2 space-y-2">
            <label className="font-medium">Required Skills</label>
            <input
              type="text"
              value={formData.requiredSkills}
              onChange={(e) => handleInputChange("requiredSkills", e.target.value)}
              className={inputClass}
              placeholder="e.g. React, Node.js, SQL"
            />
          </div>

          {/* Education */}
          <div className="space-y-2">
            <label className="font-medium">Education Qualification</label>
            <select
              value={formData.education}
              onChange={(e) => handleInputChange("education", e.target.value)}
              className={inputClass}
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
            <label className="font-medium">Contact Email</label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => handleInputChange("contactEmail", e.target.value)}
              className={inputClass}
              required
            />
          </div>

          {/* Job Description */}
          <div className="md:col-span-2 space-y-2">
            <label className="font-medium">Job Description</label>
            <textarea
              rows="4"
              value={formData.jobDescription}
              onChange={(e) => handleInputChange("jobDescription", e.target.value)}
              className={inputClass}
              placeholder="Describe the role, responsibilities, and expectations..."
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="md:col-span-2 flex justify-end gap-2 pt-6 border-t">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
              disabled={isSaving}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="bg-amber-600 text-white px-6 py-2 rounded-lg hover:bg-amber-700 transition disabled:bg-amber-400"
            >
              {isSaving ? "Updating..." : "Update Job Post"}
            </button>
          </div>
        </div>

        {/* Integration Instructions */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h3 className="font-medium text-blue-800 mb-2">Integration Instructions:</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p><strong>1.</strong> Replace <code>mockJobService</code> with your actual <code>jobServices</code> import</p>
            <p><strong>2.</strong> Add <code>useRouter</code> and <code>useParams</code> from Next.js navigation</p>
            <p><strong>3.</strong> Replace console.log navigation with actual <code>router.push()</code> calls</p>
            <p><strong>4.</strong> The form structure matches your JobService API methods</p>
          </div>
        </div>
      </div>
    </div>
  );
}