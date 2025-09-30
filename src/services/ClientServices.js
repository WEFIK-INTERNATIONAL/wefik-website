"use client";
import API from "@/lib/axiosConfig";

class ClientService {
    // Get paginated jobs and filter by location, department, and type (default 10 per page)
    async fetchJobs({
        page = 1,
        limit = 5,
        search = "",
        location = "",
        department = "",
        type = "",
        sort = "newest",
    } = {}) {
        try {
            const res = await API.get("/jobs", {
                params: {
                    page,
                    limit,
                    search,
                    location,
                    department,
                    type,
                    sort,
                },
            });
            return res.data.data; // { data: jobs, pagination }
        } catch (err) {
            console.error("Error fetching jobs:", err);
            throw err;
        }
    }

    // Get single job by ID
    async fetchJobById(id) {
        if (!id) throw new Error("Job ID is required");
        try {
            const res = await API.get(`/jobs/${id}`);
            return res.data.data;
        } catch (err) {
            console.error(`Error fetching job ${id}:`, err);
            throw err;
        }
    }

    // Apply to job
    async applyJob(id, data) {
        try {
            const res = await API.post(`/jobs/${id}/apply`, data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            return res.data.data;
        } catch (err) {
            console.error(`Error applying to job ${id}:`, err);
            throw err;
        }
    }

    async fetchWorks() {
        try {
            const res = await API.get(`/works`);
            return res.data.data;
        } catch (err) {
            console.error("Error fetching works", err);
            throw err;
        }
    }
}

const clientService = new ClientService();
export default clientService;
