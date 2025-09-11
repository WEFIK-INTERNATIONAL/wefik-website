import { toast } from "sonner";

import { queryKeys } from "@/lib/queryKeys";
import jobServices from "@/services/JobServices";
import { generateJobId } from "@/utils/generateJobId";
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
export const useGetJobs = (page, limit, search, sort) => {
    return useQuery({
        queryKey: [queryKeys.jobs, page, limit, search, sort],
        queryFn: async () => {
            const res = await jobServices.getJobs({
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

export const useGetJobById = (id) => {
    return useQuery({
        queryKey: [queryKeys.jobs, id],
        queryFn: async () => {
            const res = await jobServices.getJobById(id);
            return res;
        },
    });
};

export const useGenerateJobId = () => {
    return useMutation({
        mutationFn: async (jobProfileCode) => {
            const res = await generateJobId(jobProfileCode);
            return res;
        },
    });
};

export const useCreateJob = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data) => jobServices.createJob(data),
        onSuccess: () => {
            toast.success("Job created successfully ✅");
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
        mutationFn: async ({ id, data }) => {
            const res = await jobServices.updateJob(id, data);
            return res.data;
        },
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
        mutationFn: async ({ id, status }) => {
            const res = await jobServices.updateJobStatus(id, status);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Job status updated successfully ✅");
            queryClient.invalidateQueries([queryKeys.jobs]);
        },
        onError: () => {
            toast.error("Failed to update job status ❌");
        },
    });
};
