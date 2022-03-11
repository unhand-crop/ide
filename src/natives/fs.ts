import { BrowserWindow, ipcMain, ipcRenderer } from "electron";
import { PathOrFileDescriptor, readFile } from "fs";

import { promisify } from "util";
// @ts-ignore
import rimraf from "rimraf";

const readFileAsync = promisify(readFile);

export const registerFsHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle(
    "fs.readFile",
    async (_, path, options = { encoding: "utf8" }) => {
      return readFileAsync(path, options);
    }
  );
  ipcMain.handle("fs.unlink", async (_, path) => {
    return rimraf.sync(path);
  });
};

export const registerFsInvokes = () => {
  return {
    async readFile(
      path: PathOrFileDescriptor,
      options: {
        encoding?: string;
        flag?: string;
      }
    ) {
      return await ipcRenderer.invoke("fs.readFile", path, options);
    },
    async unlink(path: PathOrFileDescriptor) {
      return await ipcRenderer.invoke("fs.unlink", path);
    },
  };
};
