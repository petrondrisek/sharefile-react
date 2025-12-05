import { placeVideo } from "./canvas";
import { handleScan } from "./handleScan";

let s: MediaStream | null = null;
let frameCallbackId: number | null = null;

const processCameraVideo = async (
    video: HTMLVideoElement, 
    canvas: HTMLCanvasElement,
    onSuccess: (data: string) => void,
    onError: (message?: string) => void
): Promise<MediaStream | null> => {
    try {
        s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        video.srcObject = s;
        video.play();

        const onEachFrame = async () => {
            if (!s) return;

            await placeVideo(canvas, video);
            handleScan(canvas, onSuccess, onError);
            frameCallbackId = video.requestVideoFrameCallback(onEachFrame);
        }

        if(s){
            frameCallbackId = video.requestVideoFrameCallback(onEachFrame);
        }
        
        return s;
        
    } catch (error) {
        console.error(error);
        if(onError) onError("Failed to access camera.");
        return null;
    }
}

const endCameraStream = (video: HTMLVideoElement, stream: MediaStream) => {
    if (frameCallbackId !== null) {
        video.cancelVideoFrameCallback(frameCallbackId);
        frameCallbackId = null;
    }
    
    stream.getTracks().forEach(track => track.stop());
    s = null;

    video.srcObject = null;

    video.pause();
    video.muted = true;
    video.autoplay = false;
    video.controls = false;
    video.loop = false;
}

export { processCameraVideo, endCameraStream };