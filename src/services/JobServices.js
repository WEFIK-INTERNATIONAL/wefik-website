"use client";
import API from "@/lib/axiosConfig";

class JobService {
    // ✅ Get all job
    async getJobs() {
        try {
            const res = await API.get("/job");
            return res.data;
        } catch (err) {
            console.error("Error fetching job:", err);
            throw err;
        }
    }

    // ✅ Get job by ID
    async getJobById(id) {
        try {
            const res = await API.get(`/job/${id}`);
            return res.data;
        } catch (err) {
            console.error(`Error fetching job ${id}:`, err);
            throw err;
        }
    }

    // ✅ Create new job
    async getJobProfiles() {
        try {
            const res = await API.get("/job-profile");            
            return res.data;
        } catch (err) {
            console.error("Error to fetch job-profiles:", err);
            throw err;
        }
    }

    // ✅ Create new job
    async createJob(data) {
        try {
            const res = await API.post("/job", data);
            return res.data;
        } catch (err) {
            console.error("Error creating job:", err);
            throw err;
        }
    }

    // ✅ Create new job profile
    async createJobProfile(data) {
        try {
            const res = await API.post("/job-profile", data);
            return res.data;
        } catch (err) {
            console.error("Error creating job-profile:", err);
            throw err;
        }
    }

    // ✅ Update job
    async updateJob(id, data) {
        try {            
            const res = await API.patch(`/job/${id}`, data);
            return res.data;
        } catch (err) {
            console.error(`Error updating job ${id}:`, err);
            throw err;
        }
    }

    // ✅ Delete job
    async deleteJob(id) {
        try {
            const res = await API.delete(`/job/${id}`);
            return res.data;
        } catch (err) {
            console.error(`Error deleting job ${id}:`, err);
            throw err;
        }
    }
}

const jobServices = new JobService();
export default jobServices;
