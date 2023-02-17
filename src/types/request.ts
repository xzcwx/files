/*
 * 网络处理类型声明
 * request.ts
 */
import {AxiosResponse} from "axios";

// 文件响应
export interface FileResponse<T = ArrayBuffer> extends AxiosResponse<T> {
  filename: string;
  content: T;
}
