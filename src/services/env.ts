import { Response } from "./dtos";
import request from "@/utils/request";

export interface CompareBestImageVersionsOutput {
  imageName?: string;
  tag?: string;
  fullName?: string;
  versionFirst: number;
  versionSec: number;
  versionThird: number;
  version?: string;
}

export interface CompareEditorVersionOutput {
  id: number;
  bestImageVersion: CompareBestImageVersionsOutput;
}

export interface CompareInfo {
  isLatest: boolean;
  editVersionInfo: CompareEditorVersionOutput;
  currentEditVersionInfo: CompareEditorVersionOutput;
}

export const getByVersion = (
  versionInfo: string,
  platform: string,
  arch: string
): Promise<Response<CompareInfo>> => {
  return request.get("/sapi/v1/editor-version/get-by-version", {
    params: {
      versionInfo,
      platform,
      arch,
    },
  });
};
