import { Response } from "./dtos";
import request from "@/utils/request";

export const getPythonMethods = (): Promise<Response<any>> => {
  return request.get("/eapi/v1/qcapitree/python_methods", {});
};
