import { useCallback, useEffect, useState } from "react";

export const useRemainingTime = (date: string) => {
    const [timeLeft, setTimeLeft] = useState<string>("");

    const timerTick = useCallback(() => {
        const now = new Date();
        const d = new Date(date).getTime() - now.getTime();

        const hours = Math.floor((d % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((d % (1000 * 60 * 60)) / (1000 * 60));

        setTimeLeft(d > 0 ? `${hours}h ${minutes}min` : "0h 0min");
    }, [date]);

    useEffect(() => {
        timerTick(); // Initial call
        
        let timer = setInterval(timerTick, 60000);

        return () => clearInterval(timer);
    }, [timerTick]);

    return { timeLeft };
}