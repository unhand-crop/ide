import { useMount, useReactive } from "ahooks";

import { IpcRendererEvent } from "electron";
import { createModel } from "hox";
import { useEffect } from "react";

function useEngineModel() {
  const model = useReactive<{
    running: boolean;
    results: any;
  }>({
    running: false,
    results: {},
  });

  useMount(async () => {
    window.api.ipc.on("engine-result", (_: IpcRendererEvent, data: any) => {
      model.results = JSON.parse(data);
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
