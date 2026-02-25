import { useState } from 'react'
import { QrCode } from "./QrCode";

interface Props {
    files: File[];
    disabled?: boolean;
    onUpload: (files: File[]) => Promise<string | undefined>,
    onCopy: (uuid: string) => void
}

export default function UploadButton({ files, disabled, onUpload, onCopy }: Props) {
    const [uuid, setUuid] = useState<string>("");

    const handleSubmit = async () => {
        const uuid = await onUpload(files);
        if(!uuid) return;

        setUuid(uuid);
    };

    const url = `${import.meta.env.VITE_API_URL}/detail/${uuid}`;
    
    return (<>
        <button 
            onClick={handleSubmit}
            className="w-max bg-blue-500 disabled:bg-gray-400 text-white px-8 py-2 rounded hover:bg-blue-600 transition cursor-pointer"
            disabled={disabled}
        >
            Upload
        </button>

        {uuid && (<div className="w-full flex items-center justify-center flex-col gap-4 bg-gray-100 dark:bg-gray-700 dark:text-white p-4">
            <QrCode width={200} height={200}>{url}</QrCode>
            <ul className="mt-4">
                <li>UUID: {uuid}</li>
            
                <li>URL: <a 
                    href={url} 
                    target="_blank"
                    className="text-gray-500 hover:text-gray-400 transition cursor-pointer"
                    >
                        {url.slice(0, 30)}...
                    </a>
                    <button 
                        onClick={() => onCopy(url)}
                        className="w-max bg-blue-500 text-white px-8 py-2 rounded hover:bg-blue-600 transition cursor-pointer ml-2"
                    >
                        Copy
                    </button>
                </li>
            </ul>
        </div>)}
    </>)
}
