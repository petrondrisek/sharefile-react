import RouteLink from "~/components/RouteLink";
import type { Route } from "./+types/upload";
import { useState } from "react";
import PageTitle from "~/components/PageTitle";
import UploadButton from "~/components/UploadButton";
import UploadFiles from "~/components/UploadFiles";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "Upload • Sharefile" },
        { name: "description", content: "Upload a file to scan for QR code" }
    ]
}

export default function Upload() {
    const [files, setFiles] = useState<File[]>([]);

    return (
        <div className="container flex w-full min-h-screen min-h-[100dvh] items-center justify-center mx-auto">
            <div className="w-[600px] max-w-full min-h-[200px] p-8 mx-auto overflow-x-hidden text-center">
                <PageTitle>Upload</PageTitle>
                <div className="flex items-center justify-center flex-col gap-4">
                    <UploadFiles files={files} setFiles={setFiles} />

                    <UploadButton files={files} />
                </div>
                <RouteLink to="/" className="inline-block">← Homepage</RouteLink>
            </div>
        </div>
    );
}