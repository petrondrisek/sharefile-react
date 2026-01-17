import jsQR from "jsqr-es6";

export function usePhotoProcess(
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    contentValidationFn: (data: string) => boolean,
    onSuccess: (data: string) => void,
    onError: (message?: string) => void
) {
    const photoProcess = async (file: File) => {
        if(!canvasRef.current) return "";

        const ctx = canvasRef.current.getContext('2d');

        try {
            const bitmap = await createImageBitmap(file);
            canvasRef.current.width = bitmap.width;
            canvasRef.current.height = bitmap.height;

            // Draw image to canvas to pass to jsQR
            ctx?.drawImage(bitmap, 0, 0, canvasRef.current.width, canvasRef.current.height);
            
            const imageData = ctx?.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height);
            const qrCode = imageData ? jsQR(imageData.data, canvasRef.current.width, canvasRef.current.height) : null;

            // Check QR code data
            if (qrCode?.data) {
                if(contentValidationFn(qrCode.data)) {
                    onSuccess(qrCode.data);
                    
                } else {
                    onError("Invalid QR code data.");
                }
            } else {
                onError("No QR code found in the image.");
            }
        } catch (error) {
            console.error("Photo processing error:", error);
            onError("An error occurred while processing the image.");
        } finally {
            // Clear canvas
            ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        }
    }

    return { photoProcess };
}