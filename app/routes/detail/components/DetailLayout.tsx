import type { BackendFile } from "~/_shared/types";
import PageTitle from "~/_shared/components/PageTitle";
import DetailFileContainer from "./DetailFileContainer";
import Container from "~/_shared/components/Container";
import PageSubtitle from "~/_shared/components/PageSubtitle";

interface DetailInfoProps {
    uuid: string,
    files: BackendFile[]
}

const DetailLayout = ({ uuid, files }: DetailInfoProps) => {
  return (
    <Container>
      <PageTitle>Sdílené soubory</PageTitle>
      <PageSubtitle>ID: {uuid}</PageSubtitle>
    
      {files.map((file: BackendFile) => <DetailFileContainer key={file.filename} uuid={uuid} file={file} />)}
    </Container>
  )
}

export default DetailLayout