import { Response } from "./dtos";
import request from "@/utils/request";

export interface GetRealTimeCurrencyConversionInpt {
  from: string;
  to: string;
}

export interface GetRealTimeCurrencyConversionOutPut {
  status: string;
  requestId: string;
  isSuccess: boolean;
  converted: number;
  from: string;
  initialAmount: number;
  symbol: string;
  to: string;
  last: {
    askPrice: number;
    bidPrice: number;
    exchange: number;
    timestamp: number;
  };
}

export const getCurrencyRates = async (
  data: GetRealTimeCurrencyConversionInpt
): Promise<Response<GetRealTimeCurrencyConversionOutPut>> => {
  return request.get("/eapi/v1/currencyrate/get-currency-rates", {
    params: data,
  });
};
