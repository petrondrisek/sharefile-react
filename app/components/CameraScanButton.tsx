import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useCameraStream } from "~/hooks/useCameraStream";
import { useFrameProcess } from "~/hooks/useFrameProccess";
import { validateInput } from "~/utils/validateInput";


export default function CameraScanButton() {
    const navigate = useNavigate();

    const [error, setError] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const onSuccess = (data: string) => {
        const id = data.split("/").pop();
        navigate(`/detail/${id}`);
                
        // end camera
        handleStopCamera();
    }

    const validationFn = (data: string): boolean  => {
        const content = validateInput(data ?? "");

        if(content) {
            const id = data.split("/").pop();
            return Boolean(id);
        } else {
            console.log("Invalid QR code data:", data);
            return false;
        }
    }

    // Frame
    const { isProcessing, startFrameProcessing, stopFrameProcessing, reset } = useFrameProcess(
        videoRef,
        canvasRef,
        validationFn,
        onSuccess
    );

    // Start / stop camera functions
    const { scanState, handleStartCamera, handleStopCamera } = useCameraStream(
        videoRef,
        canvasRef,
        startFrameProcessing,
        stopFrameProcessing,
        reset,
        () => setError(null),
        (message?: string) => setError(message || "An error occurred while scanning.")
    );

    if(scanState === 'error') {
        return (<>
            <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900`}>
                <div className="max-w-full w-[320px] max-h-screen h-[320px] bg-white dark:bg-gray-800 flex flex-col items-center justify-around p-4">
                    <p className="text-center text-black dark:text-white">{error}</p>

                <button 
                    type="button"
                    onClick={handleStopCamera}
                    className="mt-6 inline-flex w-[90%] items-center mx-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black dark:text-white bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none cursor-pointer"
                >
                    &#x23F9;&nbsp;
                    Close
                </button>
                </div>
            </div>
        </>);
    }

    if(isProcessing) {
        return (<>
            <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900`}>
                <p className="text-center text-black dark:text-white">QR code processed. Please wait, you will be redirected...</p>
            </div>
        </>);
    }

    return (<>
        <div className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-900 ${scanState === "scanning" ? "visible" : "hidden"}`}>
            <div className="max-w-full w-[320px] max-h-screen h-[320px] bg-white dark:bg-gray-800">
                <canvas ref={canvasRef} id="canvas_video" className="hidden"></canvas>
                <video ref={videoRef} id="video" autoPlay playsInline muted></video>

                <button 
                    type="button"
                    onClick={handleStopCamera}
                    className="mt-6 inline-flex w-[90%] items-center mx-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-black dark:text-white bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none cursor-pointer"
                >
                    &#x23F9;&nbsp;
                    Stop camera
                </button>
            </div>
        </div>

        <button
            type="button"
            onClick={handleStartCamera}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none rounded-full cursor-pointer ml-4"
        >
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="currentColor">
                <path d="M0 0h24v24H0z" fill="none"/>
                <path d="M21 6h-3.17L16 4h-6v2h5.12l1.83 2H21v12H5v-9H3v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM8 14c0 2.76 2.24 5 5 5s5-2.24 5-5-2.24-5-5-5-5 2.24-5 5zm5-3c1.65 0 3 1.35 3 3s-1.35 3-3 3-3-1.35-3-3 1.35-3 3-3zM5 6h3V4H5V1H3v3H0v2h3v3h2z"/>
            </svg>
        </button>
    </>)
}