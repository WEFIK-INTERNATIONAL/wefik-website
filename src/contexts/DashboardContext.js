"use client";
import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    use,
} from "react";
import { toast } from "sonner";
import applicationService from "@/services/ApplicationServices";
import jobServices from "@/services/JobServices";
import API from "@/lib/axiosConfig";


const DashboardContext = createContext(null);

export const DashboardProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [jobProfiles, setJobProfiles] = useState([]);
    const [stats, setStats] = useState([]);
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    /** -----------------------------
     *  Fetch Data
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

    const fetchStats = async () => {
        try {
            const response = await API.get("/stats");
            setStats(response?.data?.data[0] ?? []);
        } catch (error) {
            console.error("❌ Failed to fetch stats:", error);
            toast.error("Failed to load stats.");

        } finally {
            setIsLoading(false);
        }
    };

    const fetchJobProfiles = async()=>{
        try {
            const response = await jobServices.getJobProfiles();
            setJobProfiles(response.data)
            
        } catch (error) {
            console.error("❌ Failed to fetch stats:", error);
            toast.error("Failed to load stats.");

        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchStats();
        fetchApplications();
        fetchjobs();
        fetchJobProfiles();
    }, []);

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
            fetchStats();
            toast.success("✅ Update status successful!");
        } catch (error) {
            console.error("❌ Update status failed:", error);
            toast.error("Update status failed. Please try again.");
        }
    };

    const updatejobSatatus = async (id, data) => {
        try {
            const response = await jobServices.updateJob(
                id,
                data
            );

            const updatedApp = response?.data ?? response;

            setJobs((prev) =>
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
            fetchStats();
            toast.success("🗑️ Application deleted successfully!");
        } catch (error) {
            console.error("❌ Delete application failed:", error);
            toast.error("Delete application failed. Rolled back.");
        }
    };

    const deleteJob = async (id) => {
        try {
            await jobServices.deleteJob(id);
            setJobs((prev) => prev.filter((app) => app._id !== id));
            toast.success("🗑️ Job deleted successfully!");
        } catch (error) {
            console.error("❌ Delete Job failed:", error);
            toast.error("Delete Job failed. Rolled back.");
        }
    };
    /** -----------------------------
     *  Context Value
     * ----------------------------- */
    const contextValue = {
        isLoading,
        jobs,
        stats,
        jobProfiles,
        applications,
        updateApplicationSatatus,
        updatejobSatatus,
        deleteApplication,
        deleteJob
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
