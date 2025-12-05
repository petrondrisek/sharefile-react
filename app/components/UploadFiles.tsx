import React, { useRef, useState } from 'react'

interface UploadFilesProps {
    files: File[],
    setFiles: React.Dispatch<React.SetStateAction<File[]>>
}

export default function UploadFiles({ files, setFiles }: UploadFilesProps) {
    const [isDragging, setIsDragging] = useState(false);
    const uploadAreaRef = useRef<HTMLDivElement>(null);
    const dragCounter = useRef(0);

    const handleChooseFileClick = async (e: React.MouseEvent) => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";

        input.addEventListener("change", (e: Event) => {
            const files = (e.target as HTMLInputElement).files as FileList;
            if (files.length > 0) {
                setFiles((f) => [...f, ...files]);
            }

            input.remove();
        });

        input.click();
    }

    const onChooseFileDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        dragCounter.current++;
        setIsDragging(true);
    };

    const onChooseFileDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const onChooseFileDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        dragCounter.current--;

        if (dragCounter.current === 0) {
            setIsDragging(false);
        }
    };

    const onChooseFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();

        dragCounter.current = 0;
        setIsDragging(false);

        const files = Array.from(e.dataTransfer!.files).filter(file => file.type.startsWith("image/"));
        if (files?.length) {
            setFiles((prev) => [...prev, ...files]);
        }
    };

    return (<>
        <div 
            ref={uploadAreaRef}
            onClick={handleChooseFileClick}
            onDragEnter={onChooseFileDragEnter}
            onDragOver={onChooseFileDragOver}
            onDragLeave={onChooseFileDragLeave}
            onDrop={onChooseFileDrop}
            className="rounded w-full border border-dashed border-gray-700 dark:border-gray-600 text-gray-500 dark:text-gray-400 p-4 flex justify-center flex-col items-center cursor-pointer"
        >
            <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="0 0 24 24" fill="none">
                <path d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H12M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.5 21L17.5 15M17.5 15L20 17.5M17.5 15L15 17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <p className="mt-4 text-sm">
                {isDragging ? "Drop the files here" : "Click or drag and drop a file to upload."}
            </p>
        </div>

        <ul>
            {files.map((file) => {
                return <li key={file.name}>
                    {file.name}
                    <span 
                        onClick={() => setFiles((prev) => prev.filter((f) => f.name !== file.name))}
                        className="cursor-pointer pl-2 text-gray-400 hover:text-gray-300 transition"
                    >
                        ×
                    </span>
                </li>;
            })}
        </ul>
    </>)
}
