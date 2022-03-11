import { BrowserWindow, ipcMain, ipcRenderer } from "electron";
import { PathOrFileDescriptor, mkdir, readFile, rename, writeFile } from "fs";
import { dirname, join } from "path";

import { promisify } from "util";
// @ts-ignore
import rimraf from "rimraf";

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);
const mkdirAsync = promisify(mkdir);
const renameAsync = promisify(rename);

export const registerFsHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle(
    "fs.readFile",
    async (_, path, options = { encoding: "utf8" }) => {
      return await readFileAsync(path, options);
    }
  );
  ipcMain.handle("fs.writeFile", async (_, path, data) => {
    return await writeFileAsync(path, data);
  });
  ipcMain.handle("fs.mkdir", async (_, path) => {
    return await mkdirAsync(path);
  });
  ipcMain.handle("fs.unlink", async (_, path) => {
    return rimraf.sync(path);
  });
  ipcMain.handle("fs.rename", async (_, path, name) => {
    return renameAsync(path, join(dirname(path), name));
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
    async writeFile(path: PathOrFileDescriptor, data: string) {
      return await ipcRenderer.invoke("fs.writeFile", path, data);
    },
    async mkdir(path: PathOrFileDescriptor) {
      return await ipcRenderer.invoke("fs.mkdir", path);
    },
    async unlink(path: PathOrFileDescriptor) {
      return await ipcRenderer.invoke("fs.unlink", path);
    },
    async rename(path: PathOrFileDescriptor, name: string) {
      return await ipcRenderer.invoke("fs.rename", path, name);
    },
  };
};
