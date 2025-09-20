// Allowed types
export const ALLOWED_TYPES = {
    resume: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // DOCX
    ],
    image: ["image/jpeg", "image/jpg", "image/png"],
    video: ["video/mp4", "video/mov", "video/avi"],
};

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export function getFolderByCategory(fileCategory) {
    switch (fileCategory) {
        case "resume":
            return "/Wefik/resumes";
        case "image":
            return "/Wefik/images";
        case "video":
            return "/Wefik/videos";
        default:
            throw new Error("Invalid file category");
    }
}

export function validateFileType(fileType, fileCategory) {
    const allowed = ALLOWED_TYPES[fileCategory];
    if (!allowed || !allowed.includes(fileType)) {
        throw new Error(
            `Invalid file type for ${fileCategory}. Allowed types: ${allowed.join(
                ", "
            )}`
        );
    }
}

export function validateFileSize(file) {
    if (file.size > MAX_FILE_SIZE) {
        throw new Error("File size exceeds 5MB limit");
    }
}
