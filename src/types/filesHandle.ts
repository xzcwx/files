/*
 * 文件处理类型声明
 * filesHandle.ts
 */

// 文件对象类型
export type FileType = File | Blob & { name?: string };

// 文件配置属性
export interface FileConfig {
  // 文件名
  filename: string;
  // 文件类型
  type: string;
}

// 文件对话框配置属性
export interface FileDialogConfig {
  accept?: string | string[];
  compatible?: boolean;
  cancel?: number;
  multiple?: boolean;
  webkitdirectory?: boolean;
  description?: string;
}

// 轮询器参数
export namespace Poller {
  export type Fn = (success: () => void, fail: () => void,
                    ...args: unknown[]) => Promise<unknown>;
  export type FailFn = (...args: unknown[]) => unknown;

  export interface Args {
    fn: Fn;
    failFn?: FailFn;
    meta?: unknown;
    interval?: number;
    timeout?: number;
  }
}
