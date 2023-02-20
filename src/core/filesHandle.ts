"use strict";

import * as MIME from "../helpers/mime";
import {FileType, FileConfig, FileDialogConfig} from "../types";

/**
 * 读取二进制文件
 * @param {ArrayBuffer} bytes 二进制数据
 * @param {FileConfig} config 配置项
 * @return {File} 文件对象
 */
export function loadsBytes(bytes: ArrayBuffer, config: FileConfig = {
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
export function downloadFileSync(file: FileType, filename?: string): void {
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

// 文件下载函数「异步」
export async function downloadFile(file: FileType, ...args: any[]) {
  await downloadFileSync(file, ...args);
}

/**
 * 打开文件选择对话框
 * 若浏览器不支持实验性方法：window.showOpenFilePicker，则采用input[type=file]元素进行兼容
 * @param {string | string[]} accept 文件类型限制 ，默认全部
 * @param {boolean} multiple 文件多选
 * @param {boolean} webkitdirectory 只选择目录限制
 * @param {number} compatible 兼容模式，默认开启
 * @param {number} cancel 兼容取消控制，为0时候则取消文件时不抛出reject，❗在使用async/await时会造成阻塞
 * @param {string} description 文件或者文件夹的描述，可选
 * @return {Promise<FileList>}
 */
export async function openFileDialog(
  {
    accept = MIME.ALL,
    compatible = true,
    cancel = 300,
    multiple,
    webkitdirectory,
    description
  }: FileDialogConfig = {}
): Promise<File[]> {
  accept.constructor === Array && (accept = accept.join(","));
  // 实验性功能
  if (!compatible && window.hasOwnProperty("showOpenFilePicker")) {
    console.warn("Note that showOpenFilePicker is an experimental interface and is not supported by most browsers, so use it sparingly.");
    const files = [];
    const acceptMap: { [accept: string]: string[] } = {};
    for (let a of (accept as string).split(",")) {
      acceptMap[a] = [];
    }
    //@ts-ignore
    const fileHandleList = await window.showOpenFilePicker?.({
      multiple,
      excludeAcceptAllOption: false,
      types: [{
        description,
        accept: acceptMap
      }]
    });
    for (const f of fileHandleList) {
      files.push(await f.getFile());
    }
    return files;
  }

  const inpEle = document.createElement("input");
  inpEle.id = `__file_${Math.trunc(Math.random() * 100000)}`;
  inpEle.type = "file";
  inpEle.style.display = "none";
  // 文件类型限制
  inpEle.accept = accept as string;
  // 多选限制
  multiple && (inpEle.multiple = multiple);
  // 选择目录限制
  if (webkitdirectory) {
    console.warn("该特性是非标准的，请尽量不要在生产环境中使用它！\n"
      + "This feature is non-standard, so try not to use it in a production environment!");
    inpEle.webkitdirectory = webkitdirectory;
  }
  inpEle.click();

  return await new Promise((resolve, reject) => {
    let _isSelected = false;
    const changeEvent = () => {
      const files = inpEle.files;
      if (files) {
        _isSelected = true;
        resolve(Array.from(files));
      }
    };
    const focusEvent = (event: Event) => {
      if (event.target?.constructor === Window) {
        setTimeout(() => {
          !_isSelected && reject("未选定文件\nUnselected file");
        }, cancel);
      }
    };
    inpEle.addEventListener("change", changeEvent, {once: true});
    cancel && window.addEventListener("focus", focusEvent, {once: true});
  });
}

/**
 * 文件状态轮询器
 * @param fn 执行函数体
 * @param meta 传递给执行函数参数
 * @param interval 轮询间隔
 * @param timeout 超时时间
 * @return {Promise<unknown>}
 */
export function poller<T = any>(
  {fn, meta, interval = 300, timeout = 3000}: any = {}
): Promise<T> {
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
