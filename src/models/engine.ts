import { useMount, useReactive } from "ahooks";

import { IpcRendererEvent } from "electron";
import { createModel } from "hox";

function useEngineModel() {
  const model = useReactive<{
    running: boolean;
    Statistics: any;
  }>({
    running: false,
    //回测的结果数组，
    Statistics: [
      { label: "Total Trades", value: "1" },
      { label: "Average Win", value: "0%" },
      { label: "Average Loss", value: "0%" },
      { label: "Compounding Annual Return", value: "3.172%" },
      { label: "Drawdown", value: "19.400%" },
      { label: "Expectancy", value: "0" },
      { label: "Net Profit", value: "3.266%" },
      { label: "Sharpe Ratio", value: "0.243" },
      { label: "Probabilistic Sharpe Ratio", value: "17.723%" },
      { label: "Loss Rate", value: "0%" },
      { label: "Win Rate", value: "0%" },
      { label: "Profit-Loss Ratio", value: "0" },
      { label: "Alpha", value: "-0" },
      { label: "Profit-Loss Ratio", value: "0" },
      { label: "Beta", value: "0.997" },
      { label: "Annual Standard Deviation", value: "0.139" },
      { label: "Annual Variance", value: "0.019" },
      { label: "Information Ratio", value: "-0.304" },
      { label: "Tracking Error", value: "0" },
      { label: "Treynor Ratio", value: "0.034" },
      { label: "Total Fees", value: "$1.79" },
      { label: "Estimated Strategy Capacity", value: "$93000000.00" },
      { label: "Lowest Capacity Asset", value: "SPY R735QTJ8XC9X" },
    ],
  });

  useMount(async () => {
    window.api.ipc.on("engine-result", (_: IpcRendererEvent, data: any) => {
      //把回测结果转换成model.Statistics格式，
      console.log("engine-result", data);
    });
    window.api.ipc.on(
      "engine-stream-start",
      (_: IpcRendererEvent, data: any) => {
        model.running = true;
      }
    );
    window.api.ipc.on("engine-stream-end", (_: IpcRendererEvent, data: any) => {
      model.running = false;
    });
    window.api.ipc.on(
      "engine-stream-error",
      (_: IpcRendererEvent, data: any) => {
        model.running = false;
      }
    );
    window.api.ipc.on(
      "engine-stream-finish",
      (_: IpcRendererEvent, data: any) => {
        model.running = false;
      }
    );
    window.api.ipc.on(
      "engine-stream-data",
      (_: IpcRendererEvent, data: any) => {
        console.log(data);
      }
    );
  });

  return {
    model,
  };
}

export default createModel(useEngineModel);
