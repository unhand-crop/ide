import {
  ENGINE_EVENT_RESULT,
  ENGINE_EVENT_STREAM_DATA,
  ENGINE_EVENT_STREAM_ERROR,
  ENGINE_EVENT_STREAM_FINISH,
  ENGINE_EVENT_STREAM_START,
  ENGINE_EVENT_STREAM_STOP,
} from "@/constants/engine";
import { useMount, useReactive } from "ahooks";

import { IpcRendererEvent } from "electron";
import { createModel } from "hox";
import { localize } from "@dtinsight/molecule/esm/i18n/localize";
import molecule from "@dtinsight/molecule";

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
    algorithmstepConfig: [],
  });

  useMount(async () => {
    window.api.ipc.on(ENGINE_EVENT_RESULT, (_: IpcRendererEvent, data: any) => {
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
    window.api.ipc.on(ENGINE_EVENT_STREAM_START, () => {
      molecule.panel.cleanOutput();
      model.running = true;
    });
    window.api.ipc.on(ENGINE_EVENT_STREAM_ERROR, () => {
      model.running = false;
    });
    window.api.ipc.on(ENGINE_EVENT_STREAM_STOP, () => {
      model.running = false;
      // model.results = null;
    });
    window.api.ipc.on(ENGINE_EVENT_STREAM_FINISH, () => {
      model.running = false;
    });
    window.api.ipc.on(
      ENGINE_EVENT_STREAM_DATA,
      (_: IpcRendererEvent, data: string) => {
        molecule.panel.appendOutput(data);
      }
    );
  });

  return {
    model,
  };
}

export default createModel(useEngineModel);
