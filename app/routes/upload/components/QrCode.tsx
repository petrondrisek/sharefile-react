import React, { useEffect, useState } from 'react';
import QRCode from "qrcode-generator";

interface QrCodeGenerateProps {
    width?: number;
    height?: number;
    children: React.ReactNode;
}

export const QrCode = ({ width, height, children }: QrCodeGenerateProps) => {
    const [src, setSrc] = useState<string>("");

    useEffect(() => {
        const qr = QRCode(0, "M");
        qr.addData(children?.toString() ?? "");
        qr.make();

        setSrc(qr.createDataURL());
    }, [children]);

    return (
        <img src={src} width={width} height={height} alt="QR Code" />
    );
}