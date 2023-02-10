import {downloadFile, downloadFileSync, loads} from "./core/Files";
import {FILE_TYPE, FileConfig, FileResponse} from "./types";
import {H, http, setToken} from "./core/request";
import * as MIME from "./helpers/mime";

export {
  downloadFile,
  downloadFileSync,
  loads,
  H,
  http,
  setToken,
  MIME,
  FILE_TYPE,
  FileConfig,
  FileResponse
};
