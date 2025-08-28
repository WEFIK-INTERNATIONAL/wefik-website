"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [data, setData] = useState(null);
	const [isAuthenticate, setIsAuthenticate] = useState(false);
	const [loading, setLoading] = useState(true);

	return (
		<AuthContext.Provider value={{ data, isAuthenticate, loading }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContext = () => useContext(AuthContext);
