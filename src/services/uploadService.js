import imagekit from "@/lib/imagekitConfig";
import {
    validateFileSize,
    validateFileType,
    getFolderByCategory,
} from "@/utils/fileValidation";

export async function uploadFile({ file, fileCategory }) {
    if (!file || !fileCategory) {
        throw new Error("file, and fileCategory are required");
    }

    // Validate file
    validateFileType(file.type, fileCategory);
    validateFileSize(file);
    const folder = getFolderByCategory(fileCategory);

    // Convert File to base64
    let uploadFileData;
    if (typeof file.arrayBuffer === "function") {
        const arrayBuffer = await file.arrayBuffer();
        uploadFileData = Buffer.from(arrayBuffer).toString("base64");
    } else if (Buffer.isBuffer(file)) {
        uploadFileData = file.toString("base64");
    } else if (typeof file === "string") {
        uploadFileData = file; // already base64
    } else {
        throw new Error("Unsupported file type");
    }

    // Upload to ImageKit
    return await imagekit.upload({
        file: uploadFileData,
        fileName: file.name,
        folder,
    });
}
