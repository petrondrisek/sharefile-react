import { useState } from "react";
import type { BackendResponse } from "~/_shared/types";

export const useUpload = () => {
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [error, setError] = useState<string>("");
    
    const processUpload = async (files: File[]) => {
        if(isProcessing || !files) return;
        setIsProcessing(true);

        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));

        const res = await fetch(import.meta.env.VITE_API_URL + "/files", {
            method: "POST",
            body: formData,
        });

        if(!res.ok){
            setIsProcessing(false);

            const error = await res.json();
            setError(error.message ?? "Failed to upload file.");
            return;
        }

        const data: BackendResponse = await res.json();
        if(!data) {
            setIsProcessing(false);
            setError("Failed to upload file.");
            return;
        }

        setError("");
        setIsProcessing(false);
        
        return data.uuid;
    }

    return { isProcessing, error, processUpload };
}