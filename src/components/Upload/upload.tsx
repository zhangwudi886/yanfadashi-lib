import React, { FC, ChangeEvent, useRef, useState, useEffect } from "react";
import axios from "axios";
import Button from "../Button/button";
import FileList from "./fileList";
import Dragger from "./dragger";
interface UploadProps {
  action: string;
  onSuccess?: (success: string, file: File) => void;
  onError?: (err: string, file: File) => void;
  onChange?: (file: File) => void;
  onProgress?: (percent: number, file: File) => void;
  onRemove?: (_file: UploadFile) => void;
  defaultFileList?: UploadFile[];
  data?: { [key: string]: string };
  headers?: { [key: string]: string };
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  drag?: boolean;
  name?: string;
}

type UploadStatus = "ready" | "uploading" | "success" | "error";
export interface UploadFile {
  uid?: string;
  name?: string;
  size?: number;
  percent?: number;
  response?: any;
  error?: any;
  status?: UploadStatus;
}
export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    onSuccess,
    onError,
    onChange,
    onProgress,
    defaultFileList,
    data,
    headers,
    withCredentials,
    accept,
    multiple,
    drag,
    name,
    children,
    onRemove,
  } = props;
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  const inputRef = useRef<HTMLInputElement>(null);
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    let files = e.target.files;
    if (!files) {
      return;
    }
    uploadFiles(files);
  };

  const uploadFiles = (files: FileList) => {
    Array.from(files).forEach((file) => {
      postFile(file);
    });
  };
  const postFile = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + "upload-file",
      name: file.name,
      size: file.size,
      status: "ready",
      percent: 0,
    };
    setFileList((preFileList) => [_file, ...preFileList]);
    let formData = new FormData();
    formData.append(name || "file", file);
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          "Content-Type": "multipart/form-data",
        },
        withCredentials,
        onUploadProgress: (e) => {
          let uploadPercent = Math.round((e.loaded * 100) / e.total) || 0;
          console.log(uploadPercent);
          updateFile(_file, { percent: uploadPercent, status: "uploading" });
          onProgress && onProgress(uploadPercent, file);
        },
      })
      .then((res) => {
        updateFile(_file, { response: res.data, status: "success" });
        onSuccess && onSuccess(res.data, file);
      })
      .catch((err) => {
        updateFile(_file, { error: err, status: "error" });
        onError && onError(err, file);
      })
      .finally(() => {
        onChange && onChange(file);
        // updateFile(_file, { status: "error" });
      });
  };
  const updateFile = (_file: UploadFile, fileObj: Partial<UploadFile>) => {
    setFileList((preFileList) =>
      preFileList.map((file) => {
        if (file.uid === _file.uid) {
          return { ...file, ...fileObj };
        } else {
          return file;
        }
      })
    );
  };
  const handleClick = () => {
    inputRef.current && inputRef.current.click();
  };
  const handleRemove = (_file: UploadFile) => {
    setFileList((preFileList) =>
      preFileList.filter((file) => {
        return file.uid !== _file.uid;
      })
    );
    onRemove(_file);
  };
  useEffect(() => {
    console.log("fileList", fileList);
  }, [fileList]);
  return (
    <div className="xdf-upload-component">
      {/* <Button btnType="primary" onClick={handleClick}>
        upload
      </Button> */}
      {drag ? <Dragger onFile={uploadFiles}>{children}</Dragger> : children}
      <input
        type="file"
        ref={inputRef}
        onChange={handleUpload}
        className="xdf-input-file"
        style={{ display: "none" }}
        accept={accept}
        multiple={multiple}
      ></input>
      <FileList fileList={fileList} onRemove={handleRemove}></FileList>
    </div>
  );
};
Upload.defaultProps = {};
export default Upload;
