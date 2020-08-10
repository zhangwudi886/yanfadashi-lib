var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import FileList from "./fileList";
import Dragger from "./dragger";
export var Upload = function (props) {
    var action = props.action, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onProgress = props.onProgress, defaultFileList = props.defaultFileList, data = props.data, headers = props.headers, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, drag = props.drag, name = props.name, children = props.children;
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var inputRef = useRef(null);
    var handleUpload = function (e) {
        console.log(e.target.files);
        var files = e.target.files;
        if (!files) {
            return;
        }
        uploadFiles(files);
    };
    var uploadFiles = function (files) {
        Array.from(files).forEach(function (file) {
            postFile(file);
        });
    };
    var postFile = function (file) {
        var _file = {
            uid: Date.now() + "upload-file",
            name: file.name,
            size: file.size,
            status: "ready",
            percent: 0,
        };
        setFileList(function (preFileList) { return __spreadArrays([_file], preFileList); });
        var formData = new FormData();
        formData.append(name || "file", file);
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios
            .post(action, formData, {
            headers: __assign(__assign({}, headers), { "Content-Type": "multipart/form-data" }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                var uploadPercent = Math.round((e.loaded * 100) / e.total) || 0;
                console.log(uploadPercent);
                updateFile(_file, { percent: uploadPercent, status: "uploading" });
                onProgress && onProgress(uploadPercent, file);
            },
        })
            .then(function (res) {
            updateFile(_file, { response: res.data, status: "success" });
            onSuccess && onSuccess(res.data, file);
        })
            .catch(function (err) {
            updateFile(_file, { error: err, status: "error" });
            onError && onError(err, file);
        })
            .finally(function () {
            onChange && onChange(file);
            // updateFile(_file, { status: "error" });
        });
    };
    var updateFile = function (_file, fileObj) {
        setFileList(function (preFileList) {
            return preFileList.map(function (file) {
                if (file.uid === _file.uid) {
                    return __assign(__assign({}, file), fileObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        inputRef.current && inputRef.current.click();
    };
    var handleRemove = function (_file) {
        setFileList(function (preFileList) {
            return preFileList.filter(function (file) {
                return file.uid !== _file.uid;
            });
        });
    };
    useEffect(function () {
        console.log("fileList", fileList);
    }, [fileList]);
    return (React.createElement("div", { className: "xdf-upload-component" },
        drag ? React.createElement(Dragger, { onFile: uploadFiles }, children) : children,
        React.createElement("input", { type: "file", ref: inputRef, onChange: handleUpload, className: "xdf-input-file", style: { display: "none" }, accept: accept, multiple: multiple }),
        React.createElement(FileList, { fileList: fileList, onRemove: handleRemove })));
};
Upload.defaultProps = {};
export default Upload;
