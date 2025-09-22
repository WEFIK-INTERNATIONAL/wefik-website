"use client";

import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";
import { createContext, useContext, useState } from "react";
import { toast } from "sonner";

const UploadContext = createContext(undefined);

export function ImageKitProvider({ children }) {
  const [progress, setProgress] = useState(0);

  // ✅ Fetch auth params from API
  const authenticator = async () => {
    try {
      const response = await fetch("/api/imagekit-auth");
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Auth request failed");
      }

      if (!result.data) {
        throw new Error("Auth params missing in response");
      }

      return result.data;
    } catch (error) {
      toast.error("Authentication failed!");
      console.error("Auth Error:", error);
      throw error;
    }
  };

  const folderMap = {
    resume: "/Wefik_Storage/resume",
    blog: "/Wefik_Storage/blog",
    project: "/Wefik_Storage/project",
    default: "/wefik_storage",
  };

  // ✅ File uploader with progress + error handling
  const uploadFile = async (file, type = "default") => {
    setProgress(0);

    const { token, expire, signature, publicKey } = await authenticator();

    const folder = folderMap[type] || folderMap.default;

    try {
      const uploadResponse = await upload({
        file,
        fileName: file.name,
        folder,
        token,
        expire,
        signature,
        publicKey,
        onProgress: (event) => {
          setProgress((event.loaded / event.total) * 100);
        },
      });

      toast.success(`File uploaded to ${folder}`);
      return uploadResponse;
    } catch (error) {
      // ✅ Unified error map
      const errorMap = {
        [ImageKitAbortError.name]: "Upload aborted",
        [ImageKitInvalidRequestError.name]: "Invalid request",
        [ImageKitUploadNetworkError.name]: "Network error",
        [ImageKitServerError.name]: "Server error",
      };

      const message = errorMap[error.constructor.name] || "Unexpected error";
      toast.error(message);
      console.error(`${message}:`, error.message || error);

      throw error;
    }
  };

  const deleteFile = async (fileId) => {
    if (!fileId) {
      toast.error("No fileId provided for deletion");
      return;
    }

    try {
      const res = await fetch(`/api/imagekit/${fileId}`, { method: "DELETE" });
      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.message || "Failed to delete file");
      }

      toast.success("File deleted successfully");
      return true;
    } catch (error) {
      toast.error("Delete failed");
      console.error("Delete error:", error);
      throw error;
    }
  };


  return (
    <UploadContext.Provider value={{ uploadFile, deleteFile, progress }}>
      {children}
    </UploadContext.Provider>
  );
}

export function useImageKit() {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useImageKit must be used inside <ImageKitProvider>");
  }
  return context;
}
