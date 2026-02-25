import ErrorView from "./view/ErrorView";
import ProcessView from "./view/ProcessView";
import ScanView from "./view/ScanView";
import { ScanState } from "./types";

interface Props {
    guide: string;
    error: string;
    onStop: () => void;
    scanState: ScanState;
    children: React.ReactNode;
}

const ScannerOverlay = ({ guide, error, onStop, scanState, children }: Props) => {
    if (scanState === ScanState.ERROR) return <ErrorView error={error} handleClose={onStop} />;
    
    if (scanState === ScanState.PROCESSING) return <ProcessView />;
    
    return <ScanView 
                guide={guide} 
                visible={scanState !== ScanState.IDLE} 
                handleStop={onStop}
            >
                {children}
            </ScanView>
};

export default ScannerOverlay