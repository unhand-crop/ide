import * as signalR from "@microsoft/signalr";

import { GetSymbolsOutput, getDefaultList } from "@/services/symbol";

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

  // useEffect(() => {
  //   (async () => {
  //     let defaultList = await window.api.store.get("defaultList");
  //     if (defaultList) {
  //       model.defaultList = defaultList;
  //       model.symbols = defaultList
  //         ?.map((item: GetSymbolsOutput) => item.name + "-USD")
  //         .join(",");
  //     } else {
  //       const result = await getDefaultList();
  //       if (result.statusCode === 200) {
  //         model.defaultList = result.data;
  //         await window.api.store.set("defaultList", result.data);
  //         model.symbols = result.data
  //           ?.map((item) => item.name + "-USD")
  //           .join(",");
  //       }
  //     }
  //   })();
  // }, [model.defaultList]);

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
