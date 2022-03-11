import { BrowserWindow, ipcMain, ipcRenderer } from "electron";
import {
  PathLike,
  PathOrFileDescriptor,
  mkdir,
  readFile,
  rename,
  stat,
  writeFile,
} from "fs";

import { promisify } from "util";
// @ts-ignore
import rimraf from "rimraf";

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);
const mkdirAsync = promisify(mkdir);
const renameAsync = promisify(rename);
const statAsync = promisify(stat);

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
  ipcMain.handle("fs.rename", async (_, oldPath, newPath) => {
    return await renameAsync(oldPath, newPath);
  });
  ipcMain.handle("fs.stat", async (_, path) => {
    const stat = await statAsync(path);
    return stat ? { ...stat, isDirectory: stat.isDirectory() } : stat;
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
    async rename(oldPath: PathLike, newPath: PathLike) {
      return await ipcRenderer.invoke("fs.rename", oldPath, newPath);
    },
    async stat(path: PathLike) {
      return await ipcRenderer.invoke("fs.stat", path);
    },
  };
};
