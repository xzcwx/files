"use strict";

import axios from "axios";

import {AxiosResponse, AxiosRequestConfig} from "axios";
import {extractFileName} from "../utils";
import {FileResponse} from "../types/common";

export const m = {
  errGetMessage: "文件获取失败",
  errServMessage: "服务器错误"
};

export const H = axios.create({
  timeout: 10 * 60 * 1000
});

/**
 * 请求拦截
 */
function __setInterceptorsRequest(
  {token, ...kwargs}: { token?: string, [kwargs: string]: any } = {}
) {
  H.interceptors.request.use((config: AxiosRequestConfig): any => {
    if (token) {
      config.headers = {
        "Authorization": token
      };
    } else {
      // 尝试获取token
      try {
        const token = localStorage.token ? JSON.parse(localStorage.token) : {};
        config.headers = {
          "Authorization": token.authorization ?? ""
        };
      } catch {}
    }

    return Object.assign(config, kwargs);
  });
}

/**
 * 响应拦截
 */
function __setInterceptorsResponse() {
  H.interceptors.response.use((response: AxiosResponse): FileResponse | Promise<never> => {
    const {status, data, headers} = response;
    // 文件数据流为空错误提示
    if (!data) {
      return Promise.reject(new Error(m.errGetMessage));
    }
    // 服务器异常提示
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

export function setToken(token: string) {
  __setInterceptorsRequest({token});
}

/**
 * http文件请求
 * @param url 请求路径
 * @param config 配置参数
 * @param prefix 请求路径前缀
 * @return {Promise<AxiosResponse<any>>}
 */
export async function http(
  url: string,
  config: AxiosRequestConfig = {method: "POST"},
  prefix = undefined
) {
  // 去除api前缀
  if (/^\/?api\//i.test(url)) {
    url = url.replace(/^\/?api\//i, "");
  }
  // 添加自定义前缀
  prefix && (url = prefix + url);
  // 请求配置
  if (/^post$/i.test(config.method!)) {
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
