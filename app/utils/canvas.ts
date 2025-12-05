const placeVideo = async (
    canvas: HTMLCanvasElement, 
    video: HTMLVideoElement
) => {
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) {
        console.error("[Canvas.ts] Failed to get canvas context.");
        return;
    }

    if (video.readyState >= video.HAVE_CURRENT_DATA) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    }
}

const placeImageFromFile = async (
    selectedFile: File, 
    canvas: HTMLCanvasElement
): Promise<boolean> => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        console.error("[Canvas.ts] Failed to get canvas context.");
        return false;
    }

    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = function(event) {
            const img = new Image();
            img.src = event.target?.result as string;

            img.onload = function() {
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;

                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                resolve(true);
            };

            img.onerror = function() {
                console.error("[Canvas.ts] Failed to load image");
                reject(new Error("Failed to load image"));
            };
        };
        
        reader.onerror = function() {
            console.error("[Canvas.ts] Failed to read file");
            reject(new Error("Failed to read file"));
        };
        
        reader.readAsDataURL(selectedFile);
    });
}

const clearCanvas = (canvas: HTMLCanvasElement) => {
    const ctx = canvas.getContext("2d");
    if(!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

export { placeVideo, placeImageFromFile, clearCanvas };