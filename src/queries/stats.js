import { queryKeys } from "@/lib/queryKeys";
import { useQuery } from "@tanstack/react-query";

import API from "@/lib/axiosConfig";

/* ----------------- Get Stats ----------------- */
export const useGetStats = () => {
    return useQuery({
        queryKey: [queryKeys.stats],
        queryFn: async () => {
            const res = await API.get("/stats");
            return res.data;
        },
    });
};
