import UploadFiles from '~/routes/upload/components/UploadFiles'
import UploadButton from './UploadButton';
import { UploadList } from './UploadList';
import { useFiles } from '../hooks/useFiles';
import { useUpload } from '../hooks/useUpload';
import { useClipboard } from '../hooks/useClipboard';

const UploadFormContainer = () => {
    const { files, addFile, removeFile } = useFiles({ mimetypes: ['image/jpeg', 'image/png'] });
    const { isProcessing, error, processUpload } = useUpload();
    const { copyToClipboard } = useClipboard();
        
    return (
        <div className="flex items-center justify-center flex-col gap-4 w-full">
            {error && <div className="text-red-500">{error}</div>}

            <UploadFiles addFile={addFile} />

            <UploadList files={files} removeFile={removeFile} />

            <UploadButton files={files} disabled={isProcessing || !files.length} onUpload={processUpload} onCopy={copyToClipboard} />
        </div>
    )
}

export default UploadFormContainer