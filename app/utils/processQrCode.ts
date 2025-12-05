export const processQrCode = async (inputValue?: string) => {
    try {
        if (inputValue) {
            const id = inputValue.split("/").pop();
            if (id) {
                window.location.href = `/detail/${id}`;
            } else {
                throw new Error(`Invalid input value (inputValue: ${inputValue})`);
            }
        } else {
            throw new Error("Empty input value");
        }
    } catch (error) {
        console.error("Error processing QR code:", error);
        alert("Please enter a valid link.");
    }
}