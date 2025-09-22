"use client";

import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { X, CirclePlus } from "lucide-react";

import FormInput from "./components/FormInput";
import FormSwitch from "./components/FormSwitch";
import FormSelect from "./components/FormSelect";
import FormTextarea from "./components/FormTextarea";

import { workSchema } from "@/schemas/workSchema";

import { usePostWork } from "@/queries/works";

export default function WorkForm() {
    const { mutateAsync: postWork, isPending } = usePostWork();

    const form = useForm({
        resolver: zodResolver(workSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            projectLink: "",
            githubLink: "",
            techStack: "",
            tags: "",
            images: [],
            isFeatured: false,
            priority: "",
            status: "",
        },
    });

    const [previewImages, setPreviewImages] = useState([]);
    const fileInputRef = useRef(null);
    const images = form.watch("images") || [];

    // ✅ Handle preview
    useEffect(() => {
        if (images.length > 0) {
            const previews = images.map((file) => URL.createObjectURL(file));
            setPreviewImages(previews);
            return () => previews.forEach((url) => URL.revokeObjectURL(url));
        } else {
            setPreviewImages([]);
        }
    }, [images]);

    // ✅ Remove one image
    const removeImage = (index) => {
        const updatedImages = [...images];
        updatedImages.splice(index, 1);
        form.setValue("images", updatedImages);
    };

    // ✅ File change
    const handleFileChange = (e) => {
        const newFiles = e.target.files ? Array.from(e.target.files) : [];
        const combinedFiles = [...images, ...newFiles].slice(0, 5);
        form.setValue("images", combinedFiles);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // ✅ Submit
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            if (data.images && data.images.length > 0) {
                data.images.forEach((file) => {
                    formData.append("images", file);
                });
            }
            const payload = { ...data, images: undefined };
            formData.append("data", JSON.stringify(payload));

            await postWork(formData);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-x-6 gap-y-4">
                    {/* Title + Description full width */}
                    <div className="md:col-span-2 space-y-4">
                        <FormInput
                            form={form}
                            name="title"
                            label="Title"
                            placeholder="Enter title"
                        />
                        <FormTextarea
                            form={form}
                            name="description"
                            label="Description"
                            placeholder="Enter description"
                        />
                    </div>
                    <FormInput
                        form={form}
                        name="category"
                        label="Category"
                        placeholder="Project category (e.g., Web/AI)"
                    />
                    <FormInput
                        form={form}
                        name="techStack"
                        label="Tech Stack"
                        placeholder="Technologies used (comma separated)"
                    />
                    <FormInput
                        form={form}
                        name="projectLink"
                        label="Project Link"
                        placeholder="https://example.com"
                    />
                    <FormInput
                        form={form}
                        name="githubLink"
                        label="Github Link"
                        placeholder="https://github.com/username/repo"
                    />
                    <FormSwitch
                        form={form}
                        name="isFeatured"
                        label="Featured Project:"
                    />
                    <FormInput
                        form={form}
                        name="tags"
                        label="Tags"
                        placeholder="Comma separated"
                    />
                    <FormSelect
                        form={form}
                        name="status"
                        label="Status"
                        options={[
                            { value: "draft", label: "Draft" },
                            { value: "published", label: "Published" },
                        ]}
                    />
                    <FormSelect
                        form={form}
                        name="priority"
                        label="Priority"
                        options={[
                            { value: 1, label: "1 (Low)" },
                            { value: 2, label: "2 (Medium)" },
                            { value: 3, label: "3 (High)" },
                        ]}
                        type="number"
                    />

                    {/* Images Upload */}
                    <FormField
                        control={form.control}
                        name="images"
                        render={() => (
                            <FormItem className="md:col-span-2">
                                <FormLabel>Images</FormLabel>
                                <FormControl>
                                    <>
                                        <input
                                            id="imagesUpload"
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor="imagesUpload"
                                            className="flex items-center justify-center w-full p-2 border border-dashed border-gray-600 rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 cursor-pointer transition"
                                        >
                                            <div>
                                                <span className="flex justify-center items-center text-sm">
                                                    <CirclePlus className="mr-2 h-4 w-4" />
                                                    Add Images
                                                </span>
                                                <p className="text-sm text-gray-300 mt-1">
                                                    {images.length} / 5 images
                                                    selected
                                                </p>
                                            </div>
                                        </label>
                                    </>
                                </FormControl>
                                <FormMessage />
                                <p className="text-sm text-gray-400 mt-1">
                                    Upload 1-5 images. You can add more images
                                    one by one.
                                </p>

                                {previewImages.length > 0 && (
                                    <div className="mt-3 flex flex-wrap gap-3">
                                        {previewImages.map((src, idx) => (
                                            <div key={idx} className="relative">
                                                <Image
                                                    src={src}
                                                    width={500}
                                                    height={500}
                                                    alt={`Preview ${idx + 1}`}
                                                    className="w-36 h-36 object-cover rounded border border-gray-600"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        removeImage(idx)
                                                    }
                                                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-700"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </FormItem>
                        )}
                    />
                </div>

                <Button type="submit" className="w-full hover:cursor-pointer">
                    {isPending ? "Posting..." : "Post Project"}
                </Button>
            </form>
        </Form>
    );
}
