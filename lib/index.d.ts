import * as FilesHandle from "./core/filesHandle";
import * as Request from "./core/request";
import * as MIME from "./helpers/mime";
export declare const downloadFileSync: typeof FilesHandle.downloadFileSync, downloadFile: typeof FilesHandle.downloadFile, poller: typeof FilesHandle.poller, loads: typeof FilesHandle.loads;
export declare const http: typeof Request.http, setToken: typeof Request.setToken;
declare const Files: {
    downloadFileSync: typeof FilesHandle.downloadFileSync;
    downloadFile: typeof FilesHandle.downloadFile;
    poller: typeof FilesHandle.poller;
    loads: typeof FilesHandle.loads;
    http: typeof Request.http;
    setToken: typeof Request.setToken;
    MIME: typeof MIME;
    VERSION: string;
};
export default Files;
