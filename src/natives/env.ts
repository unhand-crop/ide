import { BrowserWindow, ipcMain, ipcRenderer } from "electron";
import shell, { which } from "shelljs";

import VmEnv from "@unhand/vmenv";
import { platform as getPlatform } from "os";

shell.config.execPath = String(shell.which("node"));

const platform = getPlatform();
const vmenv = new VmEnv();

export const registerEnvHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle("env.load", async (_, args) => {
    let isShellInstalled = true;
    let isContainerInstalled = true;
    let isGitInstalled = true;

    if (platform === "win32") {
      isShellInstalled = !!which("wsl");
    } else if (platform === "darwin") {
      isShellInstalled = !!which("brew");
    }

    // if (isShellInstalled) {
    //   isContainerInstalled = false;
    //   isGitInstalled = !!which("git");
    // }

    return {
      platform,
      isShellInstalled,
      isContainerInstalled,
      isGitInstalled,
    };
  });
};

export const registerEnvInvokes = () => {
  return {
    async load(...args: any[]) {
      return await ipcRenderer.invoke("env.load", args);
    },
  };
};
