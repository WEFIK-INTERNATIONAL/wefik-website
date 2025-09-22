import { toast } from "sonner";
import { queryKeys } from "@/lib/queryKeys";
import workService from "@/services/WorkServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* ----------------- Get Works ----------------- */
export const useGetWorks = (page, limit, search, sort) => {
    return useQuery({
        queryKey: [queryKeys.works, page, limit, search, sort],
        queryFn: async () => {
            return await workService.getWorks({
                page,
                limit,
                search,
                sort,
            });
        },
        keepPreviousData: true,
    });
};

/* ----------------- Get Work By Id ----------------- */
export const useGetWorkById = (id) => {
    return useQuery({
        queryKey: [queryKeys.works, id],
        queryFn: async () => {
            return await workService.getWorkById(id);
        },
        enabled: !!id, // ✅ prevent running when id is undefined/null
    });
};

/* ----------------- Post Work ----------------- */
export const usePostWork = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => workService.postWork(data),
        onSuccess: () => {
            toast.success("Work created successfully ✅");
            queryClient.invalidateQueries([queryKeys.works]);
        },
        onError: (err) => {
            toast.error(
                err.response?.data?.message || "Failed to create work ❌"
            );
        },
    });
};

/* ----------------- Delete Work ----------------- */
export const useDeleteWork = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => workService.deleteWork(id),
        onSuccess: () => {
            toast.success("Work deleted successfully 🗑️");
            queryClient.invalidateQueries([queryKeys.works]);
        },
        onError: (err) => {
            toast.error(
                err.response?.data?.message || "Failed to delete work ❌"
            );
        },
    });
};

/* ----------------- Update Work ----------------- */
export const useUpdateWork = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }) => {
            return await workService.updateWork(id, data);
        },
        onSuccess: () => {
            toast.success("Work updated successfully ✅");
            queryClient.invalidateQueries([queryKeys.works]);
        },
        onError: (err) => {
            toast.error(
                err.response?.data?.message || "Failed to update work ❌"
            );
        },
    });
};
