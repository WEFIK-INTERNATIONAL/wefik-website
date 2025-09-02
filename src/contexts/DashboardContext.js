"use client";
import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";
import { toast } from "sonner";
import API from "@/lib/axiosConfig";
import applicationService from "@/services/ApplicationServices";
import jobServices from "@/services/JobServices";

const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    /** -----------------------------
     *  Fetch Data
     * ----------------------------- */
    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const response = await applicationService.getApplications();
                setApplications(response?.data ?? []);
            } catch (error) {
                console.error("❌ Failed to fetch applications:", error);
                toast.error("Failed to load applications.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchjobs();
        fetchApplications();
    }, []);
    const fetchjobs = async () => {
        try {
            const response = await jobServices.getJobs();
            setJobs(response?.data ?? []);
        } catch (error) {
            console.error("❌ Failed to fetch Job:", error);
            toast.error("Failed to load job.");
        } finally {
            setIsLoading(false);
        }
    };

    /** -----------------------------
     *  Optimistic Update Handler
     * ----------------------------- */
    const updateItem = useCallback(async (id, newData, serviceCall) => {
        setApplications((prev) =>
            prev.map((item) =>
                item._id === id ? { ...item, ...newData } : item
            )
        );

        try {
            await serviceCall();
            toast.success("✅ Update successful!");
        } catch (error) {
            console.error("❌ Update failed:", error);
            setApplications((prev) => prev);
            toast.error("Update failed. Rolled back.");
        }
    }, []);
     /** -----------------------------
     *  Optimistic Update Handler
     * ----------------------------- */
    const updateJob = useCallback(async (id, newData, serviceCall) => {
        setJobs((prev) =>
            prev.map((item) =>
                item._id === id ? { ...item, ...newData } : item
            )
        );

        try {
            await serviceCall();
            toast.success("✅ Update successful!");
        } catch (error) {
            console.error("❌ Update failed:", error);
            setApplications((prev) => prev);
            toast.error("Update failed. Rolled back.");
        }
    }, []);

    /** -----------------------------
     *  Optimistic Delete Handler
     * ----------------------------- */
    const deleteItem = useCallback(
        async (id, serviceCall) => {
            const prevItems = [...applications];
            setApplications((prev) => prev.filter((item) => item._id !== id));

            try {
                await serviceCall();
                toast.success("🗑️ Application deleted successfully!");
            } catch (error) {
                console.error("❌ Delete failed:", error);
                setApplications(prevItems);
                toast.error("Delete failed. Rolled back.");
            }
        },
        [applications]
    );

    /** -----------------------------
     *  Context Value
     * ----------------------------- */
    const contextValue = {
        isLoading,
        jobs,
        applications,
        setJobs,
        setApplications,
        updateJob,
        updateItem,
        deleteItem,
    };

    return (
        <DashboardContext.Provider value={contextValue}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error(
            "useDashboardContext must be used within a DashboardProvider"
        );
    }
    return context;
};
