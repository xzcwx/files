"use strict";
export function extractFileName(string, re, keyword = "filename") {
    var _a, _b, _c;
    return (_c = (_b = (_a = (new RegExp(re !== null && re !== void 0 ? re : `filename=(?<${keyword}>[\w.]+);?`)).exec(string)) === null || _a === void 0 ? void 0 : _a.groups) === null || _b === void 0 ? void 0 : _b[keyword]) !== null && _c !== void 0 ? _c : "";
}
