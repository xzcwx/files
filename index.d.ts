import {FILE_TYPE, FileResponse, FileConfig} from "./lib/types";

export type MIME = {[type as string]: string};

export function loads(bytes: ArrayBuffer, config: FileConfig): File;

export function downloadFileSync(file: FILE_TYPE, filename?: string): void;

export function downloadFile(file: FILE_TYPE, ...args: any[]): Promise<void>;
