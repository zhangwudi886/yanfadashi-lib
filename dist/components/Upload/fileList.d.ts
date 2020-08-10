import { FC } from "react";
import { UploadFile } from "./upload";
interface FileListProps {
    fileList: UploadFile[];
    onRemove?: (file: UploadFile) => void;
}
export declare const FileList: FC<FileListProps>;
export default FileList;
