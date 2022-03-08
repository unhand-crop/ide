import { useMount, useReactive } from "ahooks";
import { IpcRendererEvent } from "electron";
import { createModel } from "hox";
import { useCallback } from "react";

function useEditorModel() {
  const model = useReactive<{ dirPath: string | null }>({
    dirPath: null,
  });

  useMount(() => {
    window.api.local.on(
      "open-directory",
      (_: IpcRendererEvent, dirPath: string) => {
        model.dirPath = dirPath;
      }
    );
  });

  const setDirPath = useCallback((path: string) => {
    if (path) {
      window.api.local.openPath(path);
    } else {
      model.dirPath = path;
    }
  }, []);

  return {
    model,
    setDirPath,
  };
}

export default createModel(useEditorModel);
