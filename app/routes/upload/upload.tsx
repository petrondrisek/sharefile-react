import type { Route } from "../+types/upload";
import UploadLayout from "./components/UploadLayout";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Upload • Sharefile" },
        { name: "description", content: "Upload a file to scan for QR code" }
    ]
}

export default function Upload() {
    return <UploadLayout />;
}