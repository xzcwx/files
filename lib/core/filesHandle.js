"use strict";
import * as MIME from "../helpers/mime";
export function loads(bytes, config = {
    filename: "file",
    type: MIME.OCTET_STREAM
}) {
    return new File([bytes], config.filename, config);
}
export function downloadFileSync(file, filename) {
    const aEle = document.createElement("a");
    const fileUrl = URL.createObjectURL(file);
    aEle.id = `__download_${Math.random() * 100000}`;
    aEle.style.display = "none";
    aEle.href = fileUrl;
    aEle.download = filename || file.name || "unknown";
    document.body.appendChild(aEle);
    aEle.click();
    document.body.removeChild(aEle);
    URL.revokeObjectURL(fileUrl);
}
export async function downloadFile(file, ...args) {
    await downloadFileSync(file, ...args);
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
        const timerObj = window.setInterval(async () => {
            const msg = await fn(success, fail, meta);
            if (_Succ_State) {
                clearInterval(timerObj);
                resolve(msg);
            }
            if (_Fail_State && ((new Date).getTime() - startTimeStamp > timeout)) {
                clearInterval(timerObj);
                reject("The poller timed out");
            }
        }, interval);
    });
}
