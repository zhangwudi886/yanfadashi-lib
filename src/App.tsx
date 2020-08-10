import React, { ChangeEvent, MouseEvent } from "react";
import logo from "./logo.svg";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Button from "./components/Button/button";
import Upload, { UploadFile } from "./components/Upload/upload";
library.add(fas);
function App() {
  const onChange = (file: File) => {
    console.log("状态成功的回调", file);
  };
  const onSuccess = (str: string, file: File) => {
    console.log("状态失败的回调", file);
  };
  const onError = (err: string, file: File) => {
    console.log("状态改变的回调", file);
  };
  const defaultFileList: UploadFile[] = [
    {
      name: "test.png",
      percent: 0,
      size: 17996,
      status: "ready",
      uid: "1597046715011upload-file",
    },
  ];
  return (
    <div className="App">
      <header className="App-header">
        <Upload
          drag={true}
          defaultFileList={defaultFileList}
          onSuccess={onSuccess}
          onChange={onChange}
          onError={onError}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        >
          点我上传
        </Upload>
      </header>
    </div>
  );
}

export default App;
