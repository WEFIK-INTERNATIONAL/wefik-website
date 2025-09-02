export default function JobPostForm() {
  return (
    <div className="h-[80vh] overflow-y-scroll">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Post a Job</h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Name */}
          <div className="space-y-2">
            <label className="font-medium">Company Name</label>
            <input
              type="text"
              placeholder="Enter company name"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Company Website */}
          <div className="space-y-2">
            <label className="font-medium">Company Website / LinkedIn</label>
            <input
              type="url"
              placeholder="https://example.com"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Job Profile */}
          <div className="space-y-2">
            <label className="font-medium">Job Profile</label>
            <input
              type="text"
              placeholder="e.g. Software Engineer"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Job Category */}
          <div className="space-y-2">
            <label className="font-medium">Job Category</label>
            <select className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none">
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
                <input type="radio" name="compensation" value="paid" /> Paid
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="compensation" value="unpaid" /> Unpaid
              </label>
            </div>
          </div>

          {/* Salary */}
          <div className="space-y-2">
            <label className="font-medium">Salary / Stipend (if Paid)</label>
            <input
              type="text"
              placeholder="e.g. ₹10,000 per month or 5–7 LPA"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Job Type */}
          <div className="space-y-2">
            <label className="font-medium">Job Type</label>
            <select className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none">
              <option>Internship</option>
              <option>Full-time</option>
              <option>Part-time</option>
            </select>
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <label className="font-medium">Experience Level</label>
            <select className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none">
              <option>0–1 years</option>
              <option>1–3 years</option>
              <option>3–5 years</option>
              <option>5+ years</option>
            </select>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="font-medium">Location</label>
            <select className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none">
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
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Number of Openings */}
          <div className="space-y-2">
            <label className="font-medium">Number of Openings</label>
            <input
              type="number"
              min="1"
              placeholder="e.g. 3"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Required Skills */}
          <div className="md:col-span-2 space-y-2">
            <label className="font-medium">Required Skills</label>
            <input
              type="text"
              placeholder="e.g. React, Node.js, SQL"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Education */}
          <div className="space-y-2">
            <label className="font-medium">Education Qualification</label>
            <select className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none">
              <option>Any Graduate</option>
              <option>B.Tech / BE</option>
              <option>MBA</option>
              <option>MCA</option>
              <option>Other</option>
            </select>
          </div>

          {/* Apply Link */}
          <div className="md:col-span-2 space-y-2">
            <label className="font-medium">Contact Email</label>
            <input
              type="text"
              placeholder="Enter application link or email"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Job Description */}
          <div className="md:col-span-2 space-y-2">
            <label className="font-medium">Job Description</label>
            <textarea
              rows="4"
              placeholder="Describe the role, responsibilities, and expectations..."
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-amber-500 outline-none"
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
