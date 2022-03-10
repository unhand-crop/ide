import { BrowserWindow, ipcMain, ipcRenderer } from "electron";
import { FSWatcher, watch } from "chokidar";

let watcher: FSWatcher = null;

export const registerWatchHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle("watch.change", async (_, path) => {
    if (watcher) {
      await watcher.close();
    }
    watcher = watch(path);
    watcher.on("all", (eventName, path, stats) => {
      mainWindow.webContents.send("watch-directory", eventName, path, stats);
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
