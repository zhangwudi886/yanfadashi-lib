import React from "react";
import Icon from "../Icon/icon";
import Progress from "../Progress/progress";
export var FileList = function (props) {
    var fileList = props.fileList, onRemove = props.onRemove;
    return (React.createElement("ul", { className: "xdf-upload-list" }, fileList.map(function (file) {
        return (React.createElement("li", { className: "xdf-upload-list-item" },
            React.createElement("span", { className: "file-name file-name-" + file.status },
                React.createElement(Icon, { icon: "file-alt", theme: "secondary" }),
                file.name),
            React.createElement("span", { className: "file-status" },
                (file.status === "ready" || file.status === "uploading") && (React.createElement(Icon, { icon: "spinner", theme: "primary", spin: true })),
                file.status === "success" && (React.createElement(Icon, { icon: "check-circle", theme: "primary" })),
                file.status === "error" && (React.createElement(Icon, { icon: "times-circle", theme: "danger" }))),
            React.createElement("span", { className: "file-actions" },
                React.createElement(Icon, { icon: "times", onClick: function () {
                        onRemove && onRemove(file);
                    } })),
            (file.status === "ready" || file.status === "uploading") && (React.createElement(Progress, { percent: file.percent || 0 }))));
    })));
};
FileList.defaultProps = {};
export default FileList;
