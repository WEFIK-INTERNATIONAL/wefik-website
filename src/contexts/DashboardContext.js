"use client";
import { createContext, useContext, useState, useEffect } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
	const [jobs, setJobs] = useState([]);
	const [applications, setApplications] = useState([]);
	const [loading, setLoading] = useState(true);

	return (
		<DashboardContext.Provider
			value={{ loading, jobs, applications, setApplications, setJobs }}
		>
			{children}
		</DashboardContext.Provider>
	);
};

export const useDashboardContext = () => useContext(DashboardContext);
