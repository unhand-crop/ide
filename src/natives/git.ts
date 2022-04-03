
import { BrowserWindow, ipcMain, ipcRenderer } from "electron";
import http from 'isomorphic-git/http/node';
import git from 'isomorphic-git';
import path from 'path';
import fs from 'fs';


export const registerGitHandlers = async (mainWindow: BrowserWindow) => {
    ipcMain.handle("gitHttp.clone", async (_, { fileName, gitUrl, gitFileName }: any) => {
        const dir = path.join(process.cwd() + "../");
        await git.init({ fs, dir });
        await git.addRemote({
            fs,
            dir,
            remote: 'origin',
            url: gitUrl
        });
        await git.setConfig({
            fs,
            dir,
            path: 'core.sparsecheckout',
            value: 'true'
        });
        await fs.writeFileSync(dir + ".git/info/sparse-checkout", gitFileName);
        await git.pull({
            fs,
            http,
            dir,
            singleBranch: false,
            remote: 'origin',
            ref: 'main',
            author: {
                name: "user"
            }
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
