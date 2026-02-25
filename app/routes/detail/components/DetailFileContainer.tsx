import type { BackendFile } from "~/_shared/types";
import { useRemainingTime } from "~/routes/detail/hooks/useRemainingTime";
import { buildFileUrl, downloadFile } from "~/routes/detail/utils/file";
import DetailFile from "./DetailFile";

interface DetailFileContainerProps {
    uuid: string;
    file: BackendFile;
}

const DetailFileContainer = ({ uuid, file }: DetailFileContainerProps) => {
    const { timeLeft } = useRemainingTime(file.validUntil);
    const url = buildFileUrl(uuid, file.filename);
    const { filename } = file;

    return <DetailFile 
                uuid={uuid} 
                filename={filename} 
                url={url} 
                timeLeft={timeLeft}
                downloadFile={downloadFile} />
}

export default DetailFileContainer