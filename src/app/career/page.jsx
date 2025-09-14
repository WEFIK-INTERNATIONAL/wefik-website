"use client"
import React, { useState } from "react";
import { useClientContext } from "@/contexts";

const Page = () => {
  const { jobs } = useClientContext();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  // Static fallback categories
  const staticCategories = ["Development", "Design", "Marketing", "Customer Service", "HR", "Other"]

  // Collect & sanitize categories from DB
  const dynamicCategories = Array.from(
    new Set(
      jobs
        .map((job) => job.jobCategory)
        .filter((c) => c && c.trim() !== "")
        .map((c) => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase())
    )
  );

  // Merge static + dynamic, remove duplicates
  const categories = ["All", ...new Set([...staticCategories, ...dynamicCategories])];

  // Filter jobs
  const filteredJobs = jobs.filter((job) => {
    const matchesCategory =
      selectedCategory === "All" || job.jobCategory?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = job.jobProfile
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Show limited jobs
  const visibleJobs = filteredJobs.slice(0, visibleCount);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-[30px]">
      {/* Filter Bar */}
      <div className="flex flex-col gap-4 mb-8">
        {/* Category Buttons - Scrollable on Mobile */}
        <div className="flex overflow-x-auto whitespace-nowrap gap-3 pb-2 scrollbar-hide">
          {categories.map((cat, index) => (
            <button
              key={`${cat}-${index}`}
              onClick={() => {
                setSelectedCategory(cat);
                setVisibleCount(4); // reset count on filter change
              }}
              className={`px-4 py-1.5 rounded-full border text-sm transition shrink-0 ${selectedCategory === cat
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-100"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Box */}
        <div>
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setVisibleCount(4); // reset count on search
            }}
            className="w-full md:w-auto border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>
      </div>

      {/* Job List */}
      <div className="space-y-6">
        {visibleJobs.length > 0 ? (
          visibleJobs.map((job) => (
            <div
              key={job._id}
              className="flex justify-between items-start border-b pb-6"
            >
              {/* Left Content */}
              <div>
                <h2 className="text-lg font-semibold">{job.jobProfile}</h2>
                <p className="text-gray-600 mt-1 mb-3">{job.description}</p>
                <div className="flex gap-3">
                  <span className="px-3 py-1 text-sm rounded-full border text-gray-700">
                    {job.location}
                  </span>
                  <span className="px-3 py-1 text-sm rounded-full border text-gray-700">
                    {job.type}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Posted on: {new Date(job.createdAt).toLocaleDateString()}
                </p>
              </div>

              {/* Right Apply Link */}
              <div>
                <a
                  href={`/apply/${job._id}`}
                  className="text-[#9AE600] font-medium hover:underline flex items-center gap-1"
                >
                  Apply <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No jobs found.</p>
        )}
      </div>

      {/* Show More / Show Less */}
      {filteredJobs.length > 4 && (
        <div className="flex justify-center mt-6">
          {visibleCount < filteredJobs.length ? (
            <button
              onClick={() => setVisibleCount(filteredJobs.length)}
              className="px-5 py-2 border rounded-full text-sm hover:bg-gray-100"
            >
              Show More Jobs
            </button>
          ) : (
            <button
              onClick={() => setVisibleCount(3)}
              className="px-5 py-2 border rounded-full text-sm hover:bg-gray-100"
            >
              Show Less
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;
