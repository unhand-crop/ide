
import { BrowserWindow, ipcMain, ipcRenderer } from "electron";
import http from 'isomorphic-git/http/node';
import git from 'isomorphic-git';
import path from 'path';
import fs from 'fs';
import unzip from "unzipper";
import request from "request";


export const registerGitHandlers = async (mainWindow: BrowserWindow) => {
    ipcMain.handle("gitHttp.clone", async (_, { fileName, gitUrl, gitFileName }: any) => {

        const zip = request(gitUrl);
        const Write = fs.createWriteStream("./a.zip");
        zip.pipe(Write).on("close", function (err: any) {
            const Read = fs.createReadStream("./a.zip");
            Read.pipe(unzip.Extract({ path: './' }));
        });
    });
};

export const registerGitInvokes = () => {
    return {
        async clone({ fileName, gitUrl, gitFileName }: any) {
            return await ipcRenderer.invoke("gitHttp.clone", { fileName, gitUrl, gitFileName });
        },
    };
};
