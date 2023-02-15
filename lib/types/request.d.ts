import { AxiosResponse } from "axios";
export interface FileResponse<T = ArrayBuffer> extends AxiosResponse<T> {
    filename: string;
    content: T;
}
