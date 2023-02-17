"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import axios from "axios";
import { extractFileName } from "../utils";
export const m = {
    errGetMessage: "文件获取失败",
    errServMessage: "服务器错误"
};
export const H = axios.create({
    timeout: 10 * 60 * 1000
});
function __setInterceptorsRequest(_a = {}) {
    var { token } = _a, kwargs = __rest(_a, ["token"]);
    H.interceptors.request.use((config) => {
        var _a;
        if (token) {
            config.headers = {
                Authorization: token
            };
        }
        else {
            try {
                const token = localStorage.token ? JSON.parse(localStorage.token) : {};
                config.headers = {
                    Authorization: (_a = token.authorization) !== null && _a !== void 0 ? _a : ""
                };
            }
            catch (_b) { }
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
        return Object.assign(Object.assign({}, response), { filename: extractFileName(headers["content-disposition"]), content: data });
    });
}
export function setToken(token) {
    __setInterceptorsRequest({ token });
}
export function http(url, config = { method: "POST" }, prefix = undefined) {
    return __awaiter(this, void 0, void 0, function* () {
        if (/^\/?api\//i.test(url)) {
            url = url.replace(/^\/?api\//i, "");
        }
        prefix && (url = prefix + url);
        if (/^post$/i.test(config.method)) {
            return H.post(url, config.data, config);
        }
        return H.get(url, Object.assign({ params: config.data }, config));
    });
}
function __init__() {
    __setInterceptorsRequest();
    __setInterceptorsResponse();
}
__init__();
