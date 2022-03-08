import { BrowserWindow, dialog, ipcMain, ipcRenderer } from "electron";
import directoryTree from "directory-tree";
import fs from "fs";
import { promisify } from "util";

const readFileAsync = promisify(fs.readFile);

export const registerLocalHandlers = async (mainWindow: BrowserWindow) => {
	ipcMain.handle("open-directory", async (_) => {
		const dirPath = await dialog
		  .showOpenDialog({
			properties: ["openDirectory"],
		  })
		  .then((res) => (res.canceled ? null : res.filePaths[0]));		  
		if (dirPath) {
		  mainWindow.webContents.send("open-directory", dirPath);
		}
	});
	ipcMain.handle("open-path", async (...args) => {
		const path = args[1];
		if (path) {
		  mainWindow.webContents.send("open-directory", path);
		}
	});
	ipcMain.handle("read-file", async (_, ...args) => {
		return await readFileAsync(args[0], { encoding: "utf-8" });
	});
  };
  
  export const registerLocalInvokes = () => {
	return {
		directoryTree,
    	on(channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void) {
      		ipcRenderer.on(channel, listener);
        },
	    async openDirectory() {
		  return await ipcRenderer.invoke("open-directory");
	 	},
		 async openPath(...args: any[]) {
			return await ipcRenderer.invoke("open-path", ...args);
		},
		 async readFile(...args: any[]) {
			return await ipcRenderer.invoke("read-file", ...args);
		},
	};
  };
  