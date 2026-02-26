import { useRef } from 'react';
import { validateInput } from '~/utils/validateInput';
import { usePhotoProcess } from './hooks/usePhotoProcess';
import { useNavigate } from 'react-router';
import ImageInput from './components/ImageInput'

const ImageScan = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const navigate = useNavigate();

    const { photoProcess } = usePhotoProcess(
        canvasRef,
        (data: string) => validateInput(data) !== "",
        (data: string) => { // onSuccess
            const id = data.replace(/\/$/, "").split("/").pop();
            navigate(`/detail/${id}`);
        },
        (message?: string) => { // onError
            alert(message || "An error occurred while processing the image.");
        }
    )

    const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.length) return;
        
        const file = Array.from(e.target.files)[0];
        photoProcess(file);
    }    

    return (<>
        <ImageInput
            onUpload={onUpload}
        />

        <canvas ref={canvasRef} className="hidden" />
    </>)
}

export default ImageScan