import { FileType, FileConfig, FileDialogConfig } from "../types";
export declare function loadsBytes(bytes: ArrayBuffer, config?: FileConfig): File;
export declare function downloadFileSync(file: FileType, filename?: string): void;
export declare function downloadFile(file: FileType, ...args: any[]): Promise<void>;
export declare function openFileDialog({ accept, compatible, cancel, multiple, webkitdirectory, description }?: FileDialogConfig): Promise<File[]>;
export declare function poller<T = any>({ fn, meta, interval, timeout }?: any): Promise<T>;
