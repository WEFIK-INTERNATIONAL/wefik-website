// Allowed types
export const ALLOWED_RESUME_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
];

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

// Validate category and return folder
export function validateFileCategory(fileType, fileCategory) {
    let folder = "";

    if (fileCategory === "resume") {
        folder = "/Wefik/resumes";
        if (!ALLOWED_RESUME_TYPES.includes(fileType)) {
            throw new Error("Invalid resume type. Only PDF/DOC/DOCX allowed");
        }
    } else if (fileCategory === "blog") {
        folder = "/Wefik/blog";
        if (!ALLOWED_IMAGE_TYPES.includes(fileType)) {
            throw new Error("Invalid profile picture type. Only JPG/PNG allowed");
        }
    } else {
        throw new Error("Invalid file category. Must be 'resume' or 'profile'");
    }

    return folder;
}

// Validate file size
export function validateFileSize(base64File) {
    const fileSize = Math.ceil((base64File.length * 3) / 4); // base64 → bytes
    if (fileSize > MAX_FILE_SIZE) {
        throw new Error("File size exceeds 5MB limit");
    }
}
