"use strict";

import * as MIME from "../helpers/mime";
import {FileType, FileConfig} from "../types";

export function loads(bytes: ArrayBuffer, config: FileConfig = {
  filename: "file",
  type: MIME.OCTET_STREAM
}): File {
  return new File([bytes], config.filename, config);
}

/**
 * 文件下载函数「同步」
 * @param file File或则Blob对象
 * @param filename 文件名, 若未指定则尝试使用file对象name属性
 */
export function downloadFileSync(file: FileType, filename?: string) {
  const aEle = document.createElement("a");
  const fileUrl = URL.createObjectURL(file);
  aEle.id = `__download_${Math.random() * 100000}`;
  aEle.style.display = "none";
  aEle.href = fileUrl;
  aEle.download = filename ?? file.name ?? "unknown";
  document.body.appendChild(aEle);
  aEle.click();
  document.body.removeChild(aEle);
  URL.revokeObjectURL(fileUrl);
}

export async function downloadFile(file: FileType, ...args: any[]) {
  await downloadFileSync(file, ...args);
}

/**
 * 文件状态轮询器
 * @param fn 执行函数体
 * @param meta 传递给执行函数参数
 * @param interval 轮询间隔
 * @param timeout 超时时间
 * @return {Promise<unknown>}
 */
export function poller({fn, meta, interval = 300, timeout = 3000}: any = {}): Promise<unknown> {
  let _Succ_State = false;
  let _Fail_State = false;
  // 起始时间戳
  const startTimeStamp = (new Date()).getTime();
  // 成功
  const success = () => {
    _Succ_State = true;
  };
  // 失败
  const fail = () => {
    _Fail_State = true;
  };

  return new Promise((resolve, reject) => {
    // 定时器对象
    const timerObj = window.setInterval(async () => {
      const msg = await fn(success, fail, meta);
      if (_Succ_State) {
        // 结束定时器线程
        clearInterval(timerObj);
        resolve(msg);
      }
      // 超时判断失败
      if (_Fail_State && ((new Date).getTime() - startTimeStamp > timeout)) {
        // 结束定时器线程
        clearInterval(timerObj);
        reject("The poller timed out");
      }
    }, interval);
  });
}
