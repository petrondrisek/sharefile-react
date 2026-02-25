import ScanContainer from '../components/ScanContainer'
import StopButton from '../components/StopButton'

interface Props {
    error: string,
    handleClose: () => void
}

const ErrorView = ({ error, handleClose }: Props) => {
  return <ScanContainer>
        <p className="text-red-500">{error ?? "Unknown error"}</p>

        <StopButton handleStop={handleClose} buttonText='Close' />
    </ScanContainer>
}

export default ErrorView