"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import * as MIME from "../helpers/mime";
export function loadsBytes(bytes, config = {
    filename: "file",
    type: MIME.OCTET_STREAM
}) {
    return new File([bytes], config.filename, config);
}
export function downloadFileSync(file, filename) {
    const aEle = document.createElement("a");
    const fileUrl = URL.createObjectURL(file);
    aEle.id = `__download_${Math.trunc(Math.random() * 100000)}`;
    aEle.style.display = "none";
    aEle.href = fileUrl;
    aEle.download = filename || file.name || "unknown";
    document.body.appendChild(aEle);
    aEle.click();
    document.body.removeChild(aEle);
    URL.revokeObjectURL(fileUrl);
}
export function downloadFile(file, ...args) {
    return __awaiter(this, void 0, void 0, function* () {
        yield downloadFileSync(file, ...args);
    });
}
export function openFileDialog({ accept = MIME.ALL, multiple, webkitdirectory, compatible = false, cancel = 300 } = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        const inpEle = document.createElement("input");
        inpEle.id = `__file_${Math.trunc(Math.random() * 100000)}`;
        inpEle.type = "file";
        inpEle.style.display = "none";
        accept.constructor === Array && (accept = accept.join(","));
        inpEle.accept = accept;
        multiple && (inpEle.multiple = multiple);
        if (webkitdirectory) {
            console.warn("该特性是非标准的，请尽量不要在生产环境中使用它！\n"
                + "This feature is non-standard, so try not to use it in a production environment!");
            inpEle.webkitdirectory = webkitdirectory;
        }
        inpEle.click();
        return yield new Promise((resolve, reject) => {
            let _isSelected = false;
            const changeEvent = () => {
                console.log("触发change");
                const files = inpEle.files;
                if (files) {
                    _isSelected = true;
                    resolve(files);
                }
            };
            const focusEvent = (event) => {
                var _a;
                console.log("触发fous");
                if (((_a = event.target) === null || _a === void 0 ? void 0 : _a.constructor) === Window) {
                    setTimeout(() => {
                        !_isSelected && reject("未选定文件\nUnselected file");
                    }, cancel);
                }
            };
            inpEle.addEventListener("change", changeEvent, { once: true });
            cancel && window.addEventListener("focus", focusEvent, { once: true });
        });
    });
}
export function poller({ fn, meta, interval = 300, timeout = 3000 } = {}) {
    let _Succ_State = false;
    let _Fail_State = false;
    const startTimeStamp = (new Date()).getTime();
    const success = () => {
        _Succ_State = true;
    };
    const fail = () => {
        _Fail_State = true;
    };
    return new Promise((resolve, reject) => {
        const timerObj = window.setInterval(() => __awaiter(this, void 0, void 0, function* () {
            const msg = yield fn(success, fail, meta);
            if (_Succ_State) {
                clearInterval(timerObj);
                resolve(msg);
            }
            if (_Fail_State && ((new Date).getTime() - startTimeStamp > timeout)) {
                clearInterval(timerObj);
                reject("The poller timed out");
            }
        }), interval);
    });
}
