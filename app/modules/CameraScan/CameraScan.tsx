import { useRef, useState } from "react";
import { ScanState } from "./types";
import { useCameraStream } from "./hooks/useCameraStream";
import { useFrameProcess } from "./hooks/useFrameProccess";
import { useScanGuide } from "./hooks/useScanGuide";
import { useNavigate } from "react-router";
import { validateInput } from "~/utils/validateInput";
import ScannerOverlay from "./ScannerOverlay";
import StartButton from "./components/StartButton";

const CameraScan = () => {
    const [ state, setState ] = useState<ScanState>(ScanState.IDLE);
    const [ error, setError ] = useState<string>('');
    
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    const navigate = useNavigate();
    const { guide, showGuide } = useScanGuide();

    const { startFrameProcessing, stopFrameProcessing, reset } = useFrameProcess(
        videoRef,
        canvasRef,
        (data: string) => { // validation
            const isValid = validateInput(data) !== "";
            if (!isValid) {
                showGuide("Neplatný QR kód");
                setState(ScanState.SCANNING);
                reset();
            }
            
            return isValid;
        },
        (data) => { // onSuccess
            const id = data.replace(/\/$/, "").split("/").pop();
            handleStopCamera();
            navigate(`/detail/${id}`);
        },
        () => { // onProcessingStart
            setState(ScanState.PROCESSING);
        }
    );

    const { handleStartCamera, handleStopCamera } = useCameraStream(
        videoRef,
        canvasRef,
        startFrameProcessing,
        stopFrameProcessing,
        reset,
        () => setState(ScanState.SCANNING), // onSuccess
        (message) => { // onError
            setError(message ?? "Unexpected error.");
            setState(ScanState.ERROR);
        }
    );

    const handleStop = () => {
        handleStopCamera();
        setState(ScanState.IDLE);
    }

    return (<>
        <ScannerOverlay scanState={state} onStop={handleStop} error={error} guide={guide ?? ""}>
            <video ref={videoRef} autoPlay playsInline muted className={`w-full h-full object-cover ${state === ScanState.SCANNING ? "visible" : "hidden"}`} />
            <canvas ref={canvasRef} className="hidden" />
        </ScannerOverlay>

        <StartButton disabled={state !== ScanState.IDLE} handleStart={handleStartCamera} />
    </>)
}

export default CameraScan