"use client";
import API from "@/lib/axiosConfig";

class WorkService {
    // Post new Work
    async postWork(data) {
        try {
            // console.log(data);
            const res = await API.post("/admin/work", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return res.data;
        } catch (err) {
            console.error("Error creating work:", err);
            throw err;
        }
    }

    // Get all Works
    async fetchWorks({ page = 1, limit = 10, search, sort }) {
        try {
            console.log("fetchWorks input:", { page, limit, search, sort });

            const res = await API.get("/admin/work", {
                params: { page, limit, search, sort },
            });
            return res.data.data;
        } catch (err) {
            console.error("Error fetching works:", err);
            throw err;
        }
    }

    // Get Work by ID
    async fetchWorkById(id) {
        try {
            const res = await API.get(`/admin/work/${id}`);
            return res.data;
        } catch (err) {
            console.error(`Error fetching work ${id}:`, err);
            throw err;
        }
    }

    // Update Work
    async updateWork(id, data) {
        try {
            console.log("Updating work...", id, data);
            const res = await API.patch(`/admin/work/${id}`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return res.data;
        } catch (err) {
            console.error(`Error updating work ${id}:`, err);
            throw err;
        }
    }

    // Delete Work
    async deleteWork(id) {
        try {
            const res = await API.delete(`/admin/work/${id}`);
            return res.data;
        } catch (err) {
            console.error(`Error deleting work ${id}:`, err);
            throw err;
        }
    }
}

const workService = new WorkService();
export default workService;
