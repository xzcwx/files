import * as FilesHandle from "./core/filesHandle";
import * as Request from "./core/request";
import * as MIME from "./helpers/mime";
export declare const downloadFileSync: typeof FilesHandle.downloadFileSync, downloadFile: typeof FilesHandle.downloadFile, poller: typeof FilesHandle.poller, loadsBytes: typeof FilesHandle.loadsBytes, openFileDialog: typeof FilesHandle.openFileDialog;
export declare const http: typeof Request.http, setToken: typeof Request.setToken;
export { MIME };
declare const Files: {
    downloadFileSync: typeof FilesHandle.downloadFileSync;
    downloadFile: typeof FilesHandle.downloadFile;
    poller: typeof FilesHandle.poller;
    loadsBytes: typeof FilesHandle.loadsBytes;
    openFileDialog: typeof FilesHandle.openFileDialog;
    http: typeof Request.http;
    setToken: typeof Request.setToken;
    MIME: typeof MIME;
    VERSION: string;
};
export default Files;
