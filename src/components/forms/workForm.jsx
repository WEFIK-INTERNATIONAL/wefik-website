"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { usePostWork, useUpdateWork } from "@/queries/works";

const workFormSchema = z.object({
    title: z.string().min(1, "Title is required."),
    description: z.string().min(1, "Description is required."),
    category: z.string().min(1, "Category is required."),
    tags: z.string().optional(),
    techStack: z.string().optional(),
    projectLink: z
        .string()
        .url("Please enter a valid URL.")
        .optional()
        .or(z.literal("")),
    githubLink: z
        .string()
        .url("Please enter a valid URL.")
        .optional()
        .or(z.literal("")),
    image: z
        .any()
        .optional()
        .refine(
            (files) =>
                !files || files.length === 0 || files?.[0]?.size <= 5000000,
            `Max file size is 5MB.`
        )
        .refine(
            (files) =>
                !files ||
                files.length === 0 ||
                ["image/jpeg", "image/png", "image/webp"].includes(
                    files?.[0]?.type
                ),
            "Only .jpg, .png, and .webp formats are supported."
        ),
    isFeatured: z.boolean().default(false),
    priority: z.coerce.number().min(1).max(5).default(5),
    status: z.enum(["draft", "public", "private"]).default("draft"),
});

export default function WorkForm({ work = null }) {
    const { mutateAsync: postWork } = usePostWork();
    const { mutateAsync: updateWork } = useUpdateWork();

    const isEditMode = Boolean(work);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(workFormSchema),
    });

    useEffect(() => {
        if (isEditMode) {
            const defaultValues = {
                ...work,
                tags: work.tags?.join(", "),
                techStack: work.techStack?.join(", "),
                image: undefined,
            };
            reset(defaultValues);
        } else {
            reset({
                isFeatured: false,
                priority: 5,
                status: "draft",
                projectLink: "",
                githubLink: "",
                title: "",
                description: "",
                category: "",
                tags: "",
                techStack: "",
            });
        }
    }, [work, isEditMode, reset]);

    const onSubmit = (data) => {
        const formDataForApi = {
            ...data,
            tags:
                data.tags
                    ?.split(",")
                    .map((tag) => tag.trim())
                    .filter(Boolean) || [],
            techStack:
                data.techStack
                    ?.split(",")
                    .map((tech) => tech.trim())
                    .filter(Boolean) || [],
        };

        if (data.image && data.image.length > 0) {
            formDataForApi.imageFile = data.image[0];
        }
        delete formDataForApi.image;

        if (isEditMode) {
            updateWork({ id: work._id, data: formDataForApi });
        } else {
            postWork(formDataForApi);
        }
    };

    return (
        <div className="bg-gray-900 w-full p-4 sm:p-8">
            <div className="w-full max-w-3xl mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
                {/* 5. Conditional Title */}
                <h1 className="text-2xl font-bold text-white mb-6">
                    {isEditMode ? "Edit Work" : "Create New Work"}
                </h1>

                {/* Display current image in edit mode */}
                {isEditMode && work.images?.url && (
                    <div className="mb-4">
                        <p className="text-sm font-medium text-gray-300 mb-2">
                            Current Image:
                        </p>
                        <img
                            src={work.images.url}
                            alt={work.title}
                            className="max-w-xs rounded-md"
                        />
                    </div>
                )}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-6"
                    noValidate
                >
                    {/* ... all form fields remain the same ... */}
                    {/* Title */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium text-gray-200 mb-1"
                        >
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            {...register("title")}
                            className="w-full bg-gray-700 text-white border-gray-600 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.title && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-200 mb-1"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            rows={4}
                            {...register("description")}
                            className="w-full bg-gray-700 text-white border-gray-600 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        {errors.description && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Category */}
                        <div>
                            <label
                                htmlFor="category"
                                className="block text-sm font-medium text-gray-200 mb-1"
                            >
                                Category
                            </label>
                            <input
                                id="category"
                                type="text"
                                {...register("category")}
                                className="w-full bg-gray-700 text-white border-gray-600 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.category && (
                                <p className="mt-1 text-sm text-red-400">
                                    {errors.category.message}
                                </p>
                            )}
                        </div>

                        {/* Tech Stack */}
                        <div>
                            <label
                                htmlFor="techStack"
                                className="block text-sm font-medium text-gray-200 mb-1"
                            >
                                Tech Stack (comma-separated)
                            </label>
                            <input
                                id="techStack"
                                type="text"
                                {...register("techStack")}
                                className="w-full bg-gray-700 text-white border-gray-600 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label
                            htmlFor="tags"
                            className="block text-sm font-medium text-gray-200 mb-1"
                        >
                            Tags (comma-separated)
                        </label>
                        <input
                            id="tags"
                            type="text"
                            {...register("tags")}
                            className="w-full bg-gray-700 text-white border-gray-600 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Project Link */}
                        <div>
                            <label
                                htmlFor="projectLink"
                                className="block text-sm font-medium text-gray-200 mb-1"
                            >
                                Project Link
                            </label>
                            <input
                                id="projectLink"
                                type="url"
                                {...register("projectLink")}
                                className="w-full bg-gray-700 text-white border-gray-600 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.projectLink && (
                                <p className="mt-1 text-sm text-red-400">
                                    {errors.projectLink.message}
                                </p>
                            )}
                        </div>

                        {/* Github Link */}
                        <div>
                            <label
                                htmlFor="githubLink"
                                className="block text-sm font-medium text-gray-200 mb-1"
                            >
                                GitHub Link
                            </label>
                            <input
                                id="githubLink"
                                type="url"
                                {...register("githubLink")}
                                className="w-full bg-gray-700 text-white border-gray-600 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                            {errors.githubLink && (
                                <p className="mt-1 text-sm text-red-400">
                                    {errors.githubLink.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label
                            htmlFor="image"
                            className="block text-sm font-medium text-gray-200 mb-1"
                        >
                            {isEditMode
                                ? "Upload New Cover Image (Optional)"
                                : "Cover Image"}
                        </label>
                        <input
                            id="image"
                            type="file"
                            accept="image/png, image/jpeg, image/webp"
                            {...register("image")}
                            className="w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                        />
                        {errors.image && (
                            <p className="mt-1 text-sm text-red-400">
                                {errors.image.message}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
                        {/* Status, Priority, isFeatured */}
                        <div>
                            <label
                                htmlFor="status"
                                className="block text-sm font-medium text-gray-200 mb-1"
                            >
                                Status
                            </label>
                            <select
                                id="status"
                                {...register("status")}
                                className="w-full bg-gray-700 text-white border-gray-600 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="draft">Draft</option>
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                        </div>
                        <div>
                            <label
                                htmlFor="priority"
                                className="block text-sm font-medium text-gray-200 mb-1"
                            >
                                Priority
                            </label>
                            <select
                                id="priority"
                                {...register("priority")}
                                className="w-full bg-gray-700 text-white border-gray-600 rounded-md p-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value={1}>1 (Highest)</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5 (Lowest)</option>
                            </select>
                        </div>
                        <div className="flex items-center pt-6">
                            <input
                                id="isFeatured"
                                type="checkbox"
                                {...register("isFeatured")}
                                className="h-5 w-5 bg-gray-700 text-blue-600 border-gray-600 rounded focus:ring-blue-500"
                            />
                            <label
                                htmlFor="isFeatured"
                                className="ml-2 text-sm font-medium text-gray-200"
                            >
                                Feature this work?
                            </label>
                        </div>
                    </div>

                    {/* 6. Conditional Button Text */}
                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500"
                        >
                            {isEditMode ? "Update Work" : "Submit Work"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
