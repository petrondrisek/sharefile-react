export const buildFileUrl = (uuid: string, filename: string) => {
    return import.meta.env.VITE_API_URL + `/files/show/${uuid}/${filename}`;
}

export const downloadFile = async (url: string, fileName: string): Promise<void> => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Network response was not ok");
    
    const blob = await response.blob();
    const objectUrl = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = objectUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();
    
    window.URL.revokeObjectURL(objectUrl);
};