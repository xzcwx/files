import * as FilesHandle from "./core/filesHandle";
import * as Request from "./core/request";
import * as MIME from "./helpers/mime";
import { VERSION } from "./env/dataSet";
export const { downloadFileSync, downloadFile, poller, loads } = FilesHandle;
export const { http, setToken } = Request;
const Files = {
    downloadFileSync, downloadFile, poller, loads,
    http, setToken,
    MIME,
    VERSION
};
export default Files;
