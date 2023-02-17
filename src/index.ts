import * as FilesHandle from "./core/filesHandle";
import * as Request from "./core/request";
import * as MIME from "./helpers/mime";
import {VERSION} from "./env/dataSet";

export const {
  downloadFileSync,
  downloadFile,
  poller,
  loadsBytes,
  openFileDialog
} = FilesHandle;
export const {http, setToken} = Request;
export {MIME};

const Files = {
  downloadFileSync, downloadFile, poller, loadsBytes, openFileDialog,
  http, setToken,
  MIME,
  VERSION
};

export default Files;
