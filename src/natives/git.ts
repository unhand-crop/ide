
import { BrowserWindow, ipcMain, ipcRenderer } from "electron";
import fs from 'fs';
import unzip from "unzipper";
import request from "request";
import path from "path";

export const registerGitHandlers = async (mainWindow: BrowserWindow) => {
    ipcMain.handle("gitHttp.clone", async (_, { fileName, gitUrl, gitFileName, extractUrl, extractCallback }: any) => {
        console.log("fileName, gitUrl, gitFileName, extractUrl, extractCallback", fileName, gitUrl, gitFileName, extractUrl, extractCallback);

        extractCallback && extractCallback(10);
        const writeUrl = path.join(extractUrl, gitFileName);
        request(gitUrl).pipe(fs.createWriteStream(writeUrl)).on("close", function (err: any) {
            extractCallback && extractCallback(40);
            fs.createReadStream(writeUrl).pipe(unzip.Extract({ path: extractUrl })).on("close", (err: any) => {
                const oldName = path.join(extractUrl, path.parse(gitFileName).name);
                const newName = path.join(extractUrl, fileName);
                extractCallback && extractCallback(60);
                fs.rename(oldName, newName, (err) => {
                    extractCallback && extractCallback(100, newName);
                })
            })
        });
    });
};

export const registerGitInvokes = () => {
    return {
        async clone({ fileName, gitUrl, gitFileName, extractUrl, extractCallback }: any) {
            return await ipcRenderer.invoke("gitHttp.clone", { fileName, gitUrl, gitFileName, extractUrl, extractCallback });
        },
    };
};
