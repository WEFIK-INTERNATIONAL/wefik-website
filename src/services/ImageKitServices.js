import {
    validateFileSize,
    validateFileType,
    getFolderByCategory,
} from "@/utils/fileValidation";
import imagekit from "@/lib/imagekitConfig";

class ImageKitServices {
    async uploadImage(file, fileCategory) {
        if (!file) throw new Error("File is required");
        if (!fileCategory) throw new Error("fileCategory is required");

        if (file.type) {
            validateFileType(file.type, fileCategory);
        }
        validateFileSize(file);

        const folder = getFolderByCategory(fileCategory);

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

        return await imagekit.upload({
            file: uploadFileData,
            fileName: file.name || `upload-${Date.now()}`,
            folder,
        });
    }

    async uploadImages({ files, fileCategory }) {
        if (!files || files.length === 0) {
            throw new Error("No files provided");
        }
        if (!fileCategory) throw new Error("fileCategory is required");

        const folder = getFolderByCategory(fileCategory);

        const processFile = async (file) => {
            if (file.type) {
                validateFileType(file.type, fileCategory);
            }
            validateFileSize(file);

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

            return await imagekit.upload({
                file: uploadFileData,
                fileName: file.name || `upload-${Date.now()}`,
                folder,
            });
        };

        return await Promise.all(files.map((f) => processFile(f)));
    }

    async deleteImage(fileId) {
        if (!fileId) throw new Error("fileId is required for deletion");
        return await imagekit.deleteFile(fileId);
    }

    async deleteImages(fileIds) {
        if (!fileIds || fileIds.length === 0) {
            throw new Error("No fileIds provided");
        }
        return await Promise.all(fileIds.map((id) => this.deleteImage(id)));
    }
}

const imageKitService = new ImageKitServices();
export default imageKitService;
