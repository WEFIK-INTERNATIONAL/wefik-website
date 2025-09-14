"use client";
import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import jobServices from "@/services/JobServices";


const ClientContext = createContext(null);

export const ClientProvider = ({ children }) => {
    const [jobs, setJobs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        fetchjobs();
    }, []);

    /** -----------------------------
     *  Context Value
     * ----------------------------- */
    const contextValue = {
        isLoading,
        jobs,
    };

    return (
        <ClientContext.Provider value={contextValue}>
            {children}
        </ClientContext.Provider>
    );
};

export const useClientContext = () => {
    const context = useContext(ClientContext);
    if (!context) {
        throw new Error(
            "useClientContext must be used within a ClientProvider"
        );
    }
    return context;
};
