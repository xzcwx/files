import { FileType, FileConfig } from "../types";
export declare function loads(bytes: ArrayBuffer, config?: FileConfig): File;
export declare function downloadFileSync(file: FileType, filename?: string): void;
export declare function downloadFile(file: FileType, ...args: any[]): Promise<void>;
export declare function poller({ fn, meta, interval, timeout }?: any): Promise<unknown>;
