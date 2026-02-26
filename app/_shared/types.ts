export interface BackendResponse {
    uuid: string;
    files: BackendFile[];
    validUntil?: string;
}

export type BackendFile = {
    id: number;
    uuid: string;
    filename: string;
    validUntil: string;
}

export type CreateBackendFile = Omit<BackendFile, "id" | "uuid">;