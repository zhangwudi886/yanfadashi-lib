import React, { FC } from "react";
import { UploadFile } from "./upload";
import Icon from "../Icon/icon";
import Progress from "../Progress/progress";
interface FileListProps {
  fileList: UploadFile[];
  onRemove?: (file: UploadFile) => void;
}
export const FileList: FC<FileListProps> = (props) => {
  const { fileList, onRemove } = props;
  return (
    <ul className="xdf-upload-list">
      {fileList.map((file) => {
        return (
          <li className="xdf-upload-list-item" key={file.uid}>
            <span className={`file-name file-name-${file.status}`}>
              <Icon icon="file-alt" theme="secondary"></Icon>
              {file.name}
            </span>
            <span className="file-status">
              {(file.status === "ready" || file.status === "uploading") && (
                <Icon icon="spinner" theme="primary" spin></Icon>
              )}
              {file.status === "success" && (
                <Icon icon="check-circle" theme="primary"></Icon>
              )}
              {file.status === "error" && (
                <Icon icon="times-circle" theme="danger"></Icon>
              )}
            </span>
            <span className="file-actions">
              <Icon
                icon="times"
                onClick={() => {
                  onRemove && onRemove(file);
                }}
              ></Icon>
            </span>
            {(file.status === "ready" || file.status === "uploading") && (
              <Progress percent={file.percent || 0}></Progress>
            )}
          </li>
        );
      })}
    </ul>
  );
};
FileList.defaultProps = {};
export default FileList;
