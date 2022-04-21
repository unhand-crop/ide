import { Response } from "./dtos";
import request from "@/utils/request";

export interface GetCurrencysOutput {
  id: number;
  name: string;
  fullName: string;
  orderIndex: number;
  imageUrl: string;
}

export const getAllCurrencys = async (): Promise<
  Response<GetCurrencysOutput[]>
> => {
  return request.get("/eapi/v1/currency/get-all-currencys", {});
};
