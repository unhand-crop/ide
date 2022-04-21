import { Response } from "./dtos";
import request from "@/utils/request";

export const getlatest = (): Promise<Response<any>> => {
  return request.get("/sapi/v1/editorversion/get-latest", {});
};
