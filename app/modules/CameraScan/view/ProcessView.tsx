import ScanContainer from "../components/ScanContainer"

const ProcessView = () => {
  return (
    <ScanContainer>
       <p className="text-center text-black dark:text-white">
        QR code processed. Please wait, you will be redirected...
       </p>
    </ScanContainer>
  )
}

export default ProcessView