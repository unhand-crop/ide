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

interface templateListData {
    pageIndex: number;
    pageSize: number;
    programLanguage: number;
}

export interface templateListResponse {
    description: string;
    enabled: boolean;
    gitDir: string;
    gitUrl: string;
    id: string;
    imageUrl: string;
    orderIndex: boolean;
    programLanguage: boolean
    programLanguageName: string;
    shortDesc: string;
    templateName: string;
}

export const getTemplateList = async (data: templateListData): Promise<Response<any>> => {
    return request.post("/sapi/v1/algorithmtemplates/getpage", { data });
};

export const requistTemplateDetails = async (id: string): Promise<Response<any>> => {
    return request.get("/sapi/v1/algorithmtemplates/getbyid?id=" + id, {});
};