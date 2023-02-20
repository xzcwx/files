export declare type FileType = File | Blob & {
    name?: string;
};
export interface FileConfig {
    filename: string;
    type: string;
}
export interface FileDialogConfig {
    accept?: string | string[];
    compatible?: boolean;
    cancel?: number;
    multiple?: boolean;
    webkitdirectory?: boolean;
    description?: string;
}
