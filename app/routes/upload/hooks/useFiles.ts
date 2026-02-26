import { useState } from "react";

interface Props {
    mimetypes: string[]
}

export const useFiles = ({ mimetypes }: Props) => {
    const [files, setFiles] = useState<File[]>([]);

    const addFile = (file: File) => {
        if (!mimetypes.includes(file.type)) return;

        setFiles((prev) => [...prev, file]);
    };

    const removeFile = (file: File) => {
        setFiles((prev) => prev.filter((f) => f.name !== file.name));
    };

    const clearFiles = () => setFiles([]);
    
    return { files, addFile, removeFile, clearFiles };
}