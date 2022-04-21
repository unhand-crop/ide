import { getFileIcon, mapTree } from "@/utils";
import { useCallback, useEffect } from "react";
import { useMount, useReactive, useRequest } from "ahooks";

import { IpcRendererEvent } from "electron";
import { Position } from "@dtinsight/molecule/esm/monaco";
import { Stats } from "fs";
import { TreeNodeModel } from "@dtinsight/molecule/esm/model";
import { UniqueId } from "@dtinsight/molecule/esm/common/types";
import { createModel } from "hox";
import { getApiTreeMethods } from "@/services/apiTree";
import { getDirectoryTree } from "@/utils/directory-tree";
import molecule from "@dtinsight/molecule";
import { registerLanguages } from "@/languages";
import useBackTestModel from "./backtest";

export async function loadFolderTree(path: string) {
  molecule.folderTree.reset();
  window.api.watch.change(path);
  const data = mapTree(await getDirectoryTree(path));
  molecule.folderTree.add(new TreeNodeModel({ ...data }));
}

async function syncFileContent(path: UniqueId, position?: Position) {
  if (!molecule.editor.editorInstance) return;
  position = position ?? molecule.editor.editorInstance.getPosition();
  const file = await window.api.fs.readFile(path);

  molecule.editor.editorInstance.setValue(file);
  molecule.editor.editorInstance.setPosition(position);
}

async function setHistoryPath(path: string) {
  const data = await window.api.store.get("history-path");
  // const arrayList = [];
  // arrayList.unshift(path);
  // arrayList.push(data);
  // const history = flattenDeep(arrayList);
  // const historyList = uniq(history);
  // window.api.store.set("history-path", historyList);
}

function useEditorModel() {
  const model = useReactive<{
    currentTabId: UniqueId;
    tabs: Record<
      UniqueId,
      molecule.model.IEditorTab<molecule.model.BuiltInEditorTabDataType>
    >;
    dirPath: string | null;
    positions: Record<UniqueId, Position>;
  }>({
    currentTabId: null,
    tabs: {},
    dirPath: null,
    positions: {},
  });

  const { data } = useBackTestModel();
  useEffect(() => {
    if (data) {
      registerLanguages(data?.data);
    }
  }, [data]);
  useMount(async () => {
    window.api.ipc.on(
      "open-directory",
      (_: IpcRendererEvent, dirPath: string) => {
        window.api.store.set("dir-path", null);
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
      model.tabs[tab.id] = tab;
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
      model.tabs[tabId] = null;
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
      // setHistoryPath(model.dirPath);
      (async () => {
        await loadFolderTree(model.dirPath);
        window.api.store.set("dir-path", model.dirPath);
        molecule.explorer.onPanelToolbarClick(async (panel, toolbarId) => {
          if (toolbarId === "refresh") {
            await loadFolderTree(model.dirPath);
          }
        });
      })();
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
