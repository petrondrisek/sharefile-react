import React, { useRef, useState } from "react";
import clsx from "clsx";

interface UploadFilesProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<File[]>>;
}

export default function UploadFiles({ files, setFiles }: UploadFilesProps) {
  const [isDragging, setIsDragging] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const addFiles = (incoming: File[]) => {
    setFiles((prev) => {
      const existing = new Set(prev.map((f) => f.name));
      const filtered = incoming.filter(
        (file) =>
          (file.type === "image/jpeg" || file.type === "image/png") && !existing.has(file.name)
      );
      return [...prev, ...filtered];
    });
  };

  const handleChooseFileClick = () => {
    inputRef.current?.click();
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    addFiles(Array.from(e.target.files));
    e.target.value = "";
  };

  const onDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current++;
    setIsDragging(true);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current = Math.max(0, dragCounter.current - 1);

    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    dragCounter.current = 0;
    setIsDragging(false);

    addFiles(Array.from(e.dataTransfer.files));
  };


  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg, image/png"
        className="hidden"
        onChange={onInputChange}
      />

      <div
        role="button"
        tabIndex={0}
        onClick={handleChooseFileClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleChooseFileClick();
          }
        }}
        onDragEnter={onDragEnter}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={clsx(
          "w-full cursor-pointer rounded border border-dashed p-6",
          "flex flex-col items-center justify-center gap-3",
          "transition-colors text-gray-500 dark:text-gray-400",
          isDragging
            ? "border-blue-500 bg-blue-500/10"
            : "border-gray-700 dark:border-gray-600"
        )}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="72"
          height="72"
          viewBox="0 0 24 24"
          fill="none"
          className="opacity-80"
        >
          <path
            d="M13.5 3H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H12M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17.5 21L17.5 15M17.5 15L20 17.5M17.5 15L15 17.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <p className="text-sm text-center">
          {isDragging
            ? "Drop images here"
            : "Click or drag an image to upload"}
        </p>
      </div>

      {files.length > 0 && (
        <ul className="mt-4 space-y-2 text-sm">
          {files.map((file) => (
            <li
              key={file.name}
              className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-500 dark:bg-gray-600 hover:bg-gray-700  dark:hover:bg-gray-700 focus:outline-none cursor-pointer"
              onClick={() =>
                setFiles((prev) =>
                  prev.filter((f) => f.name !== file.name)
                )
              }
            >
              {file.name.length > 30 ? `${file.name.slice(0, 30)}...` : file.name}
              &nbsp; &#10005;
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
