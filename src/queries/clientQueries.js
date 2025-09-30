import { toast } from "sonner";

import { queryKeys } from "@/lib/queryKeys";
import clientService from "@/services/ClientServices";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

/* ----------------- Get Jobs ----------------- */
export const useJobsList = (filters) => {
    return useQuery({
        queryKey: [queryKeys.client, filters],
        queryFn: async () => {
            const res = await clientService.fetchJobs(filters);
            return res;
        },
        keepPreviousData: true,
    });
};

/* ----------------- Get Job By Id ----------------- */
export const useJobDetail = (id) => {
    return useQuery({
        queryKey: [queryKeys.client, id],
        queryFn: async () => {
            const res = await clientService.fetchJobById(id);
            return res;
        },
    });
};

/* ----------------- Apply Job ----------------- */
export const useApplyJob = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }) => {
            const res = await clientService.applyJob(id, data);
            return res;
        },
        onSuccess: () => {
            toast.success("Job applied successfully");
            queryClient.invalidateQueries([queryKeys.client]);
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || error.message);
        },
    });
};

/* ----------------- Get Works ----------------- */
export const useWorksList = () => {
    return useQuery({
        queryKey: [queryKeys.client],
        queryFn: async () => {
            const res = await clientService.fetchWorks();
            return res;
        },
        keepPreviousData: true,
    });
};
