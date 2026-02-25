import { useRef } from "react";

interface Props {
    onFileDrop?: (file: File) => void
    onElementDrop?: (e: React.DragEvent, element: string) => void,
    onTextDrop?: (e: React.DragEvent, text: string) => void
}

export const useDragAndDrop = ({ onFileDrop, onElementDrop, onTextDrop }: Props) => {
    const dragCounterRef = useRef<number>(0);
    const isDragging = dragCounterRef.current > 0;

    const onDragEnter = (e: React.DragEvent) => {
        e.preventDefault();
        dragCounterRef.current++;
    }

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    }

    const onDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        dragCounterRef.current = Math.max(0, dragCounterRef.current - 1);
    }

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        
        dragCounterRef.current = 0;
        
        const files = Array.from(e.dataTransfer.files);

        if(e.dataTransfer.types.includes("Files") && files.length && onFileDrop) {
            files.forEach((file: File) => onFileDrop(file));
        }

        else if(e.dataTransfer.types.includes("text/html") && onElementDrop) {
            onElementDrop(e, e.dataTransfer.getData("text/html"));
        }

        else if(e.dataTransfer.types.includes("text/plain") && onTextDrop) {
            onTextDrop(e, e.dataTransfer.getData("text/plain"));
        }
    }

    return { isDragging, onDragEnter, onDragOver, onDragLeave, onDrop };
}