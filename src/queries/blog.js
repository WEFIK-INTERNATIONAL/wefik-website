import { toast } from "sonner";
import { queryKeys } from "@/lib/queryKeys";
import blogServices from "@/services/BlogService"; // 👈 you need to create this
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* ----------------- Get All Blogs ----------------- */
export const useGetBlogs = (page, limit, search, sort) => {
  return useQuery({
    queryKey: [queryKeys.blogs, page, limit, search, sort],
    queryFn: async () => {
      const res = await blogServices.getBlogs({ page, limit, search, sort });
      return res;
    },
    keepPreviousData: true,
  });
};

/* ----------------- Get Blog By Id ----------------- */
export const useGetBlogById = (id) => {
  return useQuery({
    queryKey: [queryKeys.blogs, id],
    queryFn: async () => {
      const res = await blogServices.getBlogById(id);
      return res;
    },
  });
};

/* ----------------- Create Blog ----------------- */
export const useCreateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data) => {
      await blogServices.createBlog(data);
    },
    onSuccess: () => {
      toast.success("Blog created successfully ✅");
      queryClient.invalidateQueries([queryKeys.blogs]);
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || "Failed to create blog ❌");
    },
  });
};

/* ----------------- Delete Blog ----------------- */
export const useDeleteBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => blogServices.deleteBlog(id),
    onSuccess: () => {
      toast.success("Blog deleted successfully 🗑️");
      queryClient.invalidateQueries([queryKeys.blogs]);
    },
    onError: () => {
      toast.error("Failed to delete blog ❌");
    },
  });
};

/* ----------------- Update Blog ----------------- */
export const useUpdateBlog = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }) => {
      const res = await blogServices.updateBlog(id, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Blog updated successfully ✅");
      queryClient.invalidateQueries([queryKeys.blogs]);
    },
    onError: () => {
      toast.error("Failed to update blog ❌");
    },
  });
};

/* ----------------- Update Blog Status ----------------- */
export const useUpdateBlogStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await blogServices.updateBlogStatus(id, status);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Blog status updated successfully ✅");
      queryClient.invalidateQueries([queryKeys.blogs]);
    },
    onError: () => {
      toast.error("Failed to update blog status ❌");
    },
  });
};

/* ----------------- Search Blog ----------------- */
export const useSearchBlog = (filters) => {
  return useQuery({
    queryKey: [queryKeys.blogs, filters],
    queryFn: async () => {
      const res = await blogServices.searchBlog(filters);
      return res;
    },
    keepPreviousData: true,
  });
};
