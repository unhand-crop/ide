import { useMount, useReactive } from "ahooks";

import { IpcRendererEvent } from "electron";
import { createModel } from "hox";

function useEngineModel() {
  const model = useReactive<{}>({});

  useMount(async () => {
    window.api.ipc.on("engine-result", (_: IpcRendererEvent, data: any) => {
      console.log("engine-result", data);
    });
  });

  return {
    model,
  };
}

export default createModel(useEngineModel);
