import { getFileIcon, mapTree } from "@/utils";
import { useCallback, useEffect } from "react";
import { useMount, useReactive } from "ahooks";

import { IpcRendererEvent } from "electron";
import { Position } from "@dtinsight/molecule/esm/monaco";
import { Stats } from "fs";
import { TreeNodeModel } from "@dtinsight/molecule/esm/model";
import { UniqueId } from "@dtinsight/molecule/esm/common/types";
import { createModel } from "hox";
import molecule from "@dtinsight/molecule";

export function loadFolderTree(path: string) {
  molecule.folderTree.reset();
  window.api.watch.change(path);
  const data = mapTree(
    window.api.local.directoryTree(path, {
      attributes: ["extension"],
      exclude: [/.DS_Store/],
    })
  );
  molecule.folderTree.add(new TreeNodeModel({ ...data }));
}

async function syncFileContent(path: UniqueId, position?: Position) {
  if (!molecule.editor.editorInstance) return;
  position = position ?? molecule.editor.editorInstance.getPosition();
  const file = await window.api.fs.readFile(path);

  molecule.editor.editorInstance.setValue(file);
  molecule.editor.editorInstance.setPosition(position);
}

function useEditorModel() {
  const model = useReactive<{
    currentTabId: UniqueId;
    dirPath: string | null;
    positions: Record<UniqueId, Position>;
  }>({
    currentTabId: null,
    dirPath: null,
    positions: {},
  });

  useMount(async () => {
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
              isLeaf: !isDir,
              fileType: isDir ? "Folder" : "File",
              children: isDir ? [] : null,
            },
            dirName
          );
        }
        if (eventName === "change") {
          const state = molecule.editor.getState();
          if (state.current?.activeTab !== path) return;

          await syncFileContent(path);
        }
        if (eventName === "unlink" || eventName === "unlinkDir") {
          const state = molecule.editor.getState();
          state.groups.forEach((item) => {
            molecule.editor.closeTab(path, item.id);
          });
          molecule.folderTree.remove(path);
        }
      }
    );
    molecule.editor.onOpenTab(async (tab) => {
      model.currentTabId = tab.id;
      await syncFileContent(
        tab.id,
        model.positions[tab.id] ?? new Position(0, 0)
      );
    });
    molecule.editor.onSelectTab(async (tabId) => {
      model.currentTabId = tabId;
      await syncFileContent(
        tabId,
        model.positions[tabId] ?? new Position(0, 0)
      );
    });
    molecule.editor.onCloseTab(async (tabId) => {
      model.positions[tabId] = null;
    });
    const dirPath = await window.api.store.get("dir-path");
    if (dirPath) {
      const stat = await window.api.fs.stat(dirPath);
      if (stat && stat.isDirectory) {
        model.dirPath = dirPath;
      }
    }
  });

  useEffect(() => {
    if (model.dirPath) {
      loadFolderTree(model.dirPath);

      window.api.store.set("dir-path", model.dirPath);

      molecule.explorer.onPanelToolbarClick((panel, toolbarId) => {
        if (toolbarId === "refresh") {
          loadFolderTree(model.dirPath);
        }
      });
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
