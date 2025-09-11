// utils/jobIdHelper.js
import jobServices from "@/services/JobServices";

/**
 ** Generate a unique Job ID
 ** Format: DEPT-ROLE-2025-XXXX

 * Generate a unique Job ID with random 4-digit number
 * @param {string} deptCode - Department code (e.g., "ENG")
 * @param {string} roleCode - Role code (e.g., "WEB")
 * @returns {Promise<string>} - Unique Job ID
 */

export async function generateJobId(jobProfileCode) {
    if (!jobProfileCode)
        throw new Error("JobProfileCode is required");

    const year = new Date().getFullYear();
    let jobId;
    let isUnique = false;

    while (!isUnique) {
        const randomNumber = Math.floor(1000 + Math.random() * 9000); // 1000–9999
        jobId = `${jobProfileCode}-${year}-${randomNumber}`;

        try {
            // 🔍 Check with API if jobId already exists
            const exists = await jobServices.checkJobId(jobId);

            if (!exists) {
                isUnique = true;
            }
        } catch (err) {
            console.error("Error checking job ID:", err);
            throw err;
        }
    }

    return jobId;
}
