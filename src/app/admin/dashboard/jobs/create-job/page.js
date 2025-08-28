export default function JobPostForm() {
  return (
    <div className="h-[80vh] overflow-y-scroll ">
      <div className="w-full max-w-5x1 bg-white shadow-xl rounded-2xl p-8">
        {/* Title */}
        <h2 className="text-2xl font-bold text-center mb-8">Post a Job</h2>

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company Name */}
          <div className="space-y-2">
            <label className="font-medium text-base">Name of Company*</label>
            <input
              type="text"
              placeholder="Enter company name"
              className="w-full border rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Job Profile */}
          <div className="space-y-2">
            <label className="font-medium text-base">Job Profile*</label>
            <input
              type="text"
              placeholder="Enter job profile"
              className="w-full border rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Job Category */}
          <div className="space-y-2">
            <label className="font-medium text-base">Job Category</label>
            <input
              type="text"
              placeholder="Web Development, Data Science, etc."
              className="w-full border rounded-lg px-4 py-2 text-base hover:bg-gray-100 outline-none"
            />
          </div>

          {/* Stipend */}
          <div className="space-y-2">
            <label className="font-medium text-base">Stipend</label>
            <div className="flex gap-4 mt-1">
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="stipend" value="paid" defaultChecked />
                Paid
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="stipend" value="unpaid" />
                Unpaid
              </label>
            </div>
          </div>

          {/* Job Type */}
          <div className="space-y-2">
            <label className="font-medium text-base">Job Type</label>
            <div className="flex flex-wrap gap-4 mt-1 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Internship
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Full Time
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Include All
              </label>
            </div>
          </div>

          {/* Experience Level */}
          <div className="space-y-2">
            <label className="font-medium text-base">Experience Level</label>
            <div className="flex flex-wrap gap-4 mt-1 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Freshers
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                1-2 years
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                3-5 years
              </label>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="font-medium text-base">Location</label>
            <input
              type="text"
              placeholder="Enter job location"
              className="w-full border rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Salary */}
          <div className="space-y-2">
            <label className="font-medium text-base">Salary</label>
            <input
              type="text"
              placeholder="Enter salary (e.g. 5 LPA)"
              className="w-full border rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Job Description */}
          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="font-medium text-base">Job Description</label>
            <textarea
              rows="4"
              placeholder="Enter job description"
              className="w-full border rounded-lg px-4 py-2 text-base focus:ring-2 focus:ring-blue-500 outline-none"
            ></textarea>
          </div>

          {/* Submit Button (Full Row) */}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              className="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Post Job →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
