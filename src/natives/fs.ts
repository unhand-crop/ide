import { BrowserWindow, ipcMain, ipcRenderer } from "electron";
import { PathOrFileDescriptor, readFile } from "fs";

import { promisify } from "util";

const readFileAsync = promisify(readFile);

export const registerFsHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle(
    "fs.readFile",
    async (_, path, options = { encoding: "utf8" }) => {
      return readFileAsync(path, options);
    }
  );
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
  };
};
