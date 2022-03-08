import * as signalR from "@microsoft/signalr";

import configs from "@/configs";
import { createModel } from "hox";
import { useEffect } from "react";
import { useReactive } from "ahooks";

function useMarketModel() {
  const model = useReactive<{
    symbols: string[];
    prices: Record<string, any>;
  }>({
    symbols: ["BTCUSDT"],
    prices: {},
  });

  useEffect(() => {
    model.prices = {};

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(
        `${configs.baseUrl}:8085/market?symbols=btcusdt&eventName=aggTrade&ticket=`
      )
      .build();

    connection.on("marketMessage", (event, symbol, message) => {
      model.prices[symbol] = message;
    });

    connection.start();

    return () => {
      connection.stop();
    };
  }, [model.symbols]);

  return {
    model,
  };
}

export default createModel(useMarketModel);
