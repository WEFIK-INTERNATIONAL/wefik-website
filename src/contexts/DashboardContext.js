"use client";
import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from "react";
import { toast } from "sonner";
import applicationService from "@/services/ApplicationServices";
import jobServices from "@/services/JobServices";

const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    /** -----------------------------
     *  Fetch Data_
     * ----------------------------- */
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

    useEffect(() => {
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
    const updateApplicationSatatus = async (id, data) => {
        try {
            const response = await applicationService.updateApplication(
                id,
                data
            );

            const updatedApp = response?.data ?? response;

            setApplications((prev) =>
                prev.map((app) => (app._id === id ? updatedApp : app))
            );
            toast.success("✅ Update status successful!");
        } catch (error) {
            console.error("❌ Update status failed:", error);
            toast.error("Update status failed. Please try again.");
        }
    };

    /** -----------------------------
     *  Optimistic Delete Handler
     * ----------------------------- */
    const deleteApplication = async (id) => {
        try {
            await applicationService.deleteApplication(id);
            setApplications((prev) => prev.filter((app) => app._id !== id));
            toast.success("🗑️ Application deleted successfully!");
        } catch (error) {
            console.error("❌ Delete application failed:", error);
            toast.error("Delete application failed. Rolled back.");
        }
    };

    /** -----------------------------
     *  Context Value
     * ----------------------------- */
    const contextValue = {
        isLoading,
        jobs,
        applications,
        updateApplicationSatatus,
        deleteApplication,
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
