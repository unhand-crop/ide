
import { BrowserWindow, ipcMain, ipcRenderer } from "electron";
import fs from 'fs';
import unzip from "unzipper";
import request from "request";
import path from "path";

export const registerGitHandlers = async (mainWindow: BrowserWindow) => {
    ipcMain.handle("gitHttp.clone", async (_, { fileName, templateUrl, gitFileName, extractUrl }: any) => {
        const writeUrl = path.join(extractUrl, gitFileName);
        await new Promise<void>((resolve, reject) => {
            request(templateUrl).pipe(fs.createWriteStream(writeUrl)).on("close", function (err: any) {
                if (err) reject(err);
                resolve();
            });
        })
        await new Promise<void>((resolve, reject) => {
            fs.createReadStream(writeUrl).pipe(unzip.Extract({ path: extractUrl })).on("close", (err: any) => {
                if (err) reject(err);
                resolve();
            })
        })
        const oldName = path.join(extractUrl, path.parse(gitFileName).name);
        if (fileName) {
            const newName = path.join(extractUrl, fileName);
            fs.renameSync(oldName, newName);
            return newName;
        }
        return oldName;
    });
};

export const registerGitInvokes = () => {
    return {
        async clone({ fileName, templateUrl, gitFileName, extractUrl }: any) {
            return await ipcRenderer.invoke("gitHttp.clone", { fileName, templateUrl, gitFileName, extractUrl });
        },
    };
};
