import { getFileIcon, mapTree } from "@/utils";
import { useCallback, useEffect } from "react";
import { useMount, useReactive } from "ahooks";

import { IpcRendererEvent } from "electron";
import { Stats } from "original-fs";
import { TreeNodeModel } from "@dtinsight/molecule/esm/model";
import { UniqueId } from "@dtinsight/molecule/esm/common/types";
import { createModel } from "hox";
import molecule from "@dtinsight/molecule";

async function syncFileContent(path: UniqueId) {
  if (!molecule.editor.editorInstance) return;
  const position = molecule.editor.editorInstance.getPosition();
  const file = await window.api.fs.readFile(path);

  molecule.editor.editorInstance.setValue(file);
  molecule.editor.editorInstance.setPosition(position);
}

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
          const state = molecule.editor.getState();
          if (state.current?.activeTab !== path) return;

          const position = molecule.editor.editorInstance.getPosition();
          const file = await window.api.fs.readFile(path);

          molecule.editor.editorInstance.setValue(file);
          molecule.editor.editorInstance.setPosition(position);
        }
        if (eventName === "unlink" || eventName === "unlinkDir") {
          molecule.folderTree.remove(path);
        }
      }
    );

    molecule.editor.onOpenTab(async (tab) => {
      await syncFileContent(tab.id);
    });
    molecule.editor.onSelectTab(async (tabId, groupId) => {
      await syncFileContent(tabId);
    });
  });

  useEffect(() => {
    if (model.dirPath) {
      molecule.folderTree.reset();

      window.api.watch.change(model.dirPath);

      const data = mapTree(
        window.api.local.directoryTree(model.dirPath, {
          attributes: ["extension"],
          exclude: [/.DS_Store/],
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
