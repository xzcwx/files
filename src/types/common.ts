import {AxiosResponse} from "axios";

// 文件对象类型
export type FileType = File | Blob & { name?: string };

// 配置属性
export interface FileConfig {
  // 文件名
  filename: string;
  // 文件类型
  type: string;
}

