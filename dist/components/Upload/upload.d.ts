import { FC } from "react";
interface UploadProps {
    action: string;
    onSuccess?: (success: string, file: File) => void;
    onError?: (err: string, file: File) => void;
    onChange?: (file: File) => void;
    onProgress?: (percent: number, file: File) => void;
    defaultFileList?: UploadFile[];
    data?: {
        [key: string]: string;
    };
    headers?: {
        [key: string]: string;
    };
    withCredentials?: boolean;
    accept?: string;
    multiple?: boolean;
    drag?: boolean;
    name?: string;
}
declare type UploadStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
    uid?: string;
    name?: string;
    size?: number;
    percent?: number;
    response?: any;
    error?: any;
    status?: UploadStatus;
}
export declare const Upload: FC<UploadProps>;
export default Upload;
