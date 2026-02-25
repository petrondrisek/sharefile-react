import { useState } from "react";
import { validateInput } from "~/utils/validateInput";

export const useInput = () => {
    const [search, setSearch] = useState<string>('');
    const [error, setError] = useState<string>('');
    const disabled = error.length > 0 || !search.length;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;

        if(value.length && validateInput(value) === "") 
        {
            setError("Invalid API URL");
        } else {
            setError("");
        }

        setSearch(value);
    }

    return { search, error, disabled, onChange }
}