export const useClipboard = () => {
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("Copied to clipboard.");
    }
    
    return { copyToClipboard };
}