import { useEffect, useRef } from "react";

export function useCameraStream(
    videoRef: React.RefObject<HTMLVideoElement | null>, 
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    startFrameProccessFn: () => void,
    stopFrameProcessFn: () => void,
    reset: () => void,
    onSuccess: () => void,
    onError: (message?: string) => void,
) {
    const streamRef = useRef<MediaStream | null>(null);

    const handleStartCamera = async () => {
        if (!videoRef.current || !canvasRef.current) {
            console.error("No video or canvas element found.");
            return;
        }

        try {
            let stream: MediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            streamRef.current = stream;

            videoRef.current.srcObject = stream;
            videoRef.current.play();

            // Start processing video by frames
            startFrameProccessFn();
            onSuccess();
        } catch (error) {
            console.error("Error accessing camera:", error);
            onError("Failed to access camera.");
        }
    }
    
    const handleStopCamera = () => {
        if(streamRef.current) {
            streamRef.current?.getTracks().forEach(track => track.stop()); // clean up tracks
            streamRef.current = null;
        }

        if (videoRef.current) {
            stopFrameProcessFn();

            videoRef.current.pause();
            videoRef.current.srcObject = null;
        }
        
        reset();
    }

    useEffect(() => {
        return () => {
            // Cleanup on unmount
            handleStopCamera();
        }
    }, []);

    return { handleStartCamera, handleStopCamera };
}