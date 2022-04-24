import { BrowserWindow, ipcMain, ipcRenderer } from "electron";
import {
  ENGINE_EVENT_PULL_IMAGE_FINISH,
  ENGINE_EVENT_PULL_IMAGE_START,
  ENGINE_IMAGE_NAME,
} from "@/constants/engine";
import {
  ENV_EVENT_INIT_DATA,
  ENV_EVENT_INIT_ERROR,
  ENV_EVENT_INIT_FINISH,
  ENV_EVENT_INIT_START,
} from "@/constants/env";

import { isWindows } from "./utils";
import { store } from "./store";
import { vm } from "./engine";

export const registerEnvHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle("env.init", async () => {
    mainWindow.webContents.send(ENV_EVENT_INIT_START);
    try {
      if (isWindows) {
      } else {
        if (!!(await vm.initVM())) {
          mainWindow.webContents.send(ENV_EVENT_INIT_DATA, {
            type: "notification",
            data: "正在安装虚拟机",
          });
          const child = await vm.startVM();
          await new Promise((resolve, reject) => {
            child.stdout.on("data", (data) => {
              mainWindow.webContents.send(ENV_EVENT_INIT_DATA, {
                type: "output",
                data,
              });
            });
            child.stderr.on("data", (data) => {
              mainWindow.webContents.send(ENV_EVENT_INIT_DATA, {
                type: "output",
                data,
              });
            });
            child.stderr.on("error", (err) => {
              reject(err);
            });
            child.stdout.on("error", (err) => {
              reject(err);
            });
            child.stderr.on("close", () => {
              resolve(true);
            });
            child.stdout.on("close", () => {
              resolve(true);
            });
          });
        }

        const imageName = (await store.get(ENGINE_IMAGE_NAME)) as string;
        await vm.removeImage(imageName, { async: true, force: true });
        const images = await vm.getImages();

        if (
          !images ||
          images.length <= 0 ||
          images.findIndex(
            (img) => `${img.Repository}:${img.Tag} === ${imageName}`
          ) < 0
        ) {
          mainWindow.webContents.send(ENV_EVENT_INIT_DATA, {
            type: "notification",
            data: "正在拉取算法引擎镜像",
          });
          mainWindow.webContents.send(ENGINE_EVENT_PULL_IMAGE_START);
          const child = await vm.pullImage(imageName);

          child.stdout.on("data", (data) => {
            mainWindow.webContents.send(ENV_EVENT_INIT_DATA, {
              type: "output",
              data,
            });
          });
          child.stderr.on("data", (data) => {
            mainWindow.webContents.send(ENV_EVENT_INIT_DATA, {
              type: "output",
              data,
            });
          });
          child.stderr.on("close", () => {
            mainWindow.webContents.send(ENGINE_EVENT_PULL_IMAGE_FINISH);
          });
          child.stdout.on("close", () => {
            mainWindow.webContents.send(ENGINE_EVENT_PULL_IMAGE_FINISH);
          });
        }
      }
      mainWindow.webContents.send(ENV_EVENT_INIT_FINISH);
    } catch (err) {
      console.error(err);
      mainWindow.webContents.send(ENV_EVENT_INIT_ERROR, "初始化失败");
    }
  });
};

export const registerEnvInvokes = () => {
  return {
    async init() {
      return await ipcRenderer.invoke("env.init");
    },
  };
};
