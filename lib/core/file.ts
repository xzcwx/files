"use strict";

import MIME from "../mime";

import {FILE_TYPE, FileConfig} from "../types";

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
export function downloadFileSync(file: FILE_TYPE, filename?: string) {
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

export async function downloadFile(file: FILE_TYPE, ...args: any[]) {
  await downloadFileSync(file, ...args);
}
