import imagekit from "@/lib/imagekitConfig";
import { validateFileCategory, validateFileSize } from "@/utils/fileValidation";

export async function uploadFile({ file, fileName, fileType, fileCategory }) {
    if (!file || !fileName || !fileType || !fileCategory) {
        throw new Error("file, fileName, fileType, and fileCategory are required");
    }

    // Validate
    const folder = validateFileCategory(fileType, fileCategory);
    validateFileSize(file);

    // Upload
    return await imagekit.upload({
        file,
        fileName,
        folder,
    });
}
