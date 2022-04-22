import { Response } from "./dtos";
import request from "@/utils/request";

export interface GetSymbolsOutput {
  id: number;
  securityType: number;
  securityTypeName: string;
  name: string;
  enName: string;
  enFullName: string;
  symbol: string;
  imagePath: string;
  orderInde: number;
  enabled: boolean;
  remark: string;
  isOptional: boolean;
}

interface TemplateListData {
  pageIndex: number;
  pageSize: number;
  programLanguage: number;
}

export interface TemplateListResponse {
  description: string;
  enabled: boolean;
  templateDir: string;
  templateUrl: string;
  id: string;
  imageUrl: string;
  orderIndex: boolean;
  programLanguage: boolean;
  programLanguageName: string;
  shortDesc: string;
  templateName: string;
}

export const getTemplateList = async (
  data: TemplateListData
): Promise<Response<any>> => {
  return request.post("/sapi/v1/algorithm-templates/get-page", { data });
};

export const requistTemplateDetails = async (
  id: string
): Promise<Response<any>> => {
  return request.get("/sapi/v1/algorithm-templates/get-by-id?id=" + id, {});
};
