"use strict";
export function extractFileName(string, re, keyword = "filename") {
    return (new RegExp(re ?? `filename=(?<${keyword}>[\w.]+);?`)).exec(string)?.groups?.[keyword];
}
