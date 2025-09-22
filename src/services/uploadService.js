import imagekit from "@/lib/imagekitConfig";
import {
    validateFileSize,
    validateFileType,
    getFolderByCategory,
} from "@/utils/fileValidation";

/**
 * Upload one or multiple files to ImageKit
 * @param {Object} params
 * @param {File|Buffer|string|Array} params.files - Single file or array of files
 * @param {string} params.fileCategory - Category to determine the upload folder
 * @returns {Promise<Object|Array>} - ImageKit response (object if 1 file, array if multiple)
 */
export async function uploadFiles({ files, fileCategory }) {
    if (!files || (Array.isArray(files) && files.length === 0)) {
        throw new Error("No files provided");
    }

    const processFile = async (file) => {
        if (!fileCategory) {
            throw new Error("fileCategory is required");
        }

        // ✅ Validate file type & size
        if (file.type) {
            validateFileType(file.type, fileCategory);
        }
        validateFileSize(file);

        const folder = getFolderByCategory(fileCategory);

        // ✅ Convert file to base64
        let uploadFileData;
        if (typeof file.arrayBuffer === "function") {
            const arrayBuffer = await file.arrayBuffer();
            uploadFileData = Buffer.from(arrayBuffer).toString("base64");
        } else if (Buffer.isBuffer(file)) {
            uploadFileData = file.toString("base64");
        } else if (typeof file === "string") {
            uploadFileData = file;
        } else {
            throw new Error("Unsupported file type for upload");
        }

        // ✅ Upload to ImageKit
        return await imagekit.upload({
            file: uploadFileData,
            fileName: file.name || `upload-${Date.now()}`,
            folder,
        });
    };

    // Handle single file or multiple
    if (Array.isArray(files)) {
        const results = await Promise.all(files.map((f) => processFile(f)));
        return results; // 👉 Array of responses
    } else {
        const result = await processFile(files);
        return result; // 👉 Single response
    }
}
