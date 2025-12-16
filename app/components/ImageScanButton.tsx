import { useState, useRef, useEffect } from 'react'
import { processImageFile } from '../utils/processImageFile';
import { clearCanvas } from '../utils/canvas';
import { processQrCode } from '~/utils/processQrCode';

type IFile = File | undefined | null;

export default function ImageScanButton() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<IFile>(null);

    const handleClick = () => {
        inputRef.current?.click();
    }

    const handleClickUnselect = () => {
        if (inputRef.current) {
            inputRef.current.value = "";
        }

        if (canvasRef.current) {
            clearCanvas(canvasRef.current);
        }

        setSelectedFile(null);
    }

    useEffect(() => {
        if (selectedFile && canvasRef.current) {
            processImageFile(
                selectedFile, 
                canvasRef.current, 
                (data: string) => {
                    processQrCode(data);
                }, 
                (message?: string) => {
                    alert(message || "Not found");
                }
            );
        }

    }, [selectedFile]);

    return (<>
        <input type="file" id="file" accept="image/*" ref={inputRef} className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0])}/>

        { 
            !selectedFile && (
                <button
                type="button"
                onClick={handleClick}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none rounded-full cursor-pointer ml-4"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2v9zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z"/></svg>
                </button>
            )
        }

        {
            selectedFile && (<>
                <canvas ref={canvasRef} id="canvas" className="hidden"></canvas>

                <button
                type="button"
                onClick={handleClickUnselect}
                className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-500 dark:bg-gray-600 hover:bg-gray-700  dark:hover:bg-gray-700 focus:outline-none cursor-pointer"
                >
                    {selectedFile.name.length > 30 ? `${selectedFile.name.slice(0, 30)}...` : selectedFile.name} 
                    &nbsp; &#10005;
                </button>
            </>)
        }
    </>)
}
