"use strict";

/**
 * 提取文件名辅助函数
 * @param string 需提取值
 * @param re 自定义提取规则
 * @param keyword 分组关键字，默认filename
 * @return {string | undefined} 提取结果
 */
export function extractFileName(string: string, re?: string, keyword: string = "filename") {
  return (new RegExp(re ?? `filename=(?<${keyword}>[\w.]+);?`)).exec(string)?.groups?.[keyword];
}

