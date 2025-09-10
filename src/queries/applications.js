import { toast } from "sonner";
import { queryKeys } from "@/lib/queryKeys";
import applicationService from "@/services/ApplicationServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* ----------------- Get All Applications ----------------- */
export const useGetApplications = () => {
    return useQuery({
        queryKey: [queryKeys.applications],
        queryFn: async () => {
            const res = await applicationService.getApplications();
            return res.data;
        },
    });
};

/* ----------------- Create Application ----------------- */
export const useCreateApplication = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => applicationService.createApplication(data),
        onSuccess: () => {
            toast.success("Application created successfully ✅");
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
        mutationFn: ({ id, status }) =>
            applicationService.updateApplicationStatus(id, status),
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
