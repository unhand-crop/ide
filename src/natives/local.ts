import { BrowserWindow, dialog, ipcMain, ipcRenderer } from "electron";
import directoryTree from "directory-tree";

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
  };
  
  export const registerLocalInvokes = () => {
	return {
		directoryTree,
    	on(channel: string, listener: (event: Electron.IpcRendererEvent, ...args: any[]) => void) {
      		ipcRenderer.on(channel, listener);
        },
	    async openDirectory() {
		  return await ipcRenderer.invoke("open-directory");
	  }
	};
  };
  