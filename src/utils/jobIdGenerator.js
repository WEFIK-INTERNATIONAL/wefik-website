import { jobRoles } from "@/lib/jobRoles";

// Find role code + validate level
function getRoleCode(jobTitle) {
    for (const dept of jobRoles) {
        for (const role of dept.roles) {
            if (role.name === jobTitle) {
                if (role.levels.includes(level)) {
                    return `${role.code}-${level}`;
                }
                throw new Error(
                    `Invalid level "${level}" for role "${jobTitle}". Allowed: ${role.levels.join(", ")}`
                );
            }
        }
    }
    throw new Error(`No role mapping found for: ${jobTitle}`);
}

export function generateJobId(jobTitle, level = null, counter = 1) {
    const roleCode = level
        ? getRoleCode(jobTitle, level)
        : getRoleCode(jobTitle, "JR"); // default JR
    const year = new Date().getFullYear();
    const formattedCounter = String(counter).padStart(3, "0");

    return `${roleCode}-${year}-${formattedCounter}`;
}
