"use strict";
import axios from "axios";
import { extractFileName } from "../utils";
export const m = {
    errGetMessage: "文件获取失败",
    errServMessage: "服务器错误"
};
export const H = axios.create({
    timeout: 10 * 60 * 1000
});
function __setInterceptorsRequest({ token, ...kwargs } = {}) {
    H.interceptors.request.use((config) => {
        if (token) {
            config.headers = {
                "Authorization": token
            };
        }
        else {
            try {
                const token = localStorage.token ? JSON.parse(localStorage.token) : {};
                config.headers = {
                    "Authorization": token.authorization ?? ""
                };
            }
            catch { }
        }
        return Object.assign(config, kwargs);
    });
}
function __setInterceptorsResponse() {
    H.interceptors.response.use((response) => {
        const { status, data, headers } = response;
        if (!data) {
            return Promise.reject(new Error(m.errGetMessage));
        }
        if (status > 500) {
            return Promise.reject(new Error(m.errServMessage));
        }
        return {
            ...response,
            filename: extractFileName(headers["content-disposition"]),
            content: data
        };
    });
}
export function setToken(token) {
    __setInterceptorsRequest({ token });
}
export async function http(url, config = { method: "POST" }, prefix = undefined) {
    if (/^\/?api\//i.test(url)) {
        url = url.replace(/^\/?api\//i, "");
    }
    prefix && (url = prefix + url);
    if (/^post$/i.test(config.method)) {
        return H.post(url, config.data, config);
    }
    return H.get(url, {
        params: config.data,
        ...config
    });
}
function __init__() {
    __setInterceptorsRequest();
    __setInterceptorsResponse();
}
__init__();
