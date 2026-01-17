export const validateInput = (inputValue?: string) => {
    if(!inputValue || inputValue.startsWith(import.meta.env.VITE_APP_URL ?? "http://localhost") === false)
        return "";

    else return inputValue.split("/").pop();
}