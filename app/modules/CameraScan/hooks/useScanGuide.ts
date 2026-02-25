import { useRef, useState } from "react";

export const useScanGuide = () => {
    const [guide, setGuide] = useState<string | null>(null);
    const isVisible = useRef<boolean>(false);
    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const showGuide = (message: string) => {
        if (isVisible.current) return;
        isVisible.current = true;

        setGuide(message);
        
        timeoutRef.current = setTimeout(() => {
            setGuide(null);
            isVisible.current = false;
        }, 3000);
    };

    return { guide, showGuide, timeoutRef };
};