import { useState } from 'react'
import QrCodeGenerate from './QrCodeGenerate';

interface FileRes {
  filename: string;
  validUntil: Date;
}

interface UploadButtonProps {
    files: File[],
}

interface BackendResponse {
    uuid: string,
    validUntil: Date,
    files: FileRes[],
}

export default function UploadButton({ files }: UploadButtonProps) {
    const [error, setError] = useState<string>("");
    const [uuid, setUuid] = useState<string>("");
    const [isFetching, setIsFetching] = useState<boolean>(false);
    
    const handleUpload = async () => {
        if (isFetching) return;
        setIsFetching(true);

        const formData = new FormData();
        files.forEach((file) => formData.append("files", file));
        
        const res = await fetch(import.meta.env.VITE_API_URL + "/files", {
            method: "POST",
            body: formData,
        });

        if(!res.ok) {
            setIsFetching(false);

            const error = await res.json();
            setError(error.message ?? "Failed to upload file.");
            return;
        }

        const data: BackendResponse = await res.json();

        if(!data) {
            setIsFetching(false);
            setError("Failed to upload file.");
            return;
        }

        setError("");
        setUuid(data.uuid);
        setIsFetching(false);
    };

    const createDataURL = () => {
        return window.location.origin + "/detail/" + uuid;
    }

    const handleClickCopy = () => {
        navigator.clipboard.writeText(createDataURL());
        alert("Copied to clipboard.");
    };

    return (<>
        {error && (
            <div className="w-full flex items-center justify-center flex-col gap-4 bg-red-700 text-white p-4">
                <p>ERROR: {error}</p>
            </div>
        )}
        
        <button 
            onClick={handleUpload}
            className="w-max bg-blue-500 text-white px-8 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
            disabled={isFetching}
        >
            {isFetching ? "Uploading..." : "Upload"}
        </button>

        {uuid && (<div className="w-full flex items-center justify-center flex-col gap-4 bg-gray-100 dark:bg-gray-700 dark:text-white p-4">
            <QrCodeGenerate width={200} height={200}>{createDataURL()}</QrCodeGenerate>
            <ul className="mt-4">
                <li>UUID: {uuid}</li>
            
                <li>URL: <a 
                    href={createDataURL()} 
                    target="_blank"
                    className="text-gray-500 hover:text-gray-400 transition cursor-pointer"
                    >
                        {(createDataURL()).slice(0, 30)}...
                    </a>
                    <button 
                        onClick={handleClickCopy}
                        className="w-max bg-blue-500 text-white px-8 py-2 rounded hover:bg-blue-600 transition cursor-pointer ml-2"
                    >
                        Copy
                    </button>
                </li>
            </ul>
        </div>)}
    </>)
}
