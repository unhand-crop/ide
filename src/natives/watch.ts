import { BrowserWindow, ipcMain, ipcRenderer } from "electron";
import { FSWatcher, watch } from "chokidar";

import { EDITOR_EVENT_WATCH_DIR } from "@/constants/editor";

let watcher: FSWatcher = null;

export const registerWatchHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle("watch.change", async (_, path) => {
    if (watcher) {
      await watcher.close();
    }
    watcher = watch(path, {
      ignored: (p) => {
        if (p.endsWith(".DS_Store")) return true;
        return false;
      },
    });
    watcher.on("all", (eventName, path, stats) => {
      mainWindow.webContents.send(
        EDITOR_EVENT_WATCH_DIR,
        eventName,
        path,
        stats
      );
    });
  });
};

export const registerWatchInvokes = () => {
  return {
    async change(path: string) {
      await ipcRenderer.invoke("watch.change", path);
    },
  };
};
