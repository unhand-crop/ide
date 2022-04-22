import { BrowserWindow, dialog, ipcMain, ipcRenderer } from "electron";

import { EDITOR_EVENT_OPEN_DIR } from "@/constants/editor";
import directoryTree from "directory-tree";

export const registerLocalHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle("open-directory", async (_) => {
    const dirPath = await dialog
      .showOpenDialog({
        properties: ["openDirectory"],
      })
      .then((res) => {
        return res.canceled ? null : res.filePaths[0];
      });
    if (dirPath) {
      mainWindow.webContents.send(EDITOR_EVENT_OPEN_DIR, dirPath);
    }
    return dirPath;
  });
  ipcMain.handle("open-path", async (...args) => {
    const path = args[1];
    if (path) {
      mainWindow.webContents.send(EDITOR_EVENT_OPEN_DIR, path);
    }
  });
  ipcMain.handle("get-directory", async (_) => {
    const dirPath = await dialog
      .showOpenDialog({
        properties: ["openDirectory"],
      })
      .then((res) => (res.canceled ? null : res.filePaths[0]));
    return dirPath;
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
    async getDirectory() {
      return await ipcRenderer.invoke("get-directory");
    },
  };
};
