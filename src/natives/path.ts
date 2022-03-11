import { BrowserWindow, ipcMain, ipcRenderer } from "electron";
import { basename, dirname, extname, join } from "path";

export const registerPathHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle("path.basename", async (_, path) => {
    return basename(path);
  });
  ipcMain.handle("path.dirname", async (_, path) => {
    return dirname(path);
  });
  ipcMain.handle("path.extname", async (_, path) => {
    return extname(path);
  });
  ipcMain.handle("path.join", async (_, ...paths) => {
    return join(...paths);
  });
};

export const registerPathInvokes = () => {
  return {
    async basename(path: string) {
      return await ipcRenderer.invoke("path.basename", path);
    },
    async dirname(path: string) {
      return await ipcRenderer.invoke("path.dirname", path);
    },
    async extname(path: string) {
      return await ipcRenderer.invoke("path.extname", path);
    },
    async join(...paths: string[]) {
      return await ipcRenderer.invoke("path.join", ...paths);
    },
  };
};
