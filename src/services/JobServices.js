"use client";
import API from "@/lib/axiosConfig";

class JobService {
    // ✅ Get all job
    async getJobs({ page = 1, limit = 10, search, sort }) {
        try {
            const res = await API.get("/job", {
                params: { page, limit, search, sort },
            });
            return res.data.data;
        } catch (err) {
            console.error("Error fetching job:", err);
            throw err;
        }
    }

    // ✅ Get job by ID
    async getJobById(id) {
        try {
            const res = await API.get(`/job/${id}`);
            return res.data.data;
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

    // ✅ Update job Status
    async updateJobStatus(id, data) {
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

    // Check JobId is Uniq or Not
    async checkJobId(jobId) {
        try {
            const res = await API.get(`/job/check-id?jobId=${jobId}`);
            return res.data.exists;
        } catch (err) {
            console.error(`Error checking jobId ${jobId}:`, err);
            throw err;
        }
    }
}

const jobServices = new JobService();
export default jobServices;
