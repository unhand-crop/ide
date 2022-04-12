import { BrowserWindow, ipcMain, ipcRenderer } from "electron";

import { ChildProcess } from "child_process";
import { factory } from "nerdctl";
import os from "os";
import { store } from "./store";

const arch = os.arch();

const ENGINE_IMAGE =
  arch === "arm64" ? "unhand/unhand-arm64:v1.0.0" : "unhand/unhand:latest";
const CONTAINER_NAME = "unhand-algorithm-engine";

const vm = factory();

export const registerEngineHandlers = async (mainWindow: BrowserWindow) => {
  ipcMain.handle("engine.backtest", async (_, args) => {
    mainWindow.webContents.send("engine-stream-start");

    const images = await vm.getImages();

    if (
      !images ||
      images.length <= 0 ||
      images.findIndex(
        (img) => `${img.Repository}:${img.Tag} === ${ENGINE_IMAGE}`
      ) < 0
    ) {
      await vm.pullImage(ENGINE_IMAGE);
    }

    const port = await store.get("server-port");

    await vm.rm(CONTAINER_NAME, { force: true });

    const container = (await vm.run(ENGINE_IMAGE, {
      name: CONTAINER_NAME,
      rm: true,
      env: [`LOADREMOTE=true`, `DOMAIN=http://host.lima.internal:${port}/`],
      volume: [`${args[0]}:/app/custom/algorithm`],
    })) as ChildProcess;

    container.stdout.on("data", (data) => {
      console.log("-->", data);
      mainWindow.webContents.send("engine-stream-data", data);
    });
    container.stderr.on("data", (data) => {
      console.log("-->", data);
      mainWindow.webContents.send("engine-stream-error", data);
    });
    container.stderr.on("close", () => {
      console.log("--> close");
      mainWindow.webContents.send("engine-stream-finish");
    });
    container.stdout.on("close", () => {
      console.log("--> close");
      mainWindow.webContents.send("engine-stream-finish");
    });
  });
  ipcMain.handle("engine.stop", async (_, args) => {
    await vm.rm(CONTAINER_NAME, { force: true });
    mainWindow.webContents.send("engine-stream-finish");
  });
};

export const registerEngineInvokes = () => {
  return {
    async backtest(...args: any[]) {
      return await ipcRenderer.invoke("engine.backtest", args);
    },
    async stop(...args: any[]) {
      return await ipcRenderer.invoke("engine.stop", args);
    },
  };
};
