import { BrowserWindow, ipcMain, ipcRenderer } from "electron";

import os from "os";

export const registerOsHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle("os.platform", (_) => {
    return os.platform();
  });
  ipcMain.handle("os.arch", (_) => {
    return os.arch();
  });
};

export const registerOsInvokes = () => {
  return {
    async platform() {
      return ipcRenderer.invoke("os.platform");
    },
    async arch() {
      return ipcRenderer.invoke("os.arch");
    },
  };
};
