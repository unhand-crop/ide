import * as signalR from "@microsoft/signalr";

import configs from "@/configs";
import { createModel } from "hox";
import { useEffect } from "react";
import { useReactive } from "ahooks";

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
