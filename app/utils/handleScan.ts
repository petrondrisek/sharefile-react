// import jsQR from "jsqr-es6"; not in SSR, just client.
let jsQR: any;
if (typeof window !== "undefined") {
    const m = await import("jsqr-es6");
    jsQR = m.default;
}

const handleScan = (
    canvas: HTMLCanvasElement, 
    onSuccess: (data: string, stream?: MediaStream) => void, 
    onError: (message?: string) => void
) => {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        onError("Failed to get canvas context.");
        return;
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
    const decoded = jsQR(imageData, canvas.width, canvas.height);
    
    if (decoded) {
        onSuccess(decoded.data);
    } else {
        onError();
    }
}

export { handleScan };