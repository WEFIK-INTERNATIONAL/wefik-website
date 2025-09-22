"use client";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { Divide } from "lucide-react";

export default function CreateBlogForm() {
  const initialForm = {
    title: "",
    category: "",
    author: "",
    description: "",
    image: null,
  };

  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full p-3 rounded-lg bg-gray-50 dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-emerald-500 focus:outline-none";

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      const file = files[0];
      setForm((prev) => ({ ...prev, [name]: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setForm(initialForm);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (value) formData.append(key, value);
    });

    try {
      const res = await axios.post("/api/blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(res.data.message || "✅ Blog posted successfully!");
      resetForm();
    } catch (error) {
      console.error("Error:", error);
      alert("❌ " + (error.response?.data?.message || "Failed to post Blog"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[80vh] overflow-y-scroll flex justify-center">
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="bg-white dark:bg-neutral-900 text-black dark:text-white p-8 rounded-2xl w-full max-w-md shadow-lg border border-gray-200 dark:border-neutral-700 transition-colors"
      >
        <h2 className="text-xl font-semibold mb-6 text-center">Create a Blog</h2>

        {/* Blog Title */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">Blog Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Enter your article title"
            className={inputClass}
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Upload Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className={`${inputClass} p-2`}
            required
          />
          {preview && (
            <div className="relative w-full h-40 mt-3 rounded-lg overflow-hidden border dark:border-neutral-700">
              <Image src={preview} alt="Preview" fill style={{ objectFit: "cover" }} priority />
            </div>
          )}
        </div>

        {/* Category */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">Category</label>
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Enter category"
            className={inputClass}
            required
          />
        </div>

        {/* Author */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">Author</label>
          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            placeholder="Enter author name"
            className={inputClass}
            required
          />
        </div>

        {/* Description */}
        <div className="mb-5">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Write your blog content..."
            className={`${inputClass} h-28 resize-none`}
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={resetForm}
            className="px-4 py-2 rounded-md text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 rounded-md font-semibold text-white transition"
          >
            {loading ? "Posting..." : "Post Blog"}
          </button>
        </div>
      </form>
    </div>
  );
}
