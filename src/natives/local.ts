import { BrowserWindow, dialog, ipcMain, ipcRenderer } from "electron";

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
	  async openDirectory() {
		  return await ipcRenderer.invoke("open-directory");
	  }
	};
  };
  