import {AxiosResponse} from "axios";

export type FILE_TYPE = File | Blob & { name?: string };

export interface FileConfig {
  // 文件名
  filename: string;
  // 文件类型
  type: string;
}

export interface FileResponse extends AxiosResponse<ArrayBuffer> {
  filename?: string;
  content?: ArrayBuffer;
}
