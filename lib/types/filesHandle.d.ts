export declare type FileType = File | Blob & {
    name?: string;
};
export interface FileConfig {
    filename: string;
    type: string;
}
export interface FileDialogConfig {
    accept?: string | string[];
    multiple?: boolean;
    webkitdirectory?: boolean;
    compatible?: boolean;
    cancel?: number;
}
