import TransparentContainer from "~/_shared/components/TransparentContainer"
import PageTitle from "~/_shared/components/PageTitle"
import RouteLink from "~/_shared/components/RouteLink"
import UploadFormContainer from "./UploadFormContainer"

const UploadLayout = () => {
  return (
    <TransparentContainer>
        <PageTitle>Upload</PageTitle>
        
        <UploadFormContainer />
        
        <RouteLink to="/" className="inline-block">← Homepage</RouteLink>
    </TransparentContainer>
  )
}

export default UploadLayout