import { BrowserWindow, ipcMain, ipcRenderer } from "electron";
import { basename, dirname, extname } from "path";

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
  };
};
