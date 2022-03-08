import { BrowserWindow, ipcMain, ipcRenderer } from "electron";

export const registerStoreHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle("store.get", (event, key) => {});
  ipcMain.handle("store.set", (event, key, data) => {});
};

export const registerStoreInvokes = () => {
  return {
    async get(...args: any[]) {
      await ipcRenderer.invoke("store.get", args[0]);
    },
    async set(...args: any[]) {
      await ipcRenderer.invoke("store.set", args[0], args[1]);
    },
  };
};
