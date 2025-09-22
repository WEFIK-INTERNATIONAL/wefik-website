import { toast } from "sonner";
import { queryKeys } from "@/lib/queryKeys";
import applicationService from "@/services/ApplicationServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* ----------------- Get Applications ----------------- */
export const useGetApplications = (page, limit, search, sort) => {
    return useQuery({
        queryKey: [queryKeys.applications, page, limit, search, sort],
        queryFn: async () => {
            const res = await applicationService.getApplications({
                page,
                limit,
                search,
                sort,
            });
            return res;
        },
        keepPreviousData: true,
    });
};

/* ----------------- Get Application By Id ----------------- */
export const useGetApplicationById = (id) => {
    return useQuery({
        queryKey: [queryKeys.applications, id],
        queryFn: async () => {
            const res = await applicationService.getApplicationById(id);
            return res;
        },
    });
};

/* ----------------- Apply Job Application ----------------- */
export const useApplyJobApplication = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => applicationService.applyApplication(data),
        onSuccess: () => {
            toast.success("Application submitted successfully ✅");
            queryClient.invalidateQueries([queryKeys.applications]);
        },
        onError: (err) => {
            toast.error(
                err.response?.data?.message || "Failed to create application ❌"
            );
        },
    });
};

/* ----------------- Delete Application ----------------- */
export const useDeleteApplication = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => applicationService.deleteApplication(id),
        onSuccess: () => {
            toast.success("Application deleted successfully 🗑️");
            queryClient.invalidateQueries([queryKeys.applications]);
        },
        onError: (err) => {
            toast.error(
                err.response?.data?.message || "Failed to delete application ❌"
            );
        },
    });
};

/* ----------------- Update Application Status ----------------- */
export const useUpdateApplicationStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, status }) => {
            const res = await applicationService.updateApplication(id, status);
            return res;
        },
        onSuccess: () => {
            toast.success("Application status updated successfully ✅");
            queryClient.invalidateQueries([queryKeys.applications]);
        },
        onError: (err) => {
            toast.error(
                err.response?.data?.message ||
                    "Failed to update application status ❌"
            );
        },
    });
};

/* ----------------- Apply to a Job (Public) ----------------- */
export const useApplyJob = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => applicationService.applyJob(data),
        onSuccess: () => {
            toast.success("Job applied successfully ✅");
            queryClient.invalidateQueries([queryKeys.applications]);
        },
        onError: (err) => {
            toast.error(
                err.response?.data?.message || "Failed to apply for job ❌"
            );
        },
    });
};
