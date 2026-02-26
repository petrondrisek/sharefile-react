import ScanContainer from '../components/ScanContainer'
import GuideBox from '../components/GuideBox'
import StopButton from '../components/StopButton'

interface Props {
    guide: string,
    handleStop: () => void,
    visible: boolean,
    children?: React.ReactNode // video and canvas from parent
}

const ScanView = ({ guide, visible, handleStop, children }: Props) => {
    return (
        <ScanContainer hidden={!visible}>
            <GuideBox message={guide} />

            {children}

            <StopButton handleStop={handleStop} buttonText='Stop camera'/>
        </ScanContainer>
    )
}

export default ScanView