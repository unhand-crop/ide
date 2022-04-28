import { BrowserWindow, ipcMain, ipcRenderer } from "electron";

import fs from "fs";
import path from "path";
import request from "request";
// @ts-ignore
import rimraf from "rimraf";
import unzip from "unzipper";

export const registerGitHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle(
    "gitHttp.clone",
    async (_, { fileName, templateUrl, gitFileName, extractUrl }: any) => {
      const writeUrl = path.join(extractUrl, gitFileName);
      await new Promise<void>((resolve, reject) => {
        const req = request({ url: templateUrl, timeout: 500 });
        req
          .pipe(fs.createWriteStream(writeUrl))
          .on("close", function (err: any) {
            if (err) reject(err);
            resolve();
          });
      });

      await new Promise<void>((resolve, reject) => {
        fs.createReadStream(writeUrl)
          .pipe(unzip.Extract({ path: extractUrl }))
          .on("close", (err: any) => {
            if (err) reject(err);
            resolve();
          });
      });
      const oldName = path.join(extractUrl, path.parse(gitFileName).name);
      if (fileName) {
        const newName = path.join(extractUrl, fileName);
        fs.renameSync(oldName, newName);
        return newName;
      }
      return oldName;
    }
  );
};

export const registerGitInvokes = () => {
  return {
    async clone({ fileName, templateUrl, gitFileName, extractUrl }: any) {
      return await ipcRenderer.invoke("gitHttp.clone", {
        fileName,
        templateUrl,
        gitFileName,
        extractUrl,
      });
    },
  };
};
