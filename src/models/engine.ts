import { useMount, useReactive } from "ahooks";

import { IpcRendererEvent } from "electron";
import { createModel } from "hox";

function useEngineModel() {
  const model = useReactive<{
    running: boolean;
    results: any;
    algorithmstep: any;
    algorithmstepConfig: any[];
  }>({
    running: false,
    results: {},
    algorithmstep: {},
    algorithmstepConfig: ["initconfig", "downloaddata", "algorithmrunning", "responseresult"],
  });

  useMount(async () => {
    await window.api.engine.init();
    window.api.ipc.on("engine-result", (_: IpcRendererEvent, data: any) => {
      console.log(data);

      switch (data.type) {
        case "algorithmstepConfig":
          model.algorithmstepConfig = data.content || [];
          break;
        case "algorithmstep":
          model.algorithmstep[data.progressType] = data;
          break;
        case "backtestresult":
          model.results = data;
          break;
        case "kline":
          model.results = data;
          break;
        default:
          break;
      }
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
