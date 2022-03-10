import { getFileIcon, mapTree } from "@/utils";
import { useCallback, useEffect } from "react";
import { useMount, useReactive } from "ahooks";

import { IpcRendererEvent } from "electron";
import { Stats } from "original-fs";
import { TreeNodeModel } from "@dtinsight/molecule/esm/model";
import { createModel } from "hox";
import molecule from "@dtinsight/molecule";

function useEditorModel() {
  const model = useReactive<{ dirPath: string | null }>({
    dirPath: null,
  });

  useMount(() => {
    window.api.ipc.on(
      "open-directory",
      (_: IpcRendererEvent, dirPath: string) => {
        model.dirPath = dirPath;
      }
    );
    window.api.ipc.on(
      "watch-directory",
      async (
        _: IpcRendererEvent,
        eventName: string,
        path: string,
        stats?: Stats
      ) => {
        if (!model.dirPath) return;
        if (eventName === "add" || eventName === "addDir") {
          const node = molecule.folderTree.get(path);
          if (node) return;
          const fileName = await window.api.path.basename(path);
          const dirName = await window.api.path.dirname(path);
          const isDir = eventName === "addDir";
          molecule.folderTree.add(
            {
              id: path,
              path,
              name: fileName,
              icon: getFileIcon(fileName),
              isLeaf: false,
              fileType: isDir ? "Folder" : "File",
              children: isDir ? [] : null,
            },
            dirName
          );
        }
        if (eventName === "change") {
          const node = molecule.folderTree.get(path);
          // TODO: 同步已打开的文件内容
        }
        if (eventName === "unlink" || eventName === "unlinkDir") {
          molecule.folderTree.remove(path);
        }
      }
    );
  });

  useEffect(() => {
    if (model.dirPath) {
      molecule.folderTree.reset();
      window.api.watch.change(model.dirPath);

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
