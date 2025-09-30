"use client";
import API from "@/lib/axiosConfig";

class BlogService {
    // ✅ Get all blogs
    async getBlogs({ page = 1, limit = 10, search, sort }) {
        try {
            const res = await API.get("/blog", {
                params: { page, limit, search, sort },
            });
            return res.data.data;
        } catch (err) {
            console.error("Error fetching blogs:", err);
            throw err;
        }
    }

    // ✅ Get blog by ID
    async getBlogById(id) {
        try {
            console.log(id);
            
            const res = await API.get(`/blog/${id}`);
            return res.data.data;
        } catch (err) {
            console.error(`Error fetching blog ${id}:`, err);
            throw err;
        }
    }

    // ✅ Create new blog
    async createBlog(data) {
        try {
            const res = await API.post("/blog", data);
            return res.data;
        } catch (err) {
            console.error("Error creating blog:", err);
            throw err;
        }
    }

    // ✅ Update blog
    async updateBlog(id, data) {
        try {
            const res = await API.patch(`/blog/${id}`, data);
            return res.data;
        } catch (err) {
            console.error(`Error updating blog ${id}:`, err);
            throw err;
        }
    }

    // ✅ Update blog Status
    async updateBlogStatus(id, data) {
        try {
            const res = await API.patch(`/blog/${id}`, data);
            return res.data;
        } catch (err) {
            console.error(`Error updating blog ${id}:`, err);
            throw err;
        }
    }

    // ✅ Delete blog
    async deleteBlog(id) {
        try {
            const res = await API.delete(`/blog/${id}`);
            return res.data;
        } catch (err) {
            console.error(`Error deleting blog ${id}:`, err);
            throw err;
        }
    }

    // ✅ Search blog
    async searchBlog({ search, category, author, page = 1, limit = 5 }) {
        try {
            const res = await API.get("/blog/search", {
                params: { search, category, author, page, limit },
            });

            return {
                blogs: res.data.data,
                pagination: res.data.data.pagination,
            };
        } catch (err) {
            console.error("Error searching blogs:", err);
            throw err;
        }
    }
}

const blogServices = new BlogService();
export default blogServices; 