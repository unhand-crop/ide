import { BrowserWindow, ipcMain, ipcRenderer } from "electron";
import shell, { which } from "shelljs";

import VmEnv from "@unhand/vmenv";
import { platform as getPlatform } from "os";

shell.config.execPath = String(shell.which("node"));

const CONTAINER_NAME = "lima";
const platform = getPlatform();
const vmenv = new VmEnv();

const checkCommandExists = (command: string) => {
  if (platform === "linux") {
    return !!which(command);
  } else {
    return !!vmenv.exec(`which ${command}`);
  }
};

export const registerEnvHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle("env.load", async (_, args) => {
    let isShellInstalled = true;
    let isContainerInstalled = false;
    let isGitInstalled = false;

    if (platform === "win32") {
      isShellInstalled = !!which("wsl");
    } else if (platform === "darwin") {
      isShellInstalled = !!which("brew");
    }

    if (isShellInstalled) {
      isContainerInstalled = checkCommandExists(CONTAINER_NAME);
      isGitInstalled = checkCommandExists("git");
    }

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
