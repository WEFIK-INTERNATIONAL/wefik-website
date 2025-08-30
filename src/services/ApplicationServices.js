"use client";
import API from "@/lib/axiosConfig";

class ApplicationService {
    // ✅ Get applications
    async getApplications() {
        try {
            const res = await API.get("/application");
            return res.data;
        } catch (err) {
            console.error("Error fetching applications:", err);
            throw err;
        }
    }

    // ✅ Get application by ID
    async getApplicationById(id) {
        try {
            const res = await API.get(`/application/${id}`);
            return res.data;
        } catch (err) {
            console.error(`Error fetching application ${id}:`, err);
            throw err;
        }
    }

    // ✅ Create new application
    async createApplication(data) {
        try {
            const res = await API.post("/application", data);
            return res.data;
        } catch (err) {
            console.error("Error creating application:", err);
            throw err;
        }
    }

    // ✅ Update application
    async updateApplication(id, data) {
        try {            
            const res = await API.patch(`/application/${id}`, data);
            return res.data;
        } catch (err) {
            console.error(`Error updating application ${id}:`, err);
            throw err;
        }
    }

    // ✅ Delete application
    async deleteApplication(id) {
        try {
            const res = await API.delete(`/application/${id}`);
            return res.data;
        } catch (err) {
            console.error(`Error deleting application ${id}:`, err);
            throw err;
        }
    }
}

const applicationService = new ApplicationService();
export default applicationService;
