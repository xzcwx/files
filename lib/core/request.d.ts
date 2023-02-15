import { AxiosResponse, AxiosRequestConfig, AxiosInstance } from "axios";
export declare const m: {
    errGetMessage: string;
    errServMessage: string;
};
export declare const H: AxiosInstance;
export declare function setToken(token: string): void;
export declare function http(url: string, config?: AxiosRequestConfig, prefix?: any): Promise<AxiosResponse<any, any>>;
