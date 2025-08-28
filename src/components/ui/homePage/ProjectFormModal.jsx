"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";
import toast from "react-hot-toast";

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.9, y: 30 },
};

export default function ProjectFormModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    customProjectType: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => document.body.classList.remove("overflow-hidden");
  }, [open]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (open) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      toast.error("Please enter a valid email.");
      return;
    }

    setLoading(true);

    const projectTypeToSend =
      formData.projectType === "Other"
        ? formData.customProjectType
        : formData.projectType;

    const dataToSend = { ...formData, projectType: projectTypeToSend };

    try {
      await emailjs.send("service_qkqgbfq", "template_1xmli35", dataToSend, "");

      toast.success("✅ Project request sent! We'll contact you soon.");
      setFormData({
        name: "",
        email: "",
        projectType: "",
        customProjectType: "",
        message: "",
      });
      onClose();
    } catch (error) {
      toast.error("⚡Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div className="font-neue fixed inset-0 w-screen h-screen z-[999999]">
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-form-title"
              className="bg-black border border-white/10 rounded-xl shadow-2xl p-8 text-white w-full max-w-lg max-h-[90vh] overflow-y-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2
                id="project-form-title"
                className="text-3xl font-bold mb-6 text-lime-400"
              >
                Start a Project
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded border border-white/20 bg-transparent focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none"
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded border border-white/20 bg-transparent focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none"
                  required
                />

                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded border border-white/20 bg-black focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none"
                  required
                >
                  <option value="">Select Project Type</option>
                  <option value="Website">Website</option>
                  <option value="Branding">Branding</option>
                  <option value="Shopify">Shopify Store</option>
                  <option value="UI/UX">UI/UX Design</option>
                  <option value="Other">Other</option>
                </select>

                <AnimatePresence>
                  {formData.projectType === "Other" && (
                    <motion.input
                      type="text"
                      name="customProjectType"
                      placeholder="Enter your project type"
                      value={formData.customProjectType}
                      onChange={handleChange}
                      className="w-full px-5 py-3 rounded border border-white/20 bg-transparent focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      required
                    />
                  )}
                </AnimatePresence>
                <textarea
                  name="message"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-5 py-3 rounded border border-white/20 bg-transparent focus:ring-2 focus:ring-lime-400 focus:border-lime-400 outline-none"
                  rows={4}
                  required
                />
                <div className="flex justify-end gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 rounded-full border border-white/30 text-white hover:bg-white/10 transition"
                    disabled={loading}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-6 py-2 rounded-full font-semibold transition ${
                      loading
                        ? "bg-gray-500 cursor-not-allowed text-white"
                        : "bg-lime-400 text-black hover:bg-lime-500"
                    }`}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <svg
                          className="animate-spin h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      "Send"
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
