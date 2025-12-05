import { handleScan } from "./handleScan";
import { placeImageFromFile } from "./canvas";

const processImageFile = async (
    selectedFile: File, 
    canvas: HTMLCanvasElement, 
    onSuccess: (data: string) => void, 
    onError: (message?: string) => void
): Promise<void> => {
    try {
        await placeImageFromFile(selectedFile, canvas);
        handleScan(canvas, onSuccess, onError);
    } catch (error) {
        console.error(error);
        onError("Failed to process image.");
    }
}

export { processImageFile };