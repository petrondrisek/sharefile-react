import jsQR from "jsqr-es6";
import { useRef, useState } from "react";

export function useFrameProcess(
    videoRef: React.RefObject<HTMLVideoElement | null>, 
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    contentValidationFn: (data: string) => boolean,
    onSuccess: (data: string) => void,
) {
    const frameCallbackIdRef = useRef<number | null>(null);
    const isProcessingRef = useRef(false);

    const [isProcessing, setIsProcessing] = useState<Boolean>(false);

    const reset = () => {
        setIsProcessing(false);
        isProcessingRef.current = false;
    }

    const frameProcessing = (now: DOMHighResTimeStamp, metadata: VideoFrameCallbackMetadata) => {
        if(!videoRef.current || !canvasRef.current) return;

        // Check if video is ready, ignoring starting black background frames. Only then process.
        if(videoRef.current.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
            // Save video to canvas as image
            // Adjust canvas size if needed (only when video size changes)
            if(canvasRef.current.width !== videoRef.current.videoWidth || canvasRef.current.height !== videoRef.current.videoHeight) {
                canvasRef.current.width = videoRef.current!.videoWidth;
                canvasRef.current.height = videoRef.current!.videoHeight;
            }

            const ctx = canvasRef.current.getContext("2d");
            ctx?.drawImage(videoRef.current as HTMLVideoElement, 0, 0, canvasRef.current!.width, canvasRef.current!.height);

            // Process QR code
            const imageData = ctx?.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
            const qrCode = imageData ? jsQR(imageData.data, canvasRef.current.width, canvasRef.current.height) : null;

            if (qrCode?.data) {
                if(isProcessingRef.current) {
                    // Already processing, skip
                    return;
                }

                isProcessingRef.current = true;
                setIsProcessing(true);

                // Validate QR code data outside of this hook, if not valid, start scanning again using onInvalidDataFn
                if(contentValidationFn(qrCode.data)) {
                    onSuccess(qrCode.data);
                    return;
                } else {
                    // Invalid data, reset processing state to allow further scans
                    isProcessingRef.current = false;
                    setIsProcessing(false);
                }
            } 
        }

        // Request next frame
        frameCallbackIdRef.current = 
            videoRef.current?.requestVideoFrameCallback(frameProcessing) ?? null;
    }

    const startFrameProcessing = async () => {
        frameCallbackIdRef.current = 
            videoRef.current?.requestVideoFrameCallback(frameProcessing) ?? null;
    }

    const stopFrameProcessing = () => {
        if (frameCallbackIdRef.current !== null && videoRef.current) {
            videoRef.current.cancelVideoFrameCallback(frameCallbackIdRef.current);
            frameCallbackIdRef.current = null;
        }
    }

    return { isProcessing, startFrameProcessing, stopFrameProcessing, reset };
}