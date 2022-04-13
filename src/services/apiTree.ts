import { Response } from "./dtos";
import request from "@/utils/request";

export interface GetApiTreeMethodsInput {
  code: string;
}
export interface ParametersOutput {
  typeName: string;
  name: string;
  typeId: number;
  description: string;
}

export interface GetApiTreeMethodsInfoOutPut {
  apiId: number;
  apiName: string;
  description: string;
  icon: string;
  id: number;
  inParameters: ParametersOutput[];
  outParameters: ParametersOutput[];
}

export const getApiTreeMethods = (
  data: GetApiTreeMethodsInput
): Promise<Response<GetApiTreeMethodsInfoOutPut[]>> => {
  return request.get("/eapi/v1/qcapitree/methods", {
    params: data,
  });
};
