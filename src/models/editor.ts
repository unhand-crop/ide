import { useCallback, useEffect } from "react";
import { useMount, useReactive } from "ahooks";

import { IpcRendererEvent } from "electron";
import { TreeNodeModel } from "@dtinsight/molecule/esm/model";
import { createModel } from "hox";
import { mapTree } from "@/utils";
import molecule from "@dtinsight/molecule";

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

  useEffect(() => {
    if (model.dirPath) {
      molecule.folderTree.reset();
      const data = mapTree(
        window.api.local.directoryTree(model.dirPath, {
          attributes: ["extension"],
        })
      );
      molecule.folderTree.add(new TreeNodeModel({ ...data }));
    }
  }, [model.dirPath]);

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
