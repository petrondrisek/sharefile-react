export const validateInput = (inputValue?: string) => {
    console.log("Input value has to start with:", import.meta.env.VITE_APP_URL ?? "http://localhost");

    if(!inputValue || inputValue.startsWith(import.meta.env.VITE_APP_URL ?? "http://localhost") === false)
        return "";

    else return inputValue.split("/").pop();
}