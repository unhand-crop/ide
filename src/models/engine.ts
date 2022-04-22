import {
  ENGINE_EVENT_RESULT,
  ENGINE_EVENT_STREAM_ERROR,
  ENGINE_EVENT_STREAM_FINISH,
  ENGINE_EVENT_STREAM_START,
} from "@/constants/engine";
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
    algorithmstepConfig: [
      "initconfig",
      "downloaddata",
      "algorithmrunning",
      "responseresult",
    ],
  });

  useMount(async () => {
    window.api.ipc.on(ENGINE_EVENT_RESULT, (_: IpcRendererEvent, data: any) => {
      console.log("data -->", data);
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
    window.api.ipc.on(ENGINE_EVENT_STREAM_START, (_: IpcRendererEvent) => {
      model.running = true;
    });
    window.api.ipc.on(
      ENGINE_EVENT_STREAM_ERROR,
      (_: IpcRendererEvent, data: any) => {
        model.running = false;
      }
    );
    window.api.ipc.on(
      ENGINE_EVENT_STREAM_FINISH,
      (_: IpcRendererEvent, data: any) => {
        model.running = false;
      }
    );
    // window.api.ipc.on(
    //   ENGINE_EVENT_STREAM_DATA,
    //   (_: IpcRendererEvent, data: any) => {
    //     console.log(data);
    //   }
    // );
  });

  return {
    model,
  };
}

export default createModel(useEngineModel);
