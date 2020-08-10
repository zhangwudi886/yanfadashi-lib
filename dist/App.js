import React from "react";
import "./App.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Upload from "./components/Upload/upload";
library.add(fas);
function App() {
    var onChange = function (file) {
        console.log("状态成功的回调", file);
    };
    var onSuccess = function (str, file) {
        console.log("状态失败的回调", file);
    };
    var onError = function (err, file) {
        console.log("状态改变的回调", file);
    };
    var defaultFileList = [
        {
            name: "test.png",
            percent: 0,
            size: 17996,
            status: "ready",
            uid: "1597046715011upload-file",
        },
    ];
    return (React.createElement("div", { className: "App" },
        React.createElement("header", { className: "App-header" },
            React.createElement(Upload, { drag: true, defaultFileList: defaultFileList, onSuccess: onSuccess, onChange: onChange, onError: onError, action: "https://www.mocky.io/v2/5cc8019d300000980a055e76" }, "\u70B9\u6211\u4E0A\u4F20"))));
}
export default App;
