import { BrowserWindow, dialog, ipcMain, ipcRenderer } from "electron";

import directoryTree from "directory-tree";

export const registerLocalHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle("open-directory", async (_) => {
    const dirPath = await dialog
      .showOpenDialog({
        properties: ["openDirectory"],
      })
      .then((res) => (res.canceled ? null : res.filePaths[0]));
    if (dirPath) {
      mainWindow.webContents.send("open-directory", dirPath);
    }
  });
  ipcMain.handle("open-path", async (...args) => {
    const path = args[1];
    if (path) {
      mainWindow.webContents.send("open-directory", path);
    }
  });
  ipcMain.handle("select-path", async (_) => {
    const dirPath = await dialog
      .showOpenDialog({
        properties: ["openDirectory"],
      })
      .then((res) => (res.canceled ? null : res.filePaths[0]));
    if (dirPath) {
      mainWindow.webContents.send("select-path", dirPath);
    }
  });
};

export const registerLocalInvokes = () => {
  return {
    directoryTree,
    async openDirectory() {
      return await ipcRenderer.invoke("open-directory");
    },
    async openPath(...args: any[]) {
      return await ipcRenderer.invoke("open-path", ...args);
    },
    async selectPath() {
      return await ipcRenderer.invoke("select-path");
    },
  };
};
