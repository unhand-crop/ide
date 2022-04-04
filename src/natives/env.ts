import { BrowserWindow, ipcMain, ipcRenderer } from "electron";

import Vmenv from "@unhand/vmenv";

export const registerEnvHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle("env.load", async (_, args) => {
    new Vmenv().init();
  });
};

export const registerEnvInvokes = () => {
  return {
    async load(...args: any[]) {
      return await ipcRenderer.invoke("env.load", args);
    },
  };
};
