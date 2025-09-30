"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import RichTextEditor from "./RichTextEditor";

import { useCreateBlog, useUpdateBlog } from "@/queries/blog";
import FormInput from "./components/FormInput";
import FormSelect from "./components/FormSelect";

import { BlogSchema } from "@/schemas/blogSchema";

export default function BlogPostForm({ blog = null }) {
  const router = useRouter();
  const { mutate: createBlog, isPending: isCreating } = useCreateBlog();
  const { mutate: updateBlog, isPending: isUpdating } = useUpdateBlog();

  // Normalizing blog for edit
  const normalizeBlog = (b) => {
    if (!b) return {};
    return {
      ...b,
      status: b.status || "Draft",
    };
  };

  const defaultValues = useMemo(
    () => ({
      title: "",
      content: "",
      category: "",
      author: "",
      status: "Draft",
      ...normalizeBlog(blog),
    }),
    [blog]
  );

  const form = useForm({
    resolver: zodResolver(BlogSchema),
    defaultValues,
  });

  const { control, handleSubmit } = form;

  const onSubmit = (values) => {
    console.log(values);
    
    const payload = {
      ...values,
      createdAt: blog?.createdAt || new Date(),
    };
        
    if (blog) { 
      updateBlog(
        { id: blog._id, data: payload },
      );
    } else {
      createBlog(payload);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-x-6 gap-y-6">
          {/* Blog Title */}
          <FormInput
            form={form}
            name="title"
            label="Title"
            placeholder="Enter blog title"
            className="col-span-2"
          />

          {/* Category */}
          <FormInput
            form={form}
            name="category"
            label="Category"
            placeholder="e.g. Technology, Lifestyle"
          />

          {/* Author */}
          <FormInput
            form={form}
            name="author"
            label="Author"
            placeholder="Enter author name"
          />

          {/* Status */}
          <FormSelect
            form={form}
            name="status"
            label="Status"
            options={[
              { label: "Draft", value: "Draft" },
              { label: "Published", value: "Published" },
              { label: "Archived", value: "Archived" },
            ]}
            className="w-full"
          />

          {/* Content */}
          <div className="col-span-2">
            <Controller
              control={control}
              name="content"
              render={({ field }) => (
                <RichTextEditor value={field.value} onChange={field.onChange} />
              )}
            />
          </div>

          {/* Submit */}
          <div className="md:col-span-2 flex justify-end gap-4">
            <Button
              type="submit"
              className="px-8 py-2 rounded-lg hover:cursor-pointer"
              // disabled={isCreating || isUpdating}
            >
              {blog
                ? isUpdating
                  ? "Updating..."
                  : "Update Blog"
                : isCreating
                ? "Publishing..."
                : "Publish Blog"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
