import { BrowserWindow, ipcMain, ipcRenderer } from "electron";

import Store from "electron-store";

const store = new Store();

store.set("settings", "xx");

export const registerStoreHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle("store.get", (event, key) => {
    return store.get(key);
  });
  ipcMain.handle("store.set", (event, key, data) => {
    return store.set(key, data);
  });
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
