import { toast } from "sonner";

import { queryKeys } from "@/lib/queryKeys";
import jobServices from "@/services/JobServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Job-Profile
export const useGetJobProfile = () => {
    return useQuery({
        queryKey: [queryKeys.jobProfile],
        queryFn: jobServices.getJobProfiles,
        select: (res) => res.data,
    });
};

export const useCreateJobProfile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (data) => jobServices.createJobProfile(data),
        onSuccess: () => {
            toast.success("Job-Profile created successfully ✅");
            queryClient.invalidateQueries([queryKeys.jobProfile]);
        },
        onError: (err) => {
            toast.error(
                err.response?.data?.message || "Failed to create job profile ❌"
            );
        },
    });
};

// Job
export const useGetJobs = () => {
    return useQuery({
        queryKey: [queryKeys.jobs],
        queryFn: async () => {
            const res = await jobServices.getJobs();
            return res.data;
        },
    });
};

export const useCreateJob = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => jobServices.createJob(data),
        onSuccess: () => {
            toast.success("Job-Profile created successfully ✅");
            queryClient.invalidateQueries([queryKeys.jobs]);
        },
        onError: (err) => {
            toast.error(
                err.response?.data?.message || "Failed to create job ❌"
            );
        },
    });
};

export const useDeleteJob = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => jobServices.deleteJob(id),
        onSuccess: () => {
            toast.success("Job deleted successfully 🗑️");
            queryClient.invalidateQueries([queryKeys.jobs]);
        },
        onError: () => {
            toast.error("Failed to delete job ❌");
        },
    });
};

export const useUpdateJob = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => jobServices.updateJob(id),
        onSuccess: () => {
            toast.success("Job updated successfully ✅");
            queryClient.invalidateQueries([queryKeys.jobs]);
        },
        onError: () => {
            toast.error("Failed to update job ❌");
        },
    });
};

export const useUpdateJobStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id, status) => jobServices.deleteJob(id, status),
        onSuccess: () => {
            toast.success("Job status updated successfully ✅");
            queryClient.invalidateQueries([queryKeys.jobs]);
        },
        onError: () => {
            toast.error("Failed to update job status ❌");
        },
    });
};
