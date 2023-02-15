export declare type FileType = File | Blob & {
    name?: string;
};
export interface FileConfig {
    filename: string;
    type: string;
}
