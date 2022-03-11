import * as signalR from "@microsoft/signalr";

import { GetSymbolsOutput, getDefaultList } from "@/services/symbol";
import { useMount, useReactive } from "ahooks";

import configs from "@/configs";
import { createModel } from "hox";
import { useEffect } from "react";

function useMarketModel() {
  const model = useReactive<{
    symbols: string;
    prices: Record<string, any>;
    defaultList: any;
  }>({
    symbols: "",
    prices: {},
    defaultList: [],
  });

  useMount(async () => {
    const result = await getDefaultList();
    if (result.statusCode === 200) {
      model.defaultList = result.data;
      model.symbols = result.data.map((item) => item.symbol + "usdt").join(",");
    }
  });

  useEffect(() => {
    let connection: signalR.HubConnection;
    if (model.symbols) {
      connection = new signalR.HubConnectionBuilder()
        .withUrl(
          `${configs.baseUrl}/emapi/market?symbols=${model.symbols}&eventName=ticker&ticket=`
        )
        .build();

      connection.on("marketMessage", (event, symbol, message) => {
        model.prices[symbol] = message;
      });

      connection.start();
    }

    return () => {
      connection?.stop();
    };
  }, [model.symbols]);

  return {
    model,
  };
}

export default createModel(useMarketModel);
